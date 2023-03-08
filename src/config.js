/**
 * Add your config changes here.
 * @module config
 * @example
 * export const settings = {
 *   ...defaultSettings,
 *   port: 4300,
 *   listBlockTypes: {
 *     ...defaultSettings.listBlockTypes,
 *     'my-list-item',
 *   }
 * }
 */

import '@plone/volto/config';
// custom link plugin for slate link inserter
// import installEditor from '@plone/volto-slate/editor/plugins/Link';

export default function applyConfig(config) {
  config.blocks.requiredBlocks = [];
  // config = installEditor(config);

  return config;
}
