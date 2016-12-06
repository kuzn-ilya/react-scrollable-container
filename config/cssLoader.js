"use strict";

var postCss = require('postcss');
var postCssAdvancedVariables = require('postcss-advanced-variables');
var cssVars = require('../sources/stubs/cssVars');

module.exports = function(content) {
  if (this && this.cacheable) {
    // Webpack specific call
    this.cacheable();
  }

  content = postCss()
    .use(postCssAdvancedVariables({variables: cssVars.CSS_VARS}))
    .process(content).css;

  return content;
};