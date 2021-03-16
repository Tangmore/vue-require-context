<template>
  <div class="tl-header">
    <p class="header-logo">
      <i class="icon_icon_logo logo"></i>
      <span class="logo-name">统计分析系统demo</span> 
    </p>
    <div class="nav-and-manager">
      <TlMainMenu :moduleName="moduleName" /> 
      <div class="manager-p">
        <span class="manager-pic icon_icon_user2">
          <i v-if="noticeNumber">3 | 三 </i>
        </span>
        <el-dropdown trigger="click" @command="handCommandPerson">
          <span class="el-dropdown-link">
            admin <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in baseList"
              :key="item.name"
              :command="item.event">
              <i
                class="item-icon"
                :class="[
                  item.icon,
                  showNotice && item.name == '通知' ? 'showNoticeClass' : ''
                ]"
              ></i>
              {{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import TlMainMenu from "@/components/TlMainMenu"; 
import { mapState } from "vuex";
export default {
  name: "TlHeader",
  components: { TlMainMenu }, 
  props: { moduleName: { type: String, default: "" } }, 
  data() {
    const baseList = [
      {
        icon: "icon_icon_personal",
        name: "个人信息",
        event: () => {
        //   const { userId, routerTo } = this;
        //   routerTo({
        //     path: "/userinfo/userdetail",
        //     query: { userId }
        //   });
        }
      },
      {
        icon: "icon_icon_message",
        name: "填报通知",
        event: () => {
          
        }
      },
      {
        icon: "icon_icon_logout",
        name: "退出登录",
        event: () => {
          this.logout();
        }
      }
    ];
    return {
      baseList,
      panelList: [],
      noticeNumber:0
    };
  },
  computed: { 
    // 通过通知数量判断是否显示菜单“填报通知”上的小圆点
    showNotice() {
    //   return !!this.noticeNumber;
    }
  },
  watch: {
    isAdmin() {
      this.setShowPersonal();
    }
  },
  created() {
    this.setShowPersonal();
  },
  methods: { 
    // 如果是admin暂时取消个人信息菜单
    setShowPersonal() {
    //   this.panelList = [...this.baseList];
    //   if (["true", true].includes(this.isAdmin)) {
    //     this.panelList.shift();
    //   }
    },
    // 执行个人事件，查看信息/修改密码/退出登录
    handCommandPerson(command) {
      command();
    },
    // 退出登录
    async logout() {
      this.routerTo("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
$color-blue: #005bfe;
.tl-header {
  z-index: 100;
  height: 4.5rem;
  display: flex;
  box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.05);
  .header-logo {
    height: 100%;
    display: flex;
    align-items: center;
    .logo {
      font-size: 1.8125rem;
      color: $color-blue;
      margin: 0 0.625rem 0 1.25rem;
    }
    .logo-name {
      font-size: 1.25rem;
      font-weight: bold;
      color: $color-blue;
    }
    .logo-section {
      font-size: 1rem;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-left: 0.375rem;
    }
  }
  .nav-and-manager {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    .manager-p {
      display: flex;
      align-items: center;
      margin-left: 2.5rem;
      margin-right: 1.25rem;
      .manager-pic {
        display: inline-block;
        width: 32px;
        text-align: center;
        height: 32px;
        line-height: 32px;
        background: rgba(0, 91, 254, 1);
        border-radius: 50%;
        margin-right: 0.625rem;
        font-size: 1.25rem;
        color: rgba(255, 255, 255, 1);
        position: relative;
        i {
          position: absolute;
          right: -5px;
          top: -6px;
          width: 16px;
          height: 16px;
          background: rgba(252, 72, 53, 1);
          border-radius: 50%;
          display: inline-block;
          text-align: center;
          line-height: 16px;
          font-style: normal;

          font-size: 10px;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}

/deep/ .item-icon.showNoticeClass {
  &::after {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    background: rgba(255, 117, 84, 1);
    border-radius: 50%;
    position: relative;
    right: 3px;
    top: -10px;
  }
}
</style>
