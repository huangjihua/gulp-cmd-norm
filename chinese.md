# gulp-cmd-norm
[![NPM Version](https://img.shields.io/npm/v/gulp-cmd-norm.svg)](https://npmjs.org/package/gulp-cmd-norm) ![Travis (.org)](https://img.shields.io/travis/:user/:repo.svg) [![npm](https://img.shields.io/npm/dt/:package.svg)](https://github.com/huangjihua/gulp-cmd-norm) ![SonarQube Coverage](https://img.shields.io/sonar/http/sonar.petalslink.com/org.ow2.petals%3Apetals-se-ase/coverage.svg) [![GitHub issues](https://img.shields.io/github/issues/huangjihua/gulp-cmd-norm.svg)](https://github.com/huangjihua/gulp-cmd-norm/issues) [![GitHub forks](https://img.shields.io/github/forks/huangjihua/gulp-cmd-norm.svg)](https://github.com/huangjihua/gulp-cmd-norm/network) [![GitHub stars](https://img.shields.io/github/stars/huangjihua/gulp-cmd-norm.svg)](https://github.com/huangjihua/gulp-cmd-norm/stargazers) [![GitHub license](https://img.shields.io/github/license/huangjihua/gulp-cmd-norm.svg)](https://github.com/huangjihua/gulp-cmd-norm/blob/master/LICENSE) 


[document](https://github.com/huangjihua/gulp-cmd-norm)
[中文文档](https://github.com/huangjihua/gulp-cmd-norm/chinese.md)

gulp-cmd-norm 是一个简单的标准化CMD模块化封装工具。

## 特性
- 解决模块的路径问题
- 支持多模块合并

## 安装
    npm intall gulp-cmd-norm
## 使用

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

## 介绍

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

| parameters name   |    data  type      |  description |
|----------|:-------------:|------:|
| id      |  String |   模块路径配置 |
| alias   |  Array  |   模块别名 |
| isExt   | Boolean |   模块是否自动追加.js |
| merge   | Boolean |   是否合并依赖模块统一打包 |
| ignore  | Array   |   忽略的模块文件  |
| encoding| String  |   文件编码 |
| tmpExtNames| String | 自定义扩展名 |

-----------------