module.exports = function (api) {
  api.cache(true);
  return {
    // nativewind via jsxImportSourcethe nativewind/babel plugin's
    // nested-plugins shape is rejected by @babel/core 7.29+ (SDK 57).
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
  };
};
