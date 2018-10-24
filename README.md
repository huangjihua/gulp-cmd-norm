# gulp-cmd-norm
[![NPM Version](https://img.shields.io/npm/v/gulp-cmd-norm.svg)](https://npmjs.org/package/gulp-cmd-norm)  [![NPM Downloads](http://img.shields.io/npm/dm/gulp-cmd-norm.svg)](https://npmjs.org/package/gulp-cmd-norm)

[document](https://github.com/huangjihua/gulp-cmd-norm)
[中文文档](https://github.com/huangjihua/gulp-cmd-norm/chinese.md)
gulp-cmd-norm is a simple standardized CMD modular packaging tool.
## Feature
- automatically handles module paths and other issues.
- Support for dependency module merging.

## Install
    npm intall gulp-cmd-norm
## Usage

```js
    var gulp = require('gulp');
    var cmd = require('gulp-cmd-norm');
    gulp.task('test', function () {
        gulp.src(['test/**/*.js'])
            .pipe(cmd({
                id:'mod/', //对应seajs config => paths
                // merge:true, //是否合并依赖模块，默认false
                // isExt:true, //是否自动增加.js扩展名,默认false
                base: 'test/',  //module根目录
            }))
            .pipe(gulp.dest('dist/test/'))
            .on('Error',function(error){
                console.log(error);
            });
    });
```

# Intro

#### source

``` js
    //test.js
    define(function(require, exports , module) {
    'use strict';
        module.exports = function Person(name,age,tel){
            this.name=name;
            this.age= age;
            this.tel =tel
            Person.prototype.say = function(msg){
                console.log(this.name +' 说：'+msg);
            }
        }
    });
```
####  Out 
``` js
    define("mod/svg/test" ,[], function(require , exports , module){
        'use strict';
        module.exports = function Person(name,age,tel){
            this.name=name;
            this.age= age;
            this.tel =tel
            Person.prototype.say = function(msg){
                console.log(this.name +' 说：'+msg);
            }
        }
    });
```

## API
**cmd({id:'mod/',base:'test/',....})**

#### Parameters
|parameters name | data type | description |
|----------|:-------------:|------:|
| id | String | Module Path? Configuration |
| alias | Array | Module Alias |
| isExt | Boolean | Does the module automatically? Append .js |
| merge | Boolean | Whether to merge dependent modules for unified packaging |
| ignore | Array | Ignore ?? module file ? |
| encoding| String | File Encoding |
| tmpExtNames| String | Custom Extension |

-----------------