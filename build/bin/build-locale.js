/**
 * 通过 babel 将 ES Module 风格的翻译文件转译成 UMD 风格
 */
 const fs = require('fs');
 const save = require('file-save');
 const resolve = require('path').resolve;
 const basename = require('path').basename;
 
 // 翻译文件目录，这些文件用于官网
 const localePath = resolve(__dirname, '../../src/locale/lang');
 // 得到目录下的所有翻译文件
 const fileList = fs.readdirSync(localePath);
 
 // 转换函数
 const transform = function(filename, name, cb) {
   require('babel-core').transformFile(resolve(localePath, filename), {
     plugins: [
       'add-module-exports',
       ['transform-es2015-modules-umd', {loose: true}]
     ],
     moduleId: name
   }, cb);
 };
 
 // 遍历所有文件
 fileList
   // 只处理 js 文件，其实目录下不存在非 js 文件
   .filter(function(file) {
     return /\.js$/.test(file);
   })
   .forEach(function(file) {
     const name = basename(file, '.js');
 
     // 调用转换函数，将转换后的代码写入到 lib/umd/locale 目录下
     transform(file, name, function(err, result) {
       if (err) {
         console.error(err);
       } else {
         let code = result.code;
 
         code = code
           .replace('define(\'', 'define(\'composite/locale/')
           .replace('global.', 'global.COMPOSITE.lang = global.COMPOSITE.lang || {}; \n    global.COMPOSITE.lang.');
         save(resolve(__dirname, '../../lib/umd/locale', file)).write(code);
 
         console.log(file);
       }
     });
   });
 