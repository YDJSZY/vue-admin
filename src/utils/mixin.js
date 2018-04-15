/**
 * Created by luwenwei on 18/4/15.
 */
import commonMethods from './commonMethods';
let mixin = {
    data:function () {
        return {
            searchKeyWord:'',
            filters:{
                begin_time:'',
                end_time:'',
            },
            loadDataParams:{

            }
        }
    },

    methods:{
        watchFilters: function () {
            this.$watch('filters', function(){
                this.loadData();
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

        loadData: function () {
            let params = Object.assign({},this.loadDataParams,this.filters);
            console.log(params)
        },
        
        editTable: function (data) {
            console.log(data)
        }
    },

    watch:{
        
    },

    created: function () {
        this.watchFilters();
    }
}

export default mixin;