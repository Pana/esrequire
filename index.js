'use strict';
var Module = require('module');
var fs = require('fs');
var path = require('path');

// original node.js native require method
var _require = Module.prototype.require;
// Error object
var ParameterLackError = new Error('Parameter required');

/*
    @param {String|Array} names can be one single module name or an module array or space joined modules
    @return {Object}
*/ 
function esRequire(names) {
    if (typeof names === 'undefined') throw ParameterLackError;
    var result;
    if (Array.isArray(names)) {
        result = [];
        for (var i in names) {
            var n = names[i];
            result.push(_require.call(this, n));
        }
    } else {
        names = _checkArray(names);
        if (Array.isArray(names)) {
            result = {};
            for (var i in names) {
                var n = names[i];
                result[n] = _require.call(this, n);
            }
        } else {
            result = _require.call(this, names);
        }
    }
    return result;
};

Module.prototype.require = esRequire;
// Module.prototype.require.bind(module.parent);

/*
    Require all js files in one folder
    @param {String|Array} names can be one single module name or an module array or space joined modules
    @return {Object} Include all file module, key is the bare file name
*/ 
function requireFolder(folder, dir) {
    if (typeof folder === 'undefined') throw ParameterLackError;
    if (dir && !/^\//.test(folder)) folder = path.join(dir, folder); // maybe need add deal
    var files = fs.readdirSync(folder);
    var result = {};
    var reg = /\.js$/;
    for (var i in files) {
        var ff = files[i];
        if (reg.test(ff)) {
            var name = ff.replace('.js', '');
            result[name] = require(path.join(folder, ff));
        }
    }
    return result;
}

/*
    
*/
function localRequire(name, dir) {
    return require(path.join(dir, name));
}

// export to global variable
global.esRequire = {
    folder: requireFolder,
    local: localRequire
}

/*
 *   turn space splited string into array
 */
function _checkArray(names) {
    if (typeof names !== 'string') return names;
    var ta = names.split(' ');
    return ta.length > 1 ? ta : names;
}
 
// module.exports = needed;
