esrequire
====

This module extend node.js original require method to enable you require multiple module in one single call. Use with [es6 destructuring](http://www.2ality.com/2015/01/es6-destructuring.html) you can require modules in a very concise way, utilize features like es6 module.


### Install


```
    $ npm install esrequire --save
```

Require it in you start file

```
    require('esrequire');

    // same as native node require
    require('express');  
    // if you pass multi module name like this, these module will be wrapped in an object
    var modulesObject = require('express co koa');
    // if you pass an array of module names, the result is an array of module in the same order
    var modulesArray = require(['express', 'co', 'koa']);
```


This seems not a big deal, but if you use it with ES6 desctructuring, it will be very awesome

```
    // you can require multiple module in one line
    let {express, co, koa} = require('express co koa');
    let [express, co, koa] = require(['express', 'co', 'koa']);

    // you can rename on module 
    let {'body-parser': bodyParser} = require('body-parser');
    let [bodyParser] = require(['body-parser']);

    // you can only require the thing you want from an module
    let {Router} = require('express');
```

Note: to learn destructuring check [here](http://www.2ality.com/2015/01/es6-destructuring.html)

This module has export an object `esRequire` to `global`, it provide some handy require method, for example 
```
    // this will wrap all file modules in one folder into one object, key is the file name.
    let {module1, module2, module3} = esRequire.folder('./test', __dirname);
```




### TODO 

ToRefer: xrequire

