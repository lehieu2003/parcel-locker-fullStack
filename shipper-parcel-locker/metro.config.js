// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
module.exports = (() => {
  const config = getDefaultConfig(__dirname, {
    isCSSEnabled: true
  });

  const { transformer, resolver } = config;
  config.watchFolders = [require("node:path").resolve(__dirname, ".")];
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  };
  config.resolver = {
    ...resolver,
    unstable_enableSymlinks: true,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg", "json", "mjs"]
  };

  return config;
})();
