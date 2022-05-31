<template>
  <div
    class="pe-switch"
    :class="{ 'is-checked': active, 'is-disabled': disabled }"
    @click="handleClick"
  >
    <input type="checkbox" :disabled="isDisabled" class="pe-switch__input" />
    <span
      class="pe-switch__label pe-switch__label--left"
      v-if="activeText"
      :class="{ 'is-active': active }"
      >{{ activeText }}</span
    >
    <span class="pe-switch__core"></span>
    <span
      class="pe-switch__label pe-switch__label--right"
      v-if="inactiveText"
      :class="{ 'is-active': !active }"
      >{{ inactiveText }}</span
    >
  </div>
</template>

<script>
export default {
  name: "PeSwitch",
  props: {
    value: {
      default: false,
      type: [Boolean, Number, String],
    },
    isModel: {
      default: true,
      type: [Boolean],
    },
    inSide: {
      default: false,
      type: Boolean,
    },
    activeText: {
      default: "",
      type: String,
    },
    inactiveText: {
      default: "",
      type: String,
    },
    activeValue: {
      default: true,
      type: [Boolean, Number, String],
    },
    inactiveValue: {
      default: false,
      type: [Boolean, Number, String],
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  computed: {
    isDisabled() {
      return this.disabled;
    },
    active() {
      return this.activeValue === this.value;
    },
  },
  methods: {
    handleClick() {
      if (this.isDisabled) {
        return;
      }
      const nextVal =
        this.value === this.activeValue ? this.inactiveValue : this.activeValue;
      if (this.isModel) {
        this.$emit("input", nextVal);
        this.$emit("change", nextVal);
      } else {
        this.$emit("click", nextVal);
      }
    },
  },
};
</script>
