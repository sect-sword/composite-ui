<template>
  <div class="bi-breadcrumb_item">
    <span class="bi-breadcrumb_inner" @click="handleTap">
      <slot></slot>
    </span>
    <i
      v-if="!last"
      :class="['bi-breadcrumb_separator', separatorClass ? separatorClass : '']"
    >
      {{ separatorClass ? "" : separator }}
    </i>
  </div>
</template>

<script>
export default {
  name: "breadCrunmItem",
  props: {
    // 分隔符, 符号 eg: / > - 默认为 >  separatorClass 优先于 separator 有 separatorClass 则显示 separator
    separator: {
      default: "＞",
      type: String,
    },
    // 图标分隔符 class
    separatorClass: {
      default: "",
      type: String,
    },
    // 图标分隔符 class
    to: {
      default: "",
      type: [String, Object],
    },
    replace: {
      default: false,
      type: Boolean,
    },
    last: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    handleTap() {
      this.$emit("clickName", this.it);
      if (this.to) {
        this.replace
          ? this.$router.push(this.to)
          : this.$router.replace(this.to);
      }
    },
  },
};
</script>
