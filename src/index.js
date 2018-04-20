/**
 * Created by luwenwei on 18/4/14.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from './routers/routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './styles/main.css'
import './utils/globalComponent'
import './utils/globalFilters'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
    routes
})

router.beforeEach(function (to, from, next) {
    next()
})

new Vue({
    router,
    data: {
    },
    computed: {
    },
    methods: {
    },
    beforeCreate: function () {

    },
    created: function () {
    },
    mounted: function () {

    }
}).$mount('#app')
