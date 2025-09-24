/**
 * Replace with custom client implementation when needed.
 * @module client
 */

import client from '@plone/volto/start-client';
import * as serviceWorker from '../serviceWorker';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';

client();

if (module.hot) {
  module.hot.accept();
}

// Fix for PWA link capturing issue
if (typeof window !== 'undefined') {
  const isPWA =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  document.addEventListener(
    'click',
    (event) => {
      const link = event.target.closest('a');
      if (link && link.target === '_blank' && link.href) {
        const isInternalLink = isInternalURL(link.href);

        if (isPWA) {
          // In PWA mode: intercept ALL target="_blank" links
          event.preventDefault();
          if (isInternalLink) {
            // Internal link: navigate within PWA
            window.location.href = link.href;
          } else {
            // External link: open in browser
            window.open(link.href, '_blank', 'noopener,noreferrer');
          }
        } else {
          // In browser with internal link: force window.open to prevent PWA capture
          event.preventDefault();
          window.open(link.href, '_blank');
        }
        // External links in browser: let them work normally
      }
    },
    true, // Use capture phase to intercept before other handlers
  );
}

serviceWorker.register();
