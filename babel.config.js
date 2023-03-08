//module.exports = require('@plone/volto/babel');
const val = require('@plone/volto/babel');

module.exports = function (api) {
  let { plugins } = val(api);
  api.cache(true);
  const presets = ['razzle'];
  return { plugins, presets };
};
