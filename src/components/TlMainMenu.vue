 <template> 
  <div class="main-nav">
    <div
      v-for="itemLi in list"
      :key="itemLi.label"
      class="nav-first"
      :class="{ active: itemLi.active }" 
    >
      <span class="li-logo" :class="itemLi.class"></span>
      <span>{{ itemLi.label }}</span>
    </div>
  </div>
</template>

<script> 
export default {
  props: { 
    config: {
      type: Object,
      default: () => {}
    }, 
    moduleName: { type: String, default: "" }
  },
  data() {
    return {
      list: [
        {
          label: "首页",
          router: "/homepage",
          class: "icon_icon_home-page",
          active: true
        },
        {
          label: "数据报表",
          router: "/datareportnew",
          class: "icon_icon_report-form",
          active: false
        }, 
        {
          label: "实时能耗监测",
          router: "/energymonitor",
          class: "icon_icon_regular-checks",
          active: false
        },
        {
          label: "系统管理",
          router: "/systemmanager",
          class: "icon_icon_set",
          active: false
        }
      ],
      menuList: []
    };
  },
  computed: {  
     
  },
  created() {
     
  },
  mounted() {
     
  },
  methods: {
      
  }
};
</script>

<style lang="scss" scoped>
$color-blue: #005bfe;
.main-nav {
  display: flex;
  height: 100%;
  .nav-first {
    width: 5.9375rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    &.active {
      background: #e9efff;
      & > span:last-child {
        font-weight: bold;
      }
    }
    &:hover {
      .nav-second {
        visibility: visible;
      }
    }
    .li-logo {
      font-size: 1.25rem;
      color: $color-blue;
      margin-bottom: 0.625rem;
    }
    .nav-second {
      visibility: hidden;
      position: absolute;
      width: 100px;
      top: 4.5rem;
      left: 0;
      z-index: 10;
      background-color: #ddd;
      .nav-second-li {
        height: 24px;
      }
    }
  }
}
</style>
