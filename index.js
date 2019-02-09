let esprima = require('esprima')
let escodegen = require('escodegen')

module.exports = function bareImports(Key, {headers, body}, config) {
  if (!config.imports) {
    return {headers, body}
  }
  else {
    let ast = esprima.parseModule(body, {}, function visit(node) {
      // walk the AST looking for bare imports
      if (node.type === 'ImportDeclaration' && !node.source.value.startsWith('/')) {
        // if not found blow up
        if (!config.imports[node.source.value]) {
          let msg = `bare imports missing from config.imports for import: ${node.source.value}`
          throw ReferenceError(msg)
        }
        // transform the imports value
        node.source.value = config.imports[node.source.value]
      }
      return node
    })
    return {
      headers: {...headers, 'content-type':'text/javascript;charset=utf8'},
      body: escodegen.generate(ast)
    }
  }
}
