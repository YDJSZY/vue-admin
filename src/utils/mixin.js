/**
 * Created by luwenwei on 18/4/15.
 */
import { findObjectIndexById, findObjectById } from './commonMethods'
import axios from '../config/axiosConfig'
let mixin = {
    data () {
        return {
            dateRangeName: '昨天',
            editType: '',
            loading: true,
            formDialogVisible: false,
            baseUrl: '',
            searchKeyWord: '',
            editingObject: {},
            filters: {
                order: '',
                pageSize: 20
            },
            loadDataParams: {
                begin_time: void 0,
                end_time: void 0,
                totalPage: 1,
                currentPage: 1
            }
        }
    },

    methods: {
        watchFilters () {
            this.$watch('filters', function () {
                this.loadFirstPage()
            }, {
                deep: true
            })
        },

        dateChange (dateRange) {
            this.loadDataParams.begin_time = dateRange.begin_time
            this.loadDataParams.end_time = dateRange.end_time
            if (dateRange.isInitDate) return
            this.loadFirstPage()
        },

        searchData () {
            this.loadDataParams.searchKeyWord = this.searchKeyWord
            this.loadData()
        },

        selectChange (selectModel) {
            this.filters[selectModel] = this[selectModel]
        },

        loadFirstPage () {
            this.loadData({currentPage: 1})
        },

        loadData (param) {
            Object.assign(this.loadDataParams, this.filters, param)
            axios({
                url: this.baseUrl,
                method: 'GET',
                params: this.loadDataParams
            }).then((res) => {
                this.parseResponse(res)
            })
        },

        parseResponse (res) {
            this.tableDataSource = res.data.results
            this.loading = false
        },

        tableAction (actions) {
            let actionName = actions.actionName
            this[actionName](actions)
        },

        tableSort (data) {
            if (!data.prop) return
            data.order === 'ascending' ? this.filters.order = data.prop : this.filters.order = '-' + data.prop
        },

        handleSizeChange (size) {
            this.filters.pageSize = size /* 每页显示几条 */
        },

        handleCurrentChange (currentPage) {
            this.loadData({currentPage}) /* 当前页改变 */
        },

        beforeEdit () {
        },

        editTable (data) {
            this.editType = 'edit'
            this.editingObject = JSON.parse(JSON.stringify(data.row)) /* 深拷贝 */
            this.beforeEdit()
            this.openFormDialog()
        },

        beforeCreateForm () {
        },

        createForm () {
            this.editType = 'create'
            this.editingObject = {}
            this.beforeCreateForm()
            this.openFormDialog()
        },

        openFormDialog () {
            this.formDialogVisible = true
        },

        closeFormDialog () {
            this.formDialogVisible = false
            console.log(this.formDialogVisible)
        },

        formConfirm (formData) {
            this.postFormData(formData)
        },

        postFormData (formData) {
            axios({
                url: this.baseUrl,
                method: 'POST',
                data: formData
            }).then((res) => {
                this.$message.success({message: '操作成功!', duration: 5000})
                this.saveFormCallBack(res)
            }).catch((e) => {
                this.$message.error({message: '操作失败', duration: 5000})
                console.error(e)
            }) /* 提交表单 */
        },

        saveFormCallBack (res) {
            if (this.editType === 'create') {
                this.tableDataSource.splice(0, 0, res.data)
            } else {
                let i = findObjectIndexById(this.tableDataSource, res.data.id)
                this.tableDataSource.splice(i, 1, res.data)
            }
            this.closeFormDialog()
        },

        beforeClose () {
            this.formDialogVisible = false
            console.log(this.formDialogVisible)
        },

        afterClose () {
            console.log('close!!!')
        },

        switchUse (data) {
            let id = data.id
            let enabled = data.enabled
            let obj = {}
            let field = data.field || 'enabled'
            obj[field] = data.enabled
            let url = data.url || this.baseUrl
            axios({
                'url': url + id + '/',
                'method': 'PATCH',
                'data': obj
            }).then((res) => {
                let e = enabled ? '已启用' : '已禁用'
                let tableRowData = findObjectById(this.tableDataSource, id)
                tableRowData[field] = enabled
                this.$message.success({message: e, duration: 5000})
            }).catch((e) => {
                this.$message.error({message: '操作失败', duration: 5000})
                console.error(e)
            })
        }
    },

    watch: {
    },

    created () {
        this.watchFilters()
    }
}

export default mixin
