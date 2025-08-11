export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log('CLMS PWA: Registering service worker...');
      const swUrl = '/service-worker.js';

      registerValidSW(swUrl, config);
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      //sucessfully registered
      console.log(
        'CLMS PWA: Service Worker registered successfully:',
        registration.scope,
      );
      registration.onupdatefound = () => {
        const newSW = registration.installing;
        newSW.onstatechange = () => {
          if (
            newSW.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            console.log('reloading');
            window.location.reload();
          }
        };
      };
    })

    .catch((error) => {
      //error registering
      console.log('CLMS PWA: Service Worker registration failed:', error);
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    console.log('CLMS PWA: unregistering service worker');
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
