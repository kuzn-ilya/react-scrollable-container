"use strict";

var postCss = require('postcss');
var postCssAdvancedVariables = require('postcss-advanced-variables');
var autoPrefixer = require('autoprefixer');

module.exports = function(content) {
    var variables = JSON.parse(this.query.substring(1));

    if (this && this.cacheable) {
      // Webpack specific call
      this.cacheable();
    }

    content = postCss()
      .use(postCssAdvancedVariables({variables: variables}))
      .use(autoPrefixer())
      .process(content).css;

    return content;
};