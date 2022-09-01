//module.exports = require('@plone/volto/babel');
const val = require('@plone/volto/babel');

module.exports = function (api) {
  let { plugins, presets } = val(api);
  api.cache(true);
  plugins.push('@babel/plugin-proposal-nullish-coalescing-operator');
  return { plugins, presets };
};
