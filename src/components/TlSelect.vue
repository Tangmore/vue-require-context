<template>
  <div id="tl-select" class="tl-select" :class="{ disabled: disabled }">
    <div
      class="content"
      :class="{
        selected: inputFocus
      }"
      @click="select"
    >
      <p v-if="title" class="title">{{ title }}</p>

      <!-- 需要placeholder，所以把span换成了input -->
      <input
        v-model="showText"
        type="text"
        :placeholder="placeholder"
        class="show-text"
        disabled
      />
      <span class="icon_arrow2 select-icon" />
    </div>
    <div class="snag">
      <slot></slot>
      <div
        v-if="list && list.length > -1"
        v-show="showDropDownBox"
        id="drop-down-box"
        class="drop-down-box"
      >
        <div
          v-for="item in list"
          :key="item[config.key]"
          class="item"
          @click="selected(item)"
        >
          {{ item[config.value] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 下拉组件，只能下拉选择，不可以输入
export default {
  name: "TlSelect",
  model: {
    prop: "showText",
    event: "select-value"
  },
  props: {
    showText: String, //model中的prop
    list: Array,
    // 配置value和key
    config: {
      type: Object,
      default: () => ({
        key: "key",
        value: "value"
      })
    },
    placeholder: String,
    selKey: null, // 当前所选的键值，在外部传入，此属性是同步更新的，任意类型都可
    //有的选择框前面有标题
    title: {
      type: String,
      default: ""
    },
    // 整个组件不能点击
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputFocus: false,
      showDropDownBox: false
    };
  },
  watch: {
    // 此处模拟input的改变事件
    showText(val) {
      this.$emit("inputText", val);
    }
  },
  beforeMount() {
    window.addEventListener("click", this.EventClick);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.EventClick);
  },
  methods: {
    select() {
      if (this.disabled) {
        return;
      }
      this.showDropDownBox = !this.showDropDownBox;
      this.inputFocus = this.showDropDownBox;
    },
    // 选中后触发事件
    selected(item) {
      const { config } = this;
      this.showDropDownBox = false;
      this.inputFocus = false;
      // this.showText = item[config.value];
      // model中的事件select-value， 相当于update：属性名
      this.$emit("select-value", item[config.value]);
      // 有的需要键值，有的需要相应select事件
      this.$emit("update:selKey", item[config.key]);
      this.$emit("select", item);
      // 为了TlDistrctForm中的@inputText事件
      // this.$emit("inputText", item[config.value]);
    },
    EventClick(event) {
      if (this.showDropDownBox) {
        this.inputFocus = true;
        const outside = event.path.find(item => item.id == "tl-select");
        if (!outside) {
          this.showDropDownBox = false;
          this.inputFocus = false;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
html:not(.mac) {
  .drop-down-box::-webkit-scrollbar {
    width: 0.175rem;
  }
}
.tl-select {
  width: 100%;
  height: 2.25rem;
  // 整个组件都是disabled，所以input也是灰色
  &.disabled {
    background: rgba(247, 247, 247, 1);
    input {
      background: rgba(247, 247, 247, 1) !important;
    }
  }
  .snag {
    position: relative;
    width: 100%;
    height: 0;
    .drop-down-box {
      margin-top: 0.2rem;
      position: absolute;
      max-height: 16.25rem;
      overflow-y: auto;
      width: 100%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 4px 0px rgba(80, 80, 80, 0.3);
      border-radius: 4px;
      z-index: 2999;
      .item {
        height: 2rem;
        line-height: 1;
        color: #333333;
        font-size: 0.75rem;
        padding-left: 0.875rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          background: rgba(0, 171, 255, 0.08);
          color: #00abff;
        }
      }
    }
  }
  .content {
    width: 100%;
    height: 100%;
    font-size: 0.875rem;
    border: 1px solid rgba(229, 229, 229, 1);
    caret-color: #328cfa;
    outline: none;
    padding: 0.3125rem 0.75rem;
    box-sizing: border-box;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    cursor: pointer;
    input:disabled {
      background: #ffffff;
    }
    .show-text {
      flex: 1;
      // 多余文字显示...
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border: none;
    }
    .title {
      font-size: 0.875rem;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .title + .show-text {
      text-align: right;
    }
    .select-icon {
      font-size: 0.625rem;
      color: #666666;
      cursor: pointer;
    }
    border-radius: 0.25rem;
    &.selected {
      border: 1px solid #328cfa;
      box-shadow: 0px 0px 2px 2px #d5e8fc;
    }
  }
}
</style>
