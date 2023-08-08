const postcssNesting = require("postcss-nesting");

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting")(postcssNesting),
    require("autoprefixer"),
    require("tailwindcss"),
  ],
};
