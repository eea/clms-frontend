/**
 * Replace with custom client implementation when needed.
 * @module client
 */

import client from '@plone/volto/start-client';
import * as serviceWorker from '../serviceWorker';

client();

if (module.hot) {
  module.hot.accept();
}

serviceWorker.register();
