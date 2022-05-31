import Title from './src/main';

/* istanbul ignore next */
Title.install = function(Vue) {
  Vue.component(Title.name, Title);
};

export default Title;
