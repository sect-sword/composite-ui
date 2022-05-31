import Item from './src/main';

/* istanbul ignore next */
Item.install = function(Vue) {
  Vue.component(Item.name, Item);
};

export default Item;
