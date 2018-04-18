/**
 * Created by luwenwei on 18/4/15.
 */
import { findObjectIndexById } from './commonMethods';
import axios from '../config/axiosConfig';
let mixin = {
    data () {
        return {
            editType:'',
            loading:true,
            formDialogVisible:false,
            baseUrl:'',
            searchKeyWord:'',
            editingObject:{},
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
        watchFilters () {
            this.$watch('filters', function(){
                this.loadFirstPage();
            }, {
                deep: true
            })
        },

        dateChange (dateRange) {
            this.filters.begin_time = dateRange.begin_time;
            this.filters.end_time = dateRange.end_time;
        },

        searchData () {
            this.loadDataParams.searchKeyWord = this.searchKeyWord;
            this.loadData();
        },

        selectChange (selectModel) {
            this.filters[selectModel] = this[selectModel];
        },

        loadFirstPage () {
            this.loadData({currentPage:1})
        },

        loadData (param) {
            Object.assign(this.loadDataParams,this.filters,param);
            axios({
                url:this.baseUrl,
                method:"GET",
                params:this.loadDataParams
            }).then((res)=>{
                this.tableDataSource = res.data.results;
                this.loading = false;
            })
        },

        tableAction (actions) {
            let actionName = actions.actionName;
            this[actionName](actions)
        },

        tableSort (data) {
            if(!data.prop) return;
            data.order === 'ascending' ? this.filters.order = data.prop : this.filters.order = '-' + data.prop;
        },

        handleSizeChange (size) {/*每页显示几条*/
            this.filters.pageSize = size;
        },

        handleCurrentChange (currentPage) {/*当前页改变*/
            this.loadData({currentPage})
        },

        beforeEdit() {
            
        },

        editTable (data) {
            this.editType = 'edit';
            this.editingObject = JSON.parse(JSON.stringify(data.row));
            this.beforeEdit();
            this.openFormDialog();
        },

        beforeCreateForm() {

        },

        createForm () {
            this.editType = 'create';
            this.editingObject = {};
            this.beforeCreateForm();
            this.openFormDialog();
        },

        openFormDialog () {
            this.formDialogVisible = true;
        },

        closeFormDialog () {
            this.formDialogVisible = false;
        },

        formConfirm (formData) {
            this.postFormData(formData);
        },

        postFormData (formData) {
            axios({
                url:this.baseUrl,
                method:"POST",
                data:formData
            }).then((res)=>{
                this.$message.success({message:'操作成功!',duration:5000});
                this.saveFormCallBack(res);
            }).catch((e)=>{
                this.$message.error({message:'操作失败',duration:5000});
                this.saveFormCallBack({data:formData});
                console.error(e)
            })
        },/*提交表单*/

        saveFormCallBack (res) {
            if(this.editType == 'create') {
                this.tableDataSource.splice(0,0,res.data)
            }else{
                let i = findObjectIndexById(this.tableDataSource,res.data.id);
                this.tableDataSource.splice(i,1,res.data);
            }
            this.closeFormDialog();
        },

        afterClose () {
            console.log('close!!!')
        }
    },

    watch:{
        
    },

    created () {
        this.watchFilters();
    }
}

export default mixin;