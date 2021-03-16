<template>
  <div class="zc-container">
      <TlHeader moduleName="DataWrite" />
      <TlAside moduleName="DataWrite" />
      <div class="zc-main">
        <!-- <router-view /> -->
        homePage.vue
      </div>
  </div>
</template>

<script>
import {L2Dwidget} from 'live2d-widget'
export default {
  created(){
    // this.onLoad();
    this.c(11111)
     setTimeout(function () {
        L2Dwidget.init({
            // model: {jsonPath: 'static/live2d-widget-model-tororo/assets/tororo.model.json',},
            model: {jsonPath: 'static/live2d-widget-model-hijiki/assets/hijiki.model.json',},
            display: { position: 'right', width: 150, height: 330 },
            mobile: { show: true }
        });
    },1000);
  },
  methods:{
      onLoad() {      
        this.$api.home.homeList({       
            api: 123      
        }).then(res=> {
            // 执行某些操作       
        })    
    },  
  }
}
</script>

<style lang="scss" scoped>
    div{
        color: #000;
    }
</style> 