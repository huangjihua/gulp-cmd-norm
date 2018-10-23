/*! CHEUI Touch v1.0.0 by 2SC (c) 2018 Licensed ISC */ 
/** */
/**
 * utils  tools
 * author:huangjihua
 */
define("mod/core/utils" ,[], function(require , exports , module){
    var utils = {};
    var PREFIXES = 'Webkit Moz O ms'.split(' ');
    var FLOAT_COMPARISON_EPSILON = 0.001;
    module.exports = utils;
    /**
     * 显示模板与给定的变量。变量必须包围括号没有任何空间,例如{变量}所有实例变量的占位符将替换内容
     *  @param template {String}
     *  @param keyValues {Object Json}}
     * Example: render('Hello, {message}!', {message: 'world'})
     */
    utils.render =function(template,keyValues){
        var rendered  = template;
        for(var key in keyValues){
            if(keyValues.hasOwnProperty(key)){
                var val = keyValues[key];
                var regExpString = '\\{'+key+'\\}';
                var regExp = new RegExp(regExpString,'g');
                rendered  =rendered.replace(regExp,val);
            }
        }
        return rendered;
    }
});