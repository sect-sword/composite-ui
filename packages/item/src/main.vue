<template>
  <div class="pe-item" :class="{ inline: labelWidth }" :style="styleLong">
    <label :class="labelClazz" :style="styleWid">{{ label }}</label>
    <div class="pe-item_content" :style="styleMar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PeItem",
  props: {
    label: {
      default: "",
      type: String,
    },
    labelWidth: {
      default: "",
      type: String,
    },
    height: {
      default: "40px",
      type: String,
    },
    width: {
      default: "",
      type: String,
    },
    require: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    labelClazz() {
      return this.require ? "pe-item_label is-required" : "pe-item_label";
    },
    styleLong() {
      return this.width ? { width: this.width } : {};
    },
    styleWid() {
      return this.labelWidth ? { width: this.labelWidth } : {};
    },
    styleMar() {
      return this.labelWidth
        ? { marginLeft: this.labelWidth }
        : { lineHeight: this.height };
    },
  },
};
</script>

