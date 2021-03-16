import Vue from "vue"; 

/**
 * v-zcCalcTableHeight ， 专门用来在el-table上根据tableData的行数，动态开启纵向滚动的指令。
 * 主要作用：
 * 1. 避免行数过多导致分页组件会浮在表格上
 * 2. 避免行数不足时，表格内有底部有冗余的空间，
 * 
 * 注：需要组件存在 calcTableHeight 属性（属性名可自定义），同时在el-table表格组件添加：
    v-zcCalcTableHeight
    :height.sync="calcTableHeight"
 *
 * 示例：views/systemManager/dataManagement/components/sectionInformation/SectionInformationTable.vue
 */
Vue.directive("zcCalcTableHeight", {
  componentUpdated(el, binding, vnode) {
    // let calcHeight = null;
    const list = vnode.componentInstance.data;
    const hei = el && el.parentElement.clientHeight - 60; // 可见区域clientHeight - 分页高度60

    const len = Math.floor(hei / 45); // 可容纳的最大行数
    const allLen = list.length; // 目前的内容行数
    // 根据行数设置height的值，若不溢出则设置为 null ，否则设置为 calc(100% - 60px)
    vnode.componentInstance.$emit(
      "update:height",
      allLen > len ? "calc(100% - 60px)" : null
    );
    // 若最后的计算结果时不需要滚动，则手动重置dom上的height
    if (allLen <= len) {
      el.style.cssText = "height:auto";
    }
  }
});
// hsy
// 没有分页的表格,降低与底部的高度,因此重新定义了一个自定义的组件
Vue.directive("zcCalcTableHeightWithoutPaging", {
  componentUpdated(el, binding, vnode) {
    // let calcHeight = null;
    const list = vnode.componentInstance.data;
    const hei = el && el.parentElement.clientHeight - 20; // 可见区域clientHeight - 高度20
    const len = Math.floor(hei / 50); // 可容纳的最大行数
    const allLen = list.length; // 目前的内容行数
    // 根据行数设置height的值，若不溢出则设置为 null ，否则设置为 calc(100% - 40px)
    vnode.componentInstance.$emit(
      "update:height",
      allLen > len ? "calc(100% - 40px)" : null
    );
    // 若最后的计算结果时不需要滚动，则手动重置dom上的height
    if (allLen <= len) {
      el.style.cssText = "height:auto";
    }
  }
});

// 计算多个表格时表格的高度，
// 由于当前表格的父级高度不固定,这个指令是同时修改table的父级高度和当前table的高度
Vue.directive("zcCalcMultiTableHeight", {
  componentUpdated(el, binding, vnode) {
    // let calcHeight = null;
    const list = vnode.componentInstance.data;
    // 获取table的父级的父级many-table-wrapper的高度
    const hei = el && el.parentElement.parentElement.clientHeight - 30; // 可见区域clientHeight - 分页高度60

    const len = Math.floor(hei / 45); // 可容纳的最大行数
    const allLen = list.length; // 目前的内容行数
    // console.log(hei, len, allLen);

    // 条数超过限制了，让table的父级table-wrapper的height达到最大值
    const parent = el.parentElement;
    if (allLen > len) {
      parent.style.height = hei + "px";
    } else {
      // 先重置为自动高度，
      parent.style.height = "auto";
      // OY: 当表格内部不出现滚轮时，其父元素的高度设置为实际高度
      vnode.componentInstance.$nextTick(() => {
        // console.log(el.parentElement.getBoundingClientRect().height);
        parent.style.height = parent.getBoundingClientRect().height + "px";
      });
    }

    // 根据行数设置height的值，若不溢出则设置为 null ，否则设置为 calc(100% - 60px)
    vnode.componentInstance.$emit(
      "update:height",
      allLen > len ? "calc(100% - 70px)" : null
    );

    // 若最后的计算结果时不需要滚动，则手动重置dom上的height
    if (allLen <= len) {
      el.style.cssText = "height:auto";
    }
  }
});

// 前面获取表格数据时，如果表格内容过少不会显示滚动条就手动让他继续获取
Vue.directive("calcTableRequest", {
  componentUpdated(el, binding, vnode) {
    // let calcHeight = null;
    const list = vnode.componentInstance.data;
    //
    let pageHi = 0;
    const hei = el && el.parentElement.clientHeight - pageHi; // 可见区域clientHeight - 分页高度60
    // console.log(hei);

    const len = Math.floor(hei / 45); // 可容纳的最大行数
    const allLen = list.length; // 目前的内容行数
    // 根据行数设置height的值，若不溢出则设置为 null ，否则设置为 calc(100% - 60px)
    vnode.componentInstance.$emit(
      "update:height",
      allLen > len ? `calc(100% - ${pageHi}px)` : null
    );
    // 若最后的计算结果时不需要滚动，则手动重置dom上的height
    if (allLen <= len) {
      el.style.cssText = "height:auto"; 
    }
  } 
});
