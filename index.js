'use strict';
let Module = require('module');
let fs = require('fs');
let path = require('path');

let _require = Module.prototype.require;
let _resolve = Module._resolveFilename;
let ParameterLackError = new Error('Module parameter is required');

Module.prototype.require = enhanceRequire;

/*
    @param {String|Array} names can be one single module name or an module array or space joined modules
    @return {Object}
*/ 
function enhanceRequire(names) {
    if (typeof names === 'undefined') throw ParameterLackError;
    names = _checkArray(names);
    let result;
    if (Array.isArray(names)) {
        result = {};
        for (let n of names) {
            let nameToLoad = _resolve(n, this);
            result[n] = _require.call(this, nameToLoad);
        }
    } else {
        let nameToLoad = _resolve(names, this);
        result = _require.call(this, nameToLoad);
    }
    return result;
};

/*
    @param {String|Array} names can be one single module name or an module array or space joined modules
    @return {Array} 
*/ 
function requireArray(names) {
    if (typeof names === 'undefined') throw ParameterLackError;
    names = _checkArray(names);
    let result;
    if (Array.isArray(names)) {
        result = [];
        for (let n of names) {
            let nameToLoad = _resolve(n, this);
            result.push(_require.call(this, nameToLoad));
        }
    } else {
        let nameToLoad = _resolve(names, this);
        result = _require.call(this, nameToLoad);
    }
    return result;
}

/*
    Require all js files in one folder
    @param {String|Array} names can be one single module name or an module array or space joined modules
    @return {Object} Include all file module, key is the bare file name
*/ 
function requireFolder(folder, dir) {
    if (typeof folder === 'undefined') throw ParameterLackError;
    if (dir && !/^\//.test(folder)) folder = path.join(dir, folder); // maybe need add deal
    let files = fs.readdirSync(folder);
    let result = {};
    let reg = /\.js$/;
    for (let ff of files) {
        if (reg.test(ff)) {
            let name = ff.replace('.js', '');
            result[name] = require(path.join(folder, ff));
        }
    }
    return result;
}

global.requireArray = requireArray.bind(module.parent);
global.requireFolder = requireFolder;

/*
 *   turn space splited string into array
 */
function _checkArray(names) {
    if (typeof names !== 'string') return names;
    let ta = names.split(' ');
    return ta.length > 1 ? ta : names;
}

let needed = Module.prototype.require.bind(module.parent);
module.exports = needed;
