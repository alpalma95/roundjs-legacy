const minify = require("@node-minify/core");
const uglifyES = require("@node-minify/uglify-es");

minify({
  compressor: uglifyES,
  input: "./dist/roundjs.es.js",
  output: "./dist/roundjs.es.min.js",
  callback: function (err, min) {},
});
