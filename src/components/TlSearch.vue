<template> 
  <el-input
    v-model="serchTip"
    class="zc-search"
    :maxlength="30"
    :placeholder="placeholder"
    @keyup.enter.native="$emit('search')">
    <i slot="prefix" class="start icon_search" :class="color"></i>
  </el-input>
</template>

<script> 
export default {
  name: "SerchComponent",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    // v-model
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入搜索内容"
    },
    // 搜索图标的颜色
    color: {
      type: String,
      default: "gray"
    }
  },
  computed: {
    serchTip: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    search() {
      console.log(12);
    }
  }
};
</script>

<style lang="scss" scoped>
.zc-input {
  width: 10.5rem;
  height: 2.25rem;
  background: #ffffff;
  .start {
    padding-left: 0.625rem;
    font-size: 1.125rem;
    color: #999999;
  }
}

.el-input {
  width: 10.5rem;
  /deep/ {
    .el-input__prefix {
      display: flex;
      align-items: center;
      font-size: 0.8125rem;
      .start {
        padding-left: 0.375rem;
        &.gray {
          color: #999999;
        }
        &.blue {
          color: #005bfe;
        }
      }
    }
    .el-input__inner {
      height: 2.25rem;
      line-height: 2.25rem;
      // padding-left: 2.5625rem;
    }
  }
}

.zc-search /deep/ {
  .el-input__inner {
    // height: 2.25rem;
    // line-height: 2.25rem;
    padding-left: 2rem;
  }
}
</style>
