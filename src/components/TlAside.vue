<template>
  <div class="tl-aside">
    <!-- <tlNavMenuSlot
      :list="menuList"
      :config="{ label: 'label', children: 'children' }"
      :default-expand-all="true"
    >
      <template v-slot="{ scope: { data } }">
        <tlNavMenuSlotItem @click="handleNodeClick(data)">
          <tlImg slot="logo" class="default-item-logo" :src="data.logoUrl" />
          <div
            slot="content"
            :class="['default-item-text' + data.deep]"
            :title="data.label"
          >
            {{ data.label }}
          </div>
        </tlNavMenuSlotItem>
      </template>
    </tlNavMenuSlot> -->
  </div>
</template>

<script>
// import tlNavMenuSlot from "@/components/tlNavMenuSlot";
// import tlNavMenuSlotItem from "@/components/tlNavMenuSlotItem";
// import tlImg from "@/components/tlImg";

export default {
  name: "UserCenter",
//   components: { tlNavMenuSlot, tlNavMenuSlotItem, tlImg },
//   props: { moduleName: String },
  data() {
    return {
      menuList: [
        {
          label: "用户中心",
          router: "usercenter",
          children: [
            {
              label: "用户管理",
              router: "usermanagement"
            },
            {
              label: "组织机构管理",
              router: "orgmanagement"
            },
            {
              label: "菜单资源管理",
              router: "menuresmanagement"
            },
            {
              label: "角色管理",
              router: "rolemanagement"
            }
          ]
        },
        {
          label: "数据关联管理",
          router: "dataassociationmanagement",
          children: [
            {
              label: "用户角色关联",
              router: "userroleassociation"
            },
            {
              label: "用户组织机构关联",
              router: "userorgassociation"
            },
            {
              label: "角色菜单关联",
              router: "rolemenuassociation"
            },
            {
              label: "test",
              router: "test"
            }
          ]
        },
        {
          label: "项目数据管理",
          router: "dataManagement",
          children: [
            {
              label: "结构物信息",
              router: "structureinformation"
            },
            {
              label: "施工项目信息",
              router: "constructionprojectInformation"
            },
            {
              label: "基础枚举",
              router: "baseenumeration"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    // // 当前路由中的二级路由，即外部传入的submenus中的路由中的一个
    // crtSubMenuRouter() {
    //   let subpath = this.$route.path.replace(`/${this.routePrefix}`, ""); // 将一级路由前缀去掉后的路由
    //   // 若还有路径，则说明存在二级路由
    //   if (subpath) {
    //     // 防止后面还有其他路由，例如RESTful风格： /routePrefix/submenu/:id 这样的路径
    //     subpath = subpath.split("/")[1];
    //   }
    //   // console.log(subpath);
    //   return subpath;
    // }
  },
  routePrefix() {
    // return this.moduleName.toLowerCase();
  },
  methods: {
    // handleNodeClick(data) {
    //   console.log(data);
    //   let { router, deep, children } = data;
    //   if (deep === 1) {
    //     this.$router.push({
    //       path: `/${router}/${children[0].router}`
    //     });
    //   } else {
    //     let find = this.menuList.find(item => {
    //       if (this.findRouter(item, router)) {
    //         return item;
    //       }
    //     });

    //     this.$router.push({
    //       path: `/${find.router}/${router}`
    //     });
    //   }
    // },
    // // 从子节点到根节点查找
    // findRouter(parent, router) {
    //   let findItem = parent.children.find(item => {
    //     return item.router === router;
    //   });
    //   if (findItem) {
    //     return findItem.router;
    //   } else {
    //     return null;
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .tl-aside {
    width: 20%;
    height: 100%; 
  }
}
</style>
