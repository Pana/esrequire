'use strict';
require('../index.js');
let assert = require('assert');

describe('Test cases', function () {
    it('require', function () {
        // test single one 
        let a = require('./a');
        assert(a === 'a', 'require single module');
        // test array
        let ab = require(['./a', './b']);
        assert(typeof ab === 'object', 'require result should be a object');
        assert(ab['./a'] === 'a', 'require should get right value');
        // test space splited string
        ab = require('./a ./b');
        assert(typeof ab === 'object', 'require result should be a object');
        assert(ab['./a'] === 'a', 'require should get right value');
    });

    it('requireArray', function () {
        let ab = requireArray('mocha ./a');
        assert(Array.isArray(ab), 'result should be an array');
    });

    it('requireFolder', function () {
        let ms = requireFolder('./', __dirname);
        assert(typeof ms === 'object', 'require result should be a object');
    });
})