import Vue from "vue";
import Router from "vue-router";
import NotFound404 from "@/views/NotFound404.vue";

// 1、要查找的路径 2、是否查找子目录 3、匹配文件正则 
const files = require.context("./views/", true, /router.js$/);
// console.log(files.keys());
// const storagePre = "TL_CONSTRUCTION_";

const routes = []; // 总路由配置 
files.keys().forEach(key => {
  // 路由文件路径，只要有路由文件存在，即生成一个模块
  const routerPath = key.replace(/(\.\/|\/router.js)/g, "");
  const pathArr = routerPath.split("/"); // 路径数组
  const pathArrLen = pathArr.length;
  // 路由所在文件夹名称
  // 当路径数组大于1，则路径中的最后一个即是路由文件所在文件夹
  // 否则路由路径与默认组件同名
  const routerName = pathArrLen > 1 ? pathArr[pathArrLen - 1] : routerPath;
  // 当前模块的路由配置对象
  const route = {
    path: `/${routerPath.toLocaleLowerCase()}`,
    name: routerName,
    component: () => import(`@/views/${routerPath}/${routerName}.vue`) // 自动导入同名组件作为模块组件
  };
  // 将路由文件默认导出的值
  const children = files(key).default;
  // 若有值，则将其作为嵌套子路由，否则不添加children属性
  if (children) {
    route.children = children;
  }
  // 将模块路由信息添加到总路由配置中
  routes.push(route); 
});


Vue.use(Router);
const router = new Router({
  routes: [
    // 在此处设置根路由重定向
    {
      path: "/", 
      redirect: "homePage" 
    },
    ...routes,
    {
      path: "/*",
      name: "404",
      component: NotFound404
    },
    {
      path: "/404",
      name: "404",
      component: NotFound404
    }
  ]  
});
export default router;
 
