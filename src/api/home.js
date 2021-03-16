/**
 * home模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/plugins/axios'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const home = {    
    // // 新闻列表    
    // homeList () {        
    //     return axios.get(`${base.sq}/topics`);  
    // },    
    // // 新闻详情,演示    
    // homeDetail (id, params) {        
    //     return axios.get(`${base.sq}/topic/${id}`, {            
    //         params: params        
    //     });    
    // },
    // // post提交    
    // login (params) {        
    //     return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));    
    // }
    // // 其他接口…………

    login(params) {
        return axios({ method: 'get', url: '/user/login' });
    },
    getUserByToken() {
        return axios({ method: 'get', url: '/user/user-info-by-token' });
    }
}

export default home;