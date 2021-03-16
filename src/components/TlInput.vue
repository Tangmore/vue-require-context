<template>
  <div
    class="tl-input"
    :class="{
      selected: focus,
      radius: radius,
      top: top,
      bottom: bottom,
      'hide-top': hideTop,
      'hide-left': hideLeft,
      'hide-right': hideRight,
      'hide-bottom': hideBottom,
      disabled: disabled
    }"
  >
    <i
      v-if="iconType === 'user' && startIcon"
      class="icon_user user-icon"
    />
    <i
      v-else-if="iconType === 'password' && startIcon"
      class="icon_password password-icon"
    />
    <slot v-else name="start"></slot>
    <input
      v-model="showText"
      :placeholder="placeholder"
      :type="isPassword ? 'password' : 'text'"
      :disabled="disabled"
      @blur="checkInput"
      @input="inputText"
      @focus="inputFocus = true"
      @change="$emit('change', showText)"
      @keyup.enter="$emit('keyupEnter')"
    />
    <i
      v-if="endIcon && (iconType === 'user' || clear) && showText"
      class="icon_delete clear-icon"
      @click="clearText"
    />
    <i
      v-else-if="endIcon && iconType === 'password' && showText"
      class="see-icon"
      :class="{
        'icon_login_display': !isPassword,
        'icon_login_hide': isPassword
      }"
      @click="isPassword = !isPassword"
    />
    <slot v-else name="end"></slot>
  </div>
</template>
<script>
export default {
  model: {
    prop: "textValue",
    event: "inputText"
  },
  props: {
    //是否隐藏上方边框
    hideTop: {
      type: Boolean,
      default: false
    },
    //是否隐藏下方边框
    hideBottom: {
      type: Boolean,
      default: false
    },
    //是否隐藏左边边框
    hideLeft: {
      type: Boolean,
      default: false
    },
    //是否隐藏右边边框
    hideRight: {
      type: Boolean,
      default: false
    },
    //是否为顶部圆角
    top: {
      type: Boolean,
      default: false
    },
    //是否为底部圆角
    bottom: {
      type: Boolean,
      default: false
    },
    //输入框是否有清空按钮
    clear: {
      type: Boolean,
      default: false
    },
    //是否为圆角
    radius: {
      type: Boolean,
      default: true
    },
    //提示
    placeholder: String,
    //是否为密码框
    showPassword: {
      type: Boolean,
      default: false
    },
    //初始的图标预设方案 text user password
    //插槽只有在 text 状态下才会生效
    iconType: {
      type: String,
      default: "text"
    },
    //是否启用预设方案的前图标
    startIcon: {
      type: Boolean,
      default: false
    },
    //是否启用预设方案的前图标
    endIcon: {
      type: Boolean,
      default: true
    },
    //是否开启验证器
    // validator: {
    //   type: Boolean,
    //   default: false
    // },
    //验证器默认规则，在rule字段传入下将不启用此默认规则,返回验证失败字段将是other，若此字段不为空，则返回此字段
    //text 验证是否有特殊字符
    //number 验证长度是否小于11位
    //password 验证密码是否小于6位
    //email 验证是否为邮箱
    //tel 验证是否为正常手机号码
    //url 验证是否是一个正常的网址
    //null 验证是否不为空
    validatorType: {
      type: String,
      default: ""
    },
    //验证规则 正则
    rule: {
      type: String
    },
    //输入参数
    textValue: String,
    // input是否disabled
    disabled: {
      type: Boolean,
      disabled: false
    },
    // 外部可以手动focus
    focus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //inputFocus: false, //输入框是否有焦点
      showText: "", //显示的文字
      isPassword: false //是否是密码框
    };
  },
  computed: {
    //输入框是否有焦点
    inputFocus: {
      get() {
        return this.focus;
      },
      set(value) {
        this.$emit("update:focus", value);
      }
    }
  },
  watch: {
    textValue(val) {
      this.showText = val;
    },
    showText() {
      this.inputText();
      // 此处监听输入值触发验证方法，原先必须失去焦点才能触发
      this.checkInput();
    }
  },
  mounted() {
    this.showText = this.textValue;
    this.isPassword = this.showPassword;
    if (this.iconType === "password") {
      this.isPassword = true;
    }
  },
  methods: {
    inputText() {
      this.$emit("inputText", this.showText);
    },
    clearText() {
      this.showText = "";
      this.$emit("inputText", this.showText);
      this.checkInput();
    },
    checkInput() {
      this.$emit("blur", this.showText);
      this.inputFocus = false;
      //判断是否开启验证器, 当validatorType不为空时开启验证
      if (this.validatorType) {
        //判断是否传入自定义验证规则
        if (this.rule) {
          //如果验证非法
          if (!this.verifyLegitimacy(this.rule)) {
            //如果有自定义类型
            if (this.validatorType) {
              this.$emit("faild", this.validatorType);
            } else {
              this.$emit("faild", "other");
            }
          } else {
            this.$emit("success", this.validatorType);
          }
        } else {
          //此处匹配下方的验证函数
          this["check" + this.toBigCamelCase(this.validatorType)]();
        }
      }
    },
    checkText() {
      // const rule = /^[\u4e00-\u9fa5a-z]+$/gi;
      // if (!this.verifyLegitimacy(rule)) {
      //   console.log(rule, this.validatorType);
      //   this.$emit("faild", this.validatorType);
      // } else {
      //   this.$emit("success", this.validatorType);
      // }
    },
    checkNumber() {
      const rule = /^[0-9]*$/;
      if (!this.verifyLegitimacy(rule)) {
        this.$emit("faild", this.validatorType);
      } else {
        this.$emit("success", this.validatorType);
      }
    },
    checkPassword() {
      const rule = /^.{6,}$/;
      if (!this.verifyLegitimacy(rule)) {
        this.$emit("faild", this.validatorType);
      } else {
        this.$emit("success", this.validatorType);
      }
    },
    checkEmail() {
      const rule = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!this.verifyLegitimacy(rule)) {
        this.$emit("faild", this.validatorType);
      } else {
        this.$emit("success", this.validatorType);
      }
    },
    checkTel() {
      const rule = /^1[3456789]\d{9}$/;
      if (!this.verifyLegitimacy(rule)) {
        this.$emit("faild", this.validatorType);
      } else {
        this.$emit("success", this.validatorType);
      }
    },
    checkUrl() {
      const rule = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~/])+$/;
      if (!this.verifyLegitimacy(rule)) {
        this.$emit("faild", this.validatorType);
      } else {
        this.$emit("success", this.validatorType);
      }
    },
    checkNull() {
      if (!this.showText) {
        this.$emit("faild", this.validatorType);
      } else {
        this.$emit("success", this.validatorType);
      }
    },
    toBigCamelCase(text) {
      text = text[0].toLocaleUpperCase() + text.substring(1, text.length);
      return text;
    },
    //验证是否合法
    verifyLegitimacy(rule) {
      const re = new RegExp(rule);
      if (re.test(this.textValue)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tl-input {
  width: 100%;
  height: 3rem;
  font-size: 0.875rem;
  border: 1px solid rgba(222, 222, 222, 1);
  caret-color: #328cfa;
  outline: none;
  padding: 0.3125rem 0.9375rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .user-icon,
  .password-icon {
    font-size: 1.25rem;
    color: #999999;
  }
  .clear-icon {
    font-size: 1rem;
    color: #dddddd;
    cursor: pointer;
    &:hover {
      color: #bbbbbb;
    }
  }
  .see-icon {
    font-size: 1.25rem;
    color: #cccccc;
    cursor: pointer;
    &:hover {
      color: #bbbbbb;
    }
  }
  input {
    height: 100%;
    flex: 1;
    min-width: 1px;
    outline: none;
    border: none;
    font-size: 1em;
    color: #333333;
    &::-webkit-input-placeholder {
      color: #999999;
    }
    margin-left: 0.625rem;
    margin-right: 0.625rem;
  }
  &.radius {
    border-radius: 0.25rem;
  }
  &.top {
    border-radius: 0.25rem 0.25rem 0 0;
  }
  &.bottom {
    border-radius: 0 0 0.25rem 0.25rem;
  }
  &.hide-top {
    border-top-color: transparent;
  }
  &.hide-left {
    border-left-color: transparent;
  }

  &.hide-right {
    border-right-color: transparent;
  }

  &.hide-bottom {
    border-bottom-color: transparent;
  }

  &.selected {
    border: 1px solid #328cfa;
    box-shadow: 0px 0px 2px 2px #d5e8fc;
  }
  &.disabled {
    background: rgba(250, 250, 250, 1);
    input {
      background: rgba(250, 250, 250, 1);
    }
  }
}
</style>
