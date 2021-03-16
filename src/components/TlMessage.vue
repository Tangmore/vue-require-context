<template>
  <div v-if="show" class="tl-message">
    <div class="center">
      <div v-if="!bHiddenTitle" class="title">
        <span class="text">{{ title }}</span>
        <span class="close el-icon-close" @click="close" />
      </div>
      <div class="content">
        <div v-if="text" class="content-center">
          <span class="text">{{ text }}</span>
        </div>
        <slot></slot>
      </div>
      <div v-if="noButton != 'all'" class="buttons">
        <TlButton
          v-if="noButton != 'confirm'"
          class="button"
          color="blue"
          @click="confirm"
          >{{ $t("确定") }}</TlButton>
        <TlButton
          v-if="noButton != 'cancel'"
          class="button"
          color="gray"
          @click="close"
          >{{ $t("取消") }}</TlButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    //必须使用 sync 例 :show.sync = "isShow"
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "提示"
    },
    text: String,
    // 禁止的按钮 只能选3个值的其中一个 "confirm" "cancel" "all"传入哪个值对应的按钮则不显示
    noButton: String,
    closeAfterConfirm: {
      // 在确认后自动关闭
      type: Boolean,
      default: true
    },
    //隐藏抬头， true时隐藏不显示
    bHiddenTitle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("update:show", false);
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
      // 若未传入closeAfterConfirm，则表示在确认按钮后自动关闭
      if (this.closeAfterConfirm) {
        this.$emit("update:show", false);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tl-message {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3; // 所有的z-index不要设置太高，10以内一般就足够了，
  left: 0;
  top: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  .center {
    box-shadow: 0px 0px 0.375rem 0px rgba(0, 0, 0, 0.3);
    border-radius: 0.25rem;
    min-width: 30rem;
    .title {
      // background: #f8f8f9;
      background: #ffffff;
      height: 2.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      border-bottom: 1px solid rgb(232, 234, 236);
      .text {
        font-size: 0.875rem;
        font-weight: 400;
        color: #000000;
      }
      .close {
        cursor: pointer;
        font-size: 15px;
        color: #999999;
        &:hover {
          color: rgba(255, 117, 84, 1);
        }
      }
    }
    .content {
      width: 100%;
      min-height: 12.5rem;
      background-color: white;
      .content-center {
        width: 100%;
        min-height: 8.4375rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .text {
          font-size: 0.875rem;
          font-weight: 400;
          color: #333333;
        }
      }
    }
    .buttons {
      width: 100%;
      padding-bottom: 1.25rem;
      padding-top: 1.25rem;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      .button {
        margin: {
          left: 1.25rem;
          right: 1.25rem;
        }
      }
    }
  }
}
</style>
