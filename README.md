esrequire
====

This module extend node.js original require method to enable you require multiple module in one single call. Use with [es6 destructuring](http://www.2ality.com/2015/01/es6-destructuring.html) you can require modules in a very concise way, utilize features like es6 module.


### Install

This module require node > 4.0


```
    $ npm install esrequire --save
```

Require it in you start file

```
    require('esrequire');

    require('express');  // same as node one

    // when you pass multi module name it will return an object include all the modules
    let {express, co, koa} = require('express co koa');
    let {express, co, koa} = require(['express', 'co', 'koa']);  // you can also pass an array
```

There is an global requireArray method which will return modules in an array.
```
    let [express, co, koa] = requireArray('express co koa');
```

Note: to learn destructuring check [here](http://www.2ality.com/2015/01/es6-destructuring.html)

