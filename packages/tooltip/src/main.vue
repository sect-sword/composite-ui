<template>
  <transition name="fade">
    <div v-show="show" class="tooltip-modal">
      <div
        v-for="(item, index) in list"
        :key="'tooltipModal-' + index"
        class="tooltip-modal-content"
      >
        <div
          v-if="item.title"
          class="tooltip-modal-title"
          style="font-size: 14px; color: #fff"
        >
          {{ item.title }}
        </div>
        <div
          v-if="isProperty(item, 'line') && item.line"
          class="modal_content_tips modal_content_tips_after"
        >
          <li>{{ item.line }}</li>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { isProperty } from "main/utils/comment";
export default {
  name: "TooltipModal",
  props: {
    list: {
      default: () => [],
      type: Array,
    },
    show: {
      default: true,
      type: Boolean,
    },
  },
  methods: {
    isProperty,
  },
};
</script>
