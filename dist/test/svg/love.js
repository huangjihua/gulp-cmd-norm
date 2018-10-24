
define("mod/svg/love" ,[], function(require , exports , module){
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