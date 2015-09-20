'use strict';
require('../index.js');
var assert = require('assert');

describe('Test cases', function () {
    it('require', function () {
        // test single one 
        var a = require('./a');
        assert(a === 'a', 'require single module');
        // test array
        var ab = require(['./a', './b']);
        assert(typeof ab === 'object', 'require result should be a object');
        assert(ab[0] === 'a', 'require should get right value');
        // test space splited string
        ab = require('./a ./b');
        assert(typeof ab === 'object', 'require result should be a object');
        assert(ab['./a'] === 'a', 'require should get right value');
    });

    it('requireFolder', function () {
        var ms = esRequire.folder('./', __dirname);
        assert(typeof ms === 'object', 'require result should be a object');
    });
})