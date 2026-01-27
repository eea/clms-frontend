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

// Embed mode: hide header, footer, nav
if (typeof window !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  if (params.get('embed') === 'true') {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent =
      'footer, header, nav {\n  display: none;\n}\n\n.map-container {\n  top: -4em;\n}';
    document.head.appendChild(style);
  }
}

serviceWorker.register();
