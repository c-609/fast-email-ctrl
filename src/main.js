// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import './styles/common.scss'
import '../theme/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
    // Axios.defaults.baseURL = 'http://119.29.101.166:9000'
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        var code = sessionStorage.getItem("code");
        next();
        // if(code==0){
        //   next();
        // }else{
        //   next({ 
        //     path: '/unlogin',
        //     query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
        //   })
        // }    
    } else {
        next();
    }
})