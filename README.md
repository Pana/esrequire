esrequire
====

This module extend node.js original require method to enable you require multiple module in one single call. Use with [es6 destructuring](http://www.2ality.com/2015/01/es6-destructuring.html) you can require modules in a very concise way, utilize features like es6 module.


### Install


```
    $ npm install esrequire --save
```

Require it in you apps first line

```js
    require('esrequire');

    // same as native node require
    require('express');  
    
    // pass multi module name like this, result will be an object 
    var modulesObject = require('express co koa');
    
    // pass an module name array, result is an array of module in the same order
    var modulesArray = require(['express', 'co', 'koa']);
```


This seems not a big deal, but if you use it with ES6 desctructuring, it will be very awesome

```js
    // require multiple module in one line
    let {express, co, koa} = require('express co koa');
    let [express, co, koa] = require(['express', 'co', 'koa']);

    // rename module 
    let {'body-parser': bodyParser} = require('body-parser');
    let [bodyParser] = require(['body-parser']);

    // only require what you need
    let {Router} = require('express');
```

Note: to learn destructuring check [here](http://www.2ality.com/2015/01/es6-destructuring.html)

This module has export an object `esRequire` to `global`, it provide some handy require method, for example folder require

```js
    // require all the files in one folder.
    let {module1, module2, module3} = esRequire.folder('./test', __dirname);
```




### TODO 

To Refer: xrequire

