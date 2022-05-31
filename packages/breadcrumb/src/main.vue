<template>
  <div class="pe-breadcrumb clearfix">
    <div v-if="$slots && $slots.before" class="pe-breadcrumb_before">
      <slot name="before" />
    </div>
    <div v-else-if="before" class="pe-breadcrumb_before">{{ before }}</div>
    <template v-if="$slots && $slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <breadcrunm-item
        @clickName="clickName"
        v-for="(it, idx) in list"
        :key="isObjectArray ? it[propKey] : it"
        :separator="separator"
        :separatorClass="separatorClass"
        :to="it.to || ''"
        :it="it"
        :replace="isProperty(it, 'replace') ? it.replace : ''"
        :last="idx === list.length - 1"
        @click="getEmit(isObjectArray ? it[propsValue] : it)"
      >
        {{ isObjectArray ? it[propsValue] : it }}
      </breadcrunm-item>
    </template>
  </div>
</template>

<script>
import { isProperty, isRealArray } from "main/utils/comment";
import breadcrunmItem from "./breadcrunmItem.vue";

export default {
  name: "biBreadcrumb",
  components: { breadcrunmItem },
  props: {
    // 面包屑前方文字，或者用slot = 'before' 传入, 同时传入时 slot优先
    before: {
      default: "",
      type: String,
    },
    // 分隔符, 符号 eg: / > - 默认为 >  优先于separatorClass
    separator: {
      default: ">",
      type: String,
    },
    // 图标分隔符 class
    separatorClass: {
      default: "",
      type: String,
    },
    // 面包屑的数据。如果传入slot 则不会使用list数据, 如果是对象数组则可能需要传入 propKey和propValue,如果是字符串数组则不用传
    // 如果使用list传，则可以添加to和replace属性
    // to	路由跳转对象，同 vue-router 的 to	string/object
    // replace 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录	boolean
    // 如果使用slot 和 breadcrunmItem 则直接传入prop即可
    list: {
      default: () => [],
      type: Array,
    },
    // 面包屑数据的主键，默认为id
    propKey: {
      default: "id",
      type: String,
    },
    // 面包屑的值, 默认为label
    propsValue: {
      default: "label",
      type: String,
    },
  },
  data() {
    return {
      isLoad: false,
      isObjectArray: false,
      boxHeight: 0,
    };
  },
  mounted() {
    this.checkData();
  },
  methods: {
    clickName(a) {
      this.$emit("routerinfo", a);
    },
    isProperty,
    // 检测数据格式，propKey和list，如果没有则报错
    checkData() {
      if (isRealArray(this.list) && !this.$slots.default) {
        for (let index = 0; index < this.list.length; index++) {
          if (
            typeof this.list[index] === "object" &&
            !isProperty(this.list[index], this.propKey)
          ) {
            this.isObjectArray = true;
            throw new Error(
              "[biBreadcrumb]: The attribute 'propKey' in list underfind ,Please check prop 'propKey'"
            );
          }
        }
      }
    },
  },
};
</script>

