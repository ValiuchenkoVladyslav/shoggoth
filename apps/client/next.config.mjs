/** @type {import("next").NextConfig} */
export default {
  // compile to static
  output: "export",

  // build optimizations
  productionBrowserSourceMaps: false,

  devIndicators: {
    buildActivity: false,
  },

  generateEtags: false,
};
