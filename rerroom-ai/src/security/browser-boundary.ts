export interface BrowserSecurityState {
  secureContext: boolean;
  online: boolean;
  visibility: DocumentVisibilityState;
  storageAvailable: boolean;
}

export function readBrowserSecurityState(): BrowserSecurityState {
  let storageAvailable = false;
  try {
    localStorage.setItem('__rr', '1');
    localStorage.removeItem('__rr');
    storageAvailable = true;
  } catch { storageAvailable = false; }
  return { secureContext: globalThis.isSecureContext, online: navigator.onLine, visibility: document.visibilityState, storageAvailable };
}
