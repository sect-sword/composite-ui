<template>
  <div
    class="pe-swiper-container clearfix"
    ref="peSwiper"
    :style="{ height }"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
  >
    <div
      :class="[
        'pe-swiper-forward',
        'pe-swiper-prefix',
        forward && forwardType === 'position' ? 'bi-forward-fix' : '',
        showPerfix ? 'bi-forward-show' : '',
      ]"
      @click="setForward(-1)"
    >
      <slot name="prefix" v-if="$slots && $slots.prefix"></slot>
      <!-- <img v-else-if="forward" src="./index_tl.png" alt="" /> -->
    </div>

    <div class="pe-swiper-content">
      <template v-if="$slots && $slots.default">
        <slot></slot>
      </template>
      <peSwiperItem
        ref="peSwiperItems"
        v-else
        v-for="it in list"
        :key="it.id"
        :content="it.content"
        :type="it.type"
      ></peSwiperItem>
    </div>

    <div
      :class="[
        'pe-swiper-forward',
        'pe-swiper-suffix',
        forward && forwardType === 'position' ? 'bi-forward-fix' : '',
        showPerfix ? 'bi-forward-show' : '',
      ]"
      @click="setForward(1)"
    >
      <slot name="suffix" v-if="$slots && $slots.suffix"></slot>
      <!-- <img v-else-if="forward" src="./index_tr.png" alt="" /> -->
    </div>
  </div>
</template>

<script>
import peSwiperItem from "./swiperItem.vue";
import { getCss, isRealArray } from "main/utils/comment";
import { setStyle } from "main/utils/dom";
// 两个滑动元素之间的距离
const SPACEWIDTH = 8;
// 左右按钮的宽度
const FORWARD = 32;

// 支持 slot 传入 perfix 和 suffix slot = perfix || suffix
export default {
  name: "PeSwiper",
  components: {
    peSwiperItem,
  },
  props: {
    // 轮播图的数据，如果使用了slot模式，则list不会在显示，并且使用slot模式的时候 需要和 peswiperItem 搭配使用
    // 且使用slot模式时， peswiperItem 需要直接循环不能在外层有父级元素
    list: {
      default: () => [],
      type: Array,
    },
    // 轮播的时间
    time: {
      default: 2000,
      type: Number,
    },
    // 是否需要方向按钮
    forward: {
      default: true,
      type: Boolean,
    },
    // 方向按钮的显示方式 inner为在元素内部显示   position 为在两侧 hover显示
    // positon暂时不支持
    forwardType: {
      default: "inner",
      type: String,
    },
    // 是否自动轮播
    auto: {
      default: true,
      type: Boolean,
    },
    // 是否循环显示
    loop: {
      default: true,
      type: Boolean,
    },
    // 轮播图的高度
    height: {
      default: "",
      type: String,
    },
    // 同时显示几个
    long: {
      default: 4,
      type: Number,
    },
  },
  data() {
    return {
      itemWidth: 0,
      initialIndex: 0,
      doms: [],
      timer: null,
      isInBox: false,
    };
  },
  computed: {
    showPerfix() {
      return this.forward && this.forwardType === "position"
        ? this.isInBox
        : this.forward;
    },
  },
  mounted() {
    this.checkData();
  },
  methods: {
    handleEnter() {
      this.isInBox = true;
      this.stopLoop();
    },
    handleLeave() {
      this.isInBox = false;
      this.startLoop();
    },
    setForward(num) {
      const maxIndex = this.doms.length - this.long;
      const minIndex = 0;
      const initialIndex = this.initialIndex + num;

      if (!this.loop) {
        switch (initialIndex) {
          case initialIndex > maxIndex:
            this.initialIndex = maxIndex;
            break;
          case initialIndex < minIndex:
            this.initialIndex = minIndex;
            break;
          default:
            this.initialIndex = initialIndex;
            break;
        }
      } else {
        this.initialIndex = this.initialIndex - num;
      }
      this.setPosition(this.initialIndex);
    },
    checkData() {
      if (
        this.list.length < this.long &&
        this.$slots.default.length < this.long
      ) {
        throw new Error(
          "[peSwiper]: prop 'long' less than the elements length"
        );
      }
      this.getBoxWidht();
    },
    getBoxWidht() {
      const ele = this.$refs.peSwiper;
      const width = getCss(ele, "width");
      const widthNum = width.includes("px") ? width.split("px")[0] : width;

      this.setItemWidth(widthNum);
    },
    setItemWidth(width) {
      const isComputedForward = this.forward && this.forwardType === "inner";
      const space = this.long - 1 + (isComputedForward ? 2 : 0);

      const itemWidth = Math.floor(
        (width - space * SPACEWIDTH - (isComputedForward ? FORWARD * 2 : 0)) /
          this.long
      );

      this.itemWidth = itemWidth;
      this.initialIndex = this.loop ? 1 : 0;

      this.doms = [];

      if (this.$slots.default && isRealArray(this.$slots.default)) {
        this.$slots.default.forEach((it) => {
          this.doms.push(it.elm);
        });
      } else {
        this.$refs.peSwiperItems.forEach((it) => {
          this.doms.push(it.$el);
        });
      }

      this.setForward(0);

      if (isRealArray(this.doms)) {
        this.auto && this.startLoop();
      }
    },
    startLoop() {
      this.timer = setInterval(() => {
        this.setForward(1);
      }, this.time);
    },
    stopLoop() {
      clearTimeout(this.timer);
    },
    setPosition(index = 0) {
      this.doms.forEach((it, idx) => {
        let left = (this.itemWidth + SPACEWIDTH) * (-index + idx);
        let complement;
        let zIndex = 1;
        if (this.loop) {
          const len = this.doms.length;
          const remainder = index % len;
          complement = (len + remainder + idx) % len;

          left = (this.itemWidth + SPACEWIDTH) * (complement - 1);
          zIndex = complement >= 1 && complement < this.long + 1 ? 2 : -1;
        }

        const isWidth = Boolean(it.style.width);

        const areaStyle = {
          width: this.itemWidth + "px",
          height: this.height,
          lineHeight: this.height,
        };
        const postStyle = {
          left: left + "px",
          zIndex,
        };

        const resultStyle = !isWidth
          ? Object.assign({}, areaStyle, postStyle)
          : postStyle;
        setStyle(it, resultStyle);
      });
    },
  },
};
</script>