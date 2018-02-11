var chalk = require('chalk')
var vueCompiler = require('vue-template-compiler')
var transpile = require('vue-template-es2015-compiler')
var transformRequire = require('vue-loader/lib/template-compiler/modules/transform-require')
var transformSrcset = require('vue-loader/lib/template-compiler/modules/transform-srcset')

module.exports = function compileTemplate (template, compiler) {
  var compiled = vueCompiler.compile(template, {
    modules: [transformRequire({ img: 'src', image: 'xlink:href' }), transformSrcset()]
  })
  if (compiled.errors.length) {
    compiled.errors.forEach(function (msg) {
      console.error('\n' + chalk.red(msg) + '\n')
    })
    throw new Error('Vue template compilation failed')
  } else {
    return {
      render: toFunction(compiled.render),
      staticRenderFns: '[' + compiled.staticRenderFns.map(toFunction).join(',') + ']'
    }
  }
}

function toFunction (code) {
  return transpile('function render () {' + code + '}')
}
