<template>
  <div class="tl-button" :class="color" @click="$emit('click')">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    // 4种颜色 blue orange gray yellow
    color: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
.tl-button {
  padding: 0 1.375rem;
  border-radius: 4px;
  min-height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: #ffffff;
  cursor: pointer;
  &.blue {
    background: #005bfe;
    &:hover {
      background: #2a76ff;
    }
    &.disabled {
      background: #6da1fd;
    }
  }

  &.orange {
    background: #fc4835;
    &:hover {
      background: #f36a5b;
    }
    &.disabled {
      background: #fda197;
    }
  }

  &.green {
    background: #12d699;
    &:hover {
      background: #41e0af;
    }
    &.disabled {
      background: #87e4c7;
    }
  }

  &.gray {
    background: #d9d9d9;
    &:hover {
      background: #dddddd;
    }
  }

  &.red {
    background: #fe606c;
    &:hover {
      background: #fe606c;
    }
    &.disabled {
      background: rgba(253, 173, 154, 1);
    }
  }

  &.yellow {
    background: #ffba26;
    &:hover {
      background: #ffc64b;
    }
  }
  &.thinBlue {
    background: #005bfe;
  }
}
</style>
