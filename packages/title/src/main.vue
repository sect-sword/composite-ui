<template>
  <div class="pe-title" :style="styleObj">
    <i v-if="line" class="left-line" :style="lineStyle"></i>
    <span class="pe-title_text">{{ title }}</span>
    <div v-if="$slots && $slots.icon" class="pe-title_icons">
      <slot name="icon" />
    </div>
    <div v-if="$slots && $slots.btns" class="pe-title_btns">
      <slot name="btns" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PeTitle",
  props: {
    title: {
      default: "",
      type: String,
    },
    height: {
      default: 40,
      type: Number,
    },
    fontSize: {
      default: 16,
      type: Number,
    },
    line: {
      default: true,
      type: Boolean,
    },
    paddingLeft: {
      default: 0,
      type: Number,
    },
  },
  computed: {
    styleObj() {
      return {
        height: this.height + "px",
        lineHeight: this.height + "px",
        fontSize: this.fontSize + "px",
        paddingLeft: this.paddingLeft,
      };
    },
    lineStyle() {
      return { marginTop: (this.height - 26) / 2 + "px" };
    },
  },
};
</script>

