<template>
  <div class="pe-swiper-item">
    <template v-if="$slots && $slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <div class="pe-swiper-box" v-if="type === 'html'" v-html="content"></div>
      <div class="pe-swiper-box" v-else>
        <img v-if="type === 'image'" :src="content" alt="" />
        <template v-if="type === 'text'">{{ content }}</template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "PeSwiperItem",
  props: {
    // type 可接受 html  text image 三种类型，
    type: {
      default: "",
      type: String,
    },
    content: {
      default: "",
      type: String,
    },
  },
};
</script>
