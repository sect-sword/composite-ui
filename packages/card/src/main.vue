<template>
  <div
    class="pe-card_wrap"
    :class="[shadow === 'true' ? 'pe-card_shadow' : '']"
    :style="{
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: border,
      paddingBottom: paddingBottom || padding,
      paddingLeft: paddingLeft || padding,
      paddingRight: paddingRight || padding,
      paddingTop: paddingTop || padding,
    }"
  >
    <div v-if="title" class="pe-card_header">{{ title }}</div>
    <div v-else-if="$slots && $slots.header" class="pe-card_header">
      <slot name="header" />
    </div>
    <div class="pe-card_body">
      <slot />
    </div>
    <div v-if="footer" class="pe-card_footer">{{ footer }}</div>
    <div v-else-if="$slots && $slots.footer" class="pe-card_footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PeCard",
  props: {
    title: {
      default: "",
      type: String,
    },
    footer: {
      default: "",
      type: String,
    },
    // shadow 可选 true  fasle  hover
    shadow: {
      default: "true",
      type: String,
    },
    border: {
      default: "rgba(230, 241, 255, 1)",
      type: String,
    },
    padding: {
      default: "",
      type: String,
    },
    paddingTop: {
      default: "",
      type: String,
    },
    paddingLeft: {
      default: "",
      type: String,
    },
    paddingBottom: {
      default: "",
      type: String,
    },
    paddingRight: {
      default: "",
      type: String,
    },
  },
};
</script>

