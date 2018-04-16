/**
 * Created by luwenwei on 18/4/15.
 */
import axios from '../config/axiosConfig';
let mixin = {
    data:function () {
        return {
            loading:true,
            baseUrl:'',
            searchKeyWord:'',
            filters:{
                begin_time:'',
                end_time:'',
                order:'',
                pageSize:20
            },
            loadDataParams:{
                totalPage:100,
                currentPage:1
            }
        }
    },

    methods:{
        watchFilters: function () {
            this.$watch('filters', function(){
                this.loadFirstPage();
            }, {
                deep: true
            })
        },

        dateChange: function(dateRange) {
            this.filters.begin_time = dateRange.begin_time;
            this.filters.end_time = dateRange.end_time;
        },

        searchData: function () {
            this.loadDataParams.searchKeyWord = this.searchKeyWord;
            this.loadData();
        },

        selectChange: function (selectModel) {
            this.filters[selectModel] = this[selectModel];
        },

        loadFirstPage: function () {
            this.loadData({currentPage:1})
        },

        loadData: function (param) {
            Object.assign(this.loadDataParams,this.filters,param);
            axios({
                url:this.baseUrl,
                method:"GET",
                params:this.loadDataParams
            }).then((res)=>{
                this.dataSource = res.data.results;
                this.loading = false;
            })
        },
        
        editTable: function (data) {
            console.log(data)
        },

        tableAction: function (actions) {
            let actionName = actions.actionName;
            this[actionName](actions)
        },

        tableSort: function (data) {
            if(!data.prop) return;
            data.order === 'ascending' ? this.filters.order = data.prop : this.filters.order = '-' + data.prop;
        },

        handleSizeChange: function (size) {/*每页显示几条*/
            this.filters.pageSize = size;
        },

        handleCurrentChange: function (currentPage) {/*当前页改变*/
            this.loadData({currentPage})
        }
    },

    watch:{
        
    },

    created: function () {
        this.watchFilters();
    }
}

export default mixin;