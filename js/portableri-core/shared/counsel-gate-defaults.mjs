/** Generated baseline · Brick 37 · updated by ingest_counsel_product_ack.mjs */
export const COUNSEL_PRODUCT_ACK = Object.freeze({
  document_version: 'v0.1',
  counsel_signed: false,
  host_production_bind_ack: false,
});

export function counselReviewRequiredForExport() {
  return !(COUNSEL_PRODUCT_ACK.counsel_signed && COUNSEL_PRODUCT_ACK.host_production_bind_ack);
}

export function isFfPreviewMode() {
  return !COUNSEL_PRODUCT_ACK.host_production_bind_ack;
}
