import Vue from "vue";
import TlButton from "@/components/TlButton";
import TlInput from "@/components/TlInput";
import TlSelect from "@/components/TlSelect";
import TlMessage from "@/components/TlMessage"; 
import TlPagination from "@/components/TlPagination";
import TlHeader from "@/components/TlHeader";
import TlMainMenu from "@/components/TlMainMenu";
import TlAside from "@/components/TlAside";

// 注册全局组件
Vue.component("TlButton", TlButton);
Vue.component("TlInput", TlInput);
Vue.component("TlSelect", TlSelect);
Vue.component("TlMessage", TlMessage);  
Vue.component("TlPagination", TlPagination);  
Vue.component("TlHeader", TlHeader);  
Vue.component("TlMainMenu", TlMainMenu);  
Vue.component("TlAside", TlAside);  

Vue.mixin({
  data() {
    return {};
  },
  methods: {
    routerTo(router) {
      this.$router.push(router); 
    },
    routerBack() {
      this.$router.back(); 
    },
    c(txt){
      console.log(txt);
    }
  }
});
