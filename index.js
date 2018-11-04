/**
 * Created bu hank on 2018/10/22
 * 1.修正模块引入的js模块的路径相对于父模板块路径，自动获取文件名
 * 2.对模板中的‘字符进行替换(\')
 */
var through = require('through2');
var Promise = require('promise');
var path  = require('path');
var fs = require('fs');
var gutil = require('gulp-util');
var _=require('underscore');


var PLUGIN_NAME = 'gulp-cmd-norm';
/**
 * 修复匹配 `require('mod')` 时,多匹配一个字符的bug
 * 如: var name=require('./mod');
 * 之前匹配: `=require('./mod')`;
 * 修改之后: `require('./mod')`;
 * @type {RegExp}
 */
var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\w+require\(.*\)|require\s*\(\s*(["'])(.+?)\1\s*\)/g;


/**
 * 解析模块树并读取模块
 * @param {Object} option 
 * @param {Object} file 
 */
function parseModuleContents(option,file){
    // var modFilepPath = path.resolve(file.base, file.relative);
    var modFilepPath = file.path;
    modDirPath = path.dirname(modFilepPath);
    fileRelative = modFilepPath.split(option.base)[1].replace(/(.min)?(.js)/g,'');
    // console.log('modDirPath:',modDirPath);
    return new Promise((resolve,reject) => {
        var deps = parseDependencies(option,option.content,{
            root: true,
            id: option.id+fileRelative,
            dir:modDirPath,
            filePath:modFilepPath
        });
     
        if(deps.length){
            resolve(readDeps(option,deps));
        }else{
            resolve();
        }
    })
}

/**
 * 解析模块依赖列表
 * @param {Object} option 
 * @param {String} content 
 * @param {Object} mod 
 */
function parseDependencies(option,content,mod){
    var ret = [];
    content.replace(REQUIRE_RE,function(m,m1,moduleId){
        moduleId && ret.push(moduleId);
    });
    var deps = _.chain(ret).uniq().map(function(moduleId){
        return parseMod(moduleId,option,mod.dir);
    }).value();
    mod.deps = deps;
    mod.content = content;
    option.mods.push(mod);
    return deps;
}

/**
 * 解析单个模板
 * @param {String} id 
 * @param {Object} option 
 * @param {String} parentDir 
 */
function parseMod(id,option,parentDir){
    var ret = getPath(id,option,parentDir);
    //别名配置
    var isAlias = option.alias[id];
    var ext = path.extname(ret); //扩展名
    if(option.isExt){
        //用来支持*.min.js模块引用
        if(!ext || ext =='.min'){
            ret +='.js' 
        }
    }
    var filePath = ret;
    ret = path.parse(ret);
    
    ret.id = isAlias ? id:getId(filePath,option);
    ret.filePath = filePath;
    return  ret;
}

/**
 * 获取模块Path
 * @param {String} id 
 * @param {Object} option 
 * @param {String} parentDir 
 */
function getPath(id,option,parentDir){
    var ret ;
    var first = id.charAt(0);
    // console.log('parentDir:',parentDir);
    if(first ==='.'){
        ret = path.resolve(parentDir || option.base,id);
    }else if(option.alias[id]){
        ret = path.resolve(option.base,option.alias[id]);
    }else{
        ret =(option.base +id);
    }
    // console.log('ret:',option.base);
    return path.normalize(ret);
}

/**
 * 获取模块ID/Name
 * @param {String} filePath 
 * @param {Object} option 
 */
function getId(filePath,option){
    var reg = /\\/g;
    return filePath.replace(option.base,'').replace(reg,'/');
}

/**
* 读取Dependencies
 * @param {Object} option 
 * @param {Array} parentDeps 
 */
function readDeps(option,parentDeps){
    var childDeps = [];
    // console.log("parentDeps:",parentDeps);
    //多个promise示例对象集合，
    var promises  = parentDeps.map(function(mod){
        return new Promise(function(resolve,reject){
            //忽略的模块
            if(option.ignore.indexOf(mod.id) > -1){
                return resolve();
            }

            if(option.cache[mod.filePath]){
                return resolve();
            }

            var contents,deps;
            if(mod.ext === '.js' || option.tmpExtNames.indexOf(mod.ext) > -1){
                try{
                    contents = fs.readFileSync(mod.filePath,option.encoding);
                }catch(_){
                    reject("File ["+ mod.filePath + "] not found");
                    return;
                }
                option.cache[mod.filePath] = true;
            }

            if(mod.ext == '.js'){
                deps = parseDependencies(option,contents,mod);
                if(deps.length){
                    childDeps = childDeps.concat(deps);
                }
            }else if(option.tmpExtNames.indexOf(mod.ext) >-1){
                //插件支持
                parseTemplate(option,contents,mod);
            }
            resolve();
        });
    });
    //处理多个promises示例报错一个新的Promise示例
     return Promise.all(promises).then(function(){
        if(childDeps.length){
            return readDeps(option,childDeps);
        }
     },function(err){
         gutil.log(gutil.colors.red(PLUGIN_NAME + 'Error:'+err));
     }).catch(function(err){
         gutil.log(gutil.colors.red(PLUGIN_NAME + 'Error:'+err));
         console.log(err.stack);
     });
}

/**
 * 模块处理与合并
 * @param {Object} option 
 */
function comboContents(option) {
    var CMD_HEAD_REG = /define\(.*?function\s*\(.*?\)\s*\{/;
    var content = '';
    option.mods.forEach(function (mod) {
        var code = mod.content;
        
        //替换模块内部id
        code = transform(option, mod, code);

        var deps = '[],';
       
        
        if (mod.deps.length) {
            // console.log('mod:', mod.deps);
            mod.deps.forEach(function (item) { 
                //如果不包含传入id，这里加上
                if (item.id.search(option.id) === -1) {
                    item.id = option.id + item.id;
                }
                // console.log(item.id);
            })
           
            deps = '["' + _.pluck(mod.deps, 'id').join('","') + '"],';
               
        }
    
        var define = 'define(';
        //当主模块为空时，设置为匿名模块，以方便自动执行
        if (mod.id) {
            define += '"' + mod.id + '" ,';
        }
        
        define += deps + ' function(require , exports , module){';
        if (!CMD_HEAD_REG.test(code)) {//标准commonjs模块
            code = define + '\n' + code + '\n});';
        } else {//cmd 模块
            code = code.replace(CMD_HEAD_REG, define);
        }
        if(option.merge){
            content += code + '\n'; //依赖模块合并
        }else{
            content = code; //单个模块
        }
    });
    return content;
}
/**
 *  CMD标准化处理
 * @param {Object} option 
 * @param {Object} mod 
 * @param {String} code 
 */
function transform(option, mod, code) {
    // console.log('mod', mod.id);

    code.replace(REQUIRE_RE, function (code_ref,m1,moduleId) {
        /**
         * code_ref 正则所匹配到的代码如 `require('./mod')`
         * moduleId 匹配到的模块路径或者id `./mod`
         * 条件:模块存在且不在忽略列表里 且 不在别名里 才对模块进行替换
         */
        if (moduleId && option.ignore.indexOf(moduleId) == -1 && !option.alias[moduleId]) {
            var newId = getId(getPath(moduleId, option, mod.dir), option);
            if(option.isExt){
                if (!path.extname(newId)) {
                    newId += '.js';
                }
            }
            //如果不包含传入id，这里加上
            if (newId.search(option.id) === -1) {
                newId = option.id + newId;
            }
            newId = 'require("' + newId + '")';
          
            code = code.replace(code_ref, newId);
        }
    });

    return code;
}

/**
 * 模板模块处理
 * @param {Object} option 
 * @param {String} code 
 * @param {Object} mod 
 */
function parseTemplate(option, code, mod) {
    mod.content = 'module.exports = \'' + jsEscape(code) + '\';';
    mod.deps = [];
    option.mods.push(mod);
}

/**
 * 处理字符
 * @param {String} content 
 */
function jsEscape(content) {
    //替换符号 u2028 u2029 \f \b \t \r ' " \
    return content.replace(/([\u2029\u2028\f\b\t\r'"\\])/g, "\\$1")
        .replace(/\n/g, ' ');// 这里替换换行符为空格
}

module.exports = function(option){
    option = Object.assign({
        mods: [],
        content: '',
        id: '',
        alias: {},
        isExt: false, //是否处理.min.js情况
        merge: false, //依赖模块是否合并打包
        ignore: [],
        encoding: 'UTF-8',
        tmpExtNames: ['.tpl', '.ejs'],
        cache: {}
    }, option);
    option._base = option.base;
    if(option.base){
        option.base = path.normalize(path.resolve(option.base,'.')+path.sep);
    }
    return through.obj(function(file,enc,cb){
        if(!file){
            return cb();
        }

        if(!option.base){
            gutil.log(gutil.colors.red(PLUGIN_NAME+' error: `option.base` is  required!'));
            return cb(null,file);
        }
        // console.log('file:',file);
        // 处理module content;
        if(file.isBuffer()){
            option.content =file.contents.toString();
            parseModuleContents(option,file).then(function(){
                // var jsFilePath = file.base + path.sep + file.relative;
                var jsFilePath = file.path;
                // console.log(jsFilePath);
                // console.log('path:', file.path); 
                // jsFilePath = path.normalize(jsFilePath);
                //  console.log(jsFilePath);
                file.contents = new Buffer(comboContents(option));
                gutil.log(PLUGIN_NAME + ':','✔ Module [' + jsFilePath + '] combo success.');
                cb(null,file);
            });
            return;
        }
        return cb(null,file);
    });

}