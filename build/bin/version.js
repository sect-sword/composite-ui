/**
 * 根据 package.json 自动生成 /examples/version.json，用于记录组件库的版本信息
 * 这些版本信息在官网组件页面的头部导航栏会用到
 */
const fs = require('fs');
const path = require('path');
const version = process.env.VERSION || require('../../package.json').version;
const content = { '0.0.1': '0.1',};
if (!content[version]) content[version] = '0.1';
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));
