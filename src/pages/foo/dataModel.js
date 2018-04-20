/**
 * Created by luwenwei on 18/4/15.
 */
let dataModel = [
    {
        field: 'id',
        name: 'ID',
        sort: 'custom',
        render: {
            props: ['scopeData'],
            template: `<div><i class="el-icon-time"></i>{{this.scopeData.row.id}}</div>`
        }
    },
    {
        field: 'name',
        name: '名字',
        edit: true,
        type: 'text',
        rules: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
    },
    {
        field: 'age',
        name: '年龄',
        type: 'number',
        edit: true
    },
    {
        field: 'height',
        name: '身高',
        type: 'text'
    },
    {
        field: 'work',
        name: '是否工作',
        type: 'switch',
        edit: true,
        activeText: '工作中',
        inactiveText: '待业'
    },
    {
        field: 'actionArea',
        name: '活动区域',
        type: 'select',
        edit: true,
        source: 'actionArea'
    },
    {
        field: 'first_date',
        name: '活动开始时间',
        show: false
    },
    {
        field: 'last_date',
        name: '活动结束时间',
        show: false
    },
    {
        field: 'dateRange',
        name: '活动时间',
        type: 'dateRange',
        edit: true,
        firstDate: {
            type: 'date',
            placeholder: '选择开始日期',
            field: 'first_date'
        },
        lastDate: {
            type: 'date',
            placeholder: '选择结束日期',
            field: 'last_date'
        },
        render: {
            props: ['scopeData'],
            template: `<span>{{this.scopeData.row.first_date + ' ~ ' + this.scopeData.row.last_date}}</span>`
        }
    },
    {
        field: 'student',
        name: '学业',
        type: 'radio',
        edit: true,
        source: 'students'
    },
    {
        field: 'workDate',
        name: '参加工作时间',
        type: 'date',
        dateType: 'date',
        edit: true,
        render: {
            props: ['scopeData'],
            template: `<span>{{this.scopeData.row.workDate | date('YYYY-MM-DD')}}</span>`
        }
    },
    {
        field: 'header',
        name: '头像',
        type: 'upload',
        edit: true,
        uploadUrl: 'http://jsonplaceholder.typicode.com/posts/',
        default: [],
        multiple: true
        /*uploadSuccess (ee) {
            console.log(ee)
            return function (f) {
                console.log(f)
            }
        }*/
    },
    {
        field: 'description',
        name: '描述',
        type: 'textarea',
        edit: true
    },
    {
        field: 'action',
        action: {
            props: ['scopeData'],
            template: `<div><el-button type="text" size="small" :class="{'text-primary':!scopeData.row.enabled,'text-warning':scopeData.row.enabled}" @click="switchUse">{{scopeData.row.enabled ? '禁用' : '启用'}}</el-button>
                <el-button type="text" size="small" @click="edit">编辑</el-button></div>`,
            methods: {
                switchUse: function () {
                    this.$emit('action', {actionName: 'switchUse', id: this.scopeData.row.id, enabled: !this.scopeData.row.enabled})
                },
                edit: function () {
                    this.$emit('action', {actionName: 'editTable', row: this.scopeData.row})
                }
            }
        }
    }
]

export default dataModel
