module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('requireSpecificAttributes', function () {

    describe('object', function () {

      var options =
        [ { 'img': 'alT' }
        , { 'Abbr': [ 'title', 'laNg' ] }
        , { 'Script[aSync]': 'defer' }
        ]

      before(function () {
        linter.configure({ requireSpecificAttributes: options })
      })

      it('should report missing required attributes', function () {
        assert.equal(linter.checkString('img(title=\'title\')').length, 1)
      })

      it('should not report existing attributes', function () {
        assert.equal(linter.checkString('img(alt=\'alt\')').length, 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-specific-attributes.jade')

        assert.equal(result.length, 4)
        assert.equal(result[0].code, 'JADE:LINT_REQUIRESPECIFICATTRIBUTES')
        assert.equal(result[0].line, 2)
        assert.equal(result[1].line, 3)
        assert.equal(result[2].line, 5)
        assert.equal(result[3].line, 6)
      })

    })

  })

}
