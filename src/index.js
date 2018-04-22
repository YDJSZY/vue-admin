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
import axios from './config/axiosConfig'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
    routes
})

router.beforeEach(function (to, from, next) {
    next()
})

let store

let createStore = (myInfo = {}, constant = []) => {
    store = new Vuex.Store({
        state: {
            myInfo,
            constant
        }
    })
}

let createApp = (myInfo, constants) => {
    new Vue({
        store,
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
            Vue.prototype.$myInfo = myInfo
            Vue.prototype.$constants = constants
        },
        mounted: function () {

        }
    }).$mount('#app')
}

(async function () {
    let myInfoRes = await axios.get('/myinfo.json/')
    let myInfo = myInfoRes.data.data
    let constantsRes = await axios.get('/constants.json/')
    let constants = constantsRes.data.data
    createStore(myInfo, constants)
    createApp(myInfo, constants)
}())

if (module.hot) {
    module.hot.accept()
}
