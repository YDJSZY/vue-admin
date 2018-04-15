/**
 * Created by luwenwei on 18/4/14.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import routes from './routers/routes';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/main.css';
import Framework from './component/framework.vue';
import DateRange from './component/dateRange.vue';
import DataTable from './component/dataTable.vue';
Vue.use(ElementUI);
Vue.component('framework', Framework);
Vue.component('dateRange', DateRange);
Vue.component('data-table', DataTable);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
    routes
})

router.beforeEach(function (to, from, next){
    next();
})

const app = new Vue({
    router,
    data:{
    },
    computed:{

    },
    methods:{
        
    },
    beforeCreate: function () {

    },
    created: function() {
       
    },
    mounted:function () {

    }
}).$mount('#app');