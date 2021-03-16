<template>
  <el-pagination
    :current-page="currentPage"
    :page-sizes="[10, 20]"
    :page-size="pageSize"
    layout="slot, pager, sizes, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
    <div class="first-page" @click="toHome">首页</div>
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    //回到第一页
    toHome() {
      this.$emit("current-change", 1);
    },
    // 切换每页多少条的事件
    handleSizeChange(size) {
      this.$emit("size-change", size);
    },
    // 切换当前页
    handleCurrentChange(page) {
      this.$emit("current-change", page);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-top: 0.5rem;
  .first-page {
    width: 2.8125rem;
    height: 2.125rem;
    font-size: 0.75rem;
    font-weight: 400;
    color: #666666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(229, 229, 229, 1);
    border-radius: 4px 0 0 4px;
    border-right: 1px solid transparent;
    &:hover {
      border: 1px solid #328cfa;
    }
  }
  /deep/ {
    // .el-select .el-input {
    //   width: 5rem;
    // }
    // 重置分页选页器样式
    .el-pager {
      border: 1px solid rgba(229, 229, 229, 1);

      li {
        width: 2.125rem;
        height: 2.125rem;
        line-height: 2.125rem;
        min-width: 1px;
        font-size: 0.75rem;
        padding: 0;
        color: #666666;
        font-weight: 400;
        & + li {
          border-left: 1px solid rgba(229, 229, 229, 1);
        }
      }

      li.active {
        position: relative;
        color: #666666;
        &::before {
          position: absolute;
          top: -1px;
          left: -1px;
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          border: 1px solid #328cfa;
          z-index: 2;
        }
      }
    }

    // 修复分页-选页器的居中问题
    .el-pagination__sizes {
      height: auto;
      .el-input__inner {
        height: 34px;
        box-sizing: border-box;
        border-radius: 0 3px 3px 0;
      }
    }
    .el-pagination__jump {
      height: 34px;
      .el-input__inner {
        height: 34px;
      }
    }
  }
}
/deep/.el-select-dropdown.el-popper {
  height: 5.5rem;
}
</style>
