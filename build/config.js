/* eslint-disable no-param-reassign */
/**
 * webpack 公共配置，比如 externals、alias
 */
 const path = require('path');
 const fs = require('fs');
 const nodeExternals = require('webpack-node-externals');
 const Components = require('../components.json');
 
 const utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
 const mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
 const transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
 /**
  * externals 解决组件依赖其它组件并按需引入时代码冗余的问题
  *     比如 Table 组件依赖 Checkbox 组件，在项目中如果我同时引入 Table 和 Checkbox 时，会不会产生冗余代码
  *     如果没有以下内容的的话，会，这时候你会看到有两份 Checkbox 组件代码。
  *     包括 locale、utils、mixins、transitions 这些公共内容，也会出现冗余代码
  *     但有了 externals 的设置，就会将告诉 webpack 不需要将这些 import 的包打包到 bundle 中，运行时再从外部去
  *     获取这些扩展依赖。这样就可以在打包后 /lib/tables.js 中看到编译后的 table.js 对 Checkbox 组件的依赖引入：
  *     module.exports = require("composite-ui/lib/checkbox")
  *     这么处理之后就不会出现冗余的 JS 代码，但是对于 CSS 部分，composite-ui 并未处理冗余情况。
  *     可以看到 /lib/theme-chalk/table.css 和 /lib/theme-chalk/checkbox.css 中都有 Checkbox 组件的样式
  */
 let externals = {};
 
 Object.keys(Components).forEach(function(key) {
   externals[`composite-ui/packages/${key}`] = `composite-ui/lib/${key}`;
 });
 
 externals['composite-ui/src/locale'] = 'composite-ui/lib/locale';
 utilsList.forEach(function(file) {
   file = path.basename(file, '.js');
   externals[`composite-ui/src/utils/${file}`] = `composite-ui/lib/utils/${file}`;
 });
 mixinsList.forEach(function(file) {
   file = path.basename(file, '.js');
   externals[`composite-ui/src/mixins/${file}`] = `composite-ui/lib/mixins/${file}`;
 });
 transitionList.forEach(function(file) {
   file = path.basename(file, '.js');
   externals[`composite-ui/src/transitions/${file}`] = `composite-ui/lib/transitions/${file}`;
 });
 
 externals = [Object.assign({
   vue: 'vue'
 }, externals), nodeExternals()];
 
 exports.externals = externals;
 
 // 设置别名，方便使用
 exports.alias = {
   main: path.resolve(__dirname, '../src'),
   packages: path.resolve(__dirname, '../packages'),
   examples: path.resolve(__dirname, '../examples'),
   'composite-ui': path.resolve(__dirname, '../')
 };
 
 exports.vue = {
   root: 'Vue',
   commonjs: 'vue',
   commonjs2: 'vue',
   amd: 'vue'
 };
 
 exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
 