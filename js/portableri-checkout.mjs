/**
 * PortAbleRI · Stripe Checkout via coordination API (coord.portableri.com).
 */

import { DEFAULT_COORD_URL } from './portableri-core/shared/constants.mjs';

function coordBase() {
  if (typeof window !== 'undefined' && window.PORTABLERI_COORD_URL) {
    return String(window.PORTABLERI_COORD_URL).replace(/\/$/, '');
  }
  return DEFAULT_COORD_URL.replace(/\/$/, '');
}

export async function fetchCheckoutPublicConfig() {
  const res = await fetch(`${coordBase()}/v1/commerce/stripe/public-config`, {
    credentials: 'omit',
  });
  if (!res.ok) throw new Error(`checkout_config_${res.status}`);
  return res.json();
}

export async function startCheckout({ planId, subscriberId, email }) {
  const res = await fetch(`${coordBase()}/v1/commerce/stripe/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plan_id: planId,
      subscriber_id: subscriberId,
      customer_email: email,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `checkout_${res.status}`);
    err.detail = data;
    throw err;
  }
  if (data.url) {
    window.location.href = data.url;
    return data;
  }
  throw new Error('checkout_missing_url');
}

export function bindCheckoutButtons(root = document) {
  root.querySelectorAll('[data-checkout-plan]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const planId = btn.getAttribute('data-checkout-plan');
      const form = btn.closest('[data-checkout-form]') || document;
      const subEl = form.querySelector('[data-checkout-subscriber-id]') || document.getElementById('subscriber-id');
      const emailEl = form.querySelector('[data-checkout-email]') || document.getElementById('checkout-email');
      const subscriberId = (subEl?.value || subEl?.textContent || '').trim();
      const email = (emailEl?.value || '').trim();
      const status = btn.parentElement?.querySelector('[data-checkout-status]') || document.getElementById('checkout-status');

      if (!subscriberId) {
        if (status) status.textContent = 'Set a subscriber ID first (letters, numbers, hyphen).';
        subEl?.focus();
        return;
      }
      if (!email || !email.includes('@')) {
        if (status) status.textContent = 'Enter the email for receipts and entitlement.';
        emailEl?.focus();
        return;
      }

      btn.disabled = true;
      if (status) status.textContent = 'Opening Stripe Checkout…';
      try {
        await startCheckout({ planId, subscriberId, email });
      } catch (e) {
        btn.disabled = false;
        if (status) {
          status.textContent =
            e.detail?.error === 'checkout_not_enabled'
              ? 'Checkout not live yet — coordination keys and catalog pending.'
              : `Checkout error: ${e.message}`;
        }
      }
    });
  });
}

export async function refreshCheckoutUi(root = document) {
  const banner = root.getElementById('checkout-live-banner');
  const disabledNote = root.querySelectorAll('[data-checkout-disabled-note]');
  const status = root.getElementById('checkout-status');
  const buttons = root.querySelectorAll('[data-checkout-plan]');
  try {
    const cfg = await fetchCheckoutPublicConfig();
    if (cfg.checkout_enabled) {
      banner?.removeAttribute('hidden');
      disabledNote.forEach((el) => {
        el.hidden = true;
      });
      buttons.forEach((btn) => {
        btn.disabled = false;
      });
      if (status?.hasAttribute('data-checkout-disabled-note')) {
        status.textContent = 'Checkout ready — set subscriber ID and email, then choose a plan.';
      }
    } else {
      banner?.setAttribute('hidden', '');
      buttons.forEach((btn) => {
        btn.disabled = true;
      });
      if (status) status.textContent = 'Checkout is not enabled on coordination yet.';
    }
  } catch (e) {
    buttons.forEach((btn) => {
      btn.disabled = false;
    });
    if (status) {
      status.textContent =
        'Could not reach billing API — buttons will still try. Check connection or use local PortAbleRI-Start.';
    }
  }
}

/** Bind handlers first; enable/disable after config load (disabled buttons ignore clicks). */
export async function initCheckoutPage(root = document) {
  bindCheckoutButtons(root);
  const status = root.getElementById('checkout-status');
  if (status) status.textContent = 'Connecting to billing…';
  await refreshCheckoutUi(root);
}
