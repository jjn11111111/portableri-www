const THREAD_KEY = 'nw-workbench-thread-v1';

export function loadThread() {
  try {
    const raw = localStorage.getItem(THREAD_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveThread(messages) {
  try {
    localStorage.setItem(THREAD_KEY, JSON.stringify(messages.slice(-50)));
  } catch {
    /* private mode */
  }
}

export function slugFromText(text) {
  const words = String(text).trim().split(/\s+/).slice(0, 4).join('-');
  return words.replace(/[^a-zA-Z0-9-_]/g, '').slice(0, 32) || 'Present-Moment';
}
