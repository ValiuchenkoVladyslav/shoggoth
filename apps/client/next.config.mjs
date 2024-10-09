/** @type {import("next").NextConfig} */
export default {
  // compile to static
  output: "export",

  // build optimizations
  productionBrowserSourceMaps: false,

  devIndicators: {
    autoPrerender: false,
  },

  generateEtags: false,
};
