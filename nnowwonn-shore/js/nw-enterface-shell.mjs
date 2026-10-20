/** PWA shell registration · optional offline static shore · no data pipe */
export function registerEnterFaceShell() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
    /* private mode / blocked */
  });
}
