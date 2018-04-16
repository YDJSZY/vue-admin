/**
 * Created by luwenwei on 18/4/15.
 */
let dataModel = [
    {
        field:'id',
        name:'ID',
        sort:'custom',
        render:{
            props:["scopeData"],
            template:`<div><i class="el-icon-time"></i>{{this.scopeData.row.id}}</div>`
        }
    },
    {
        field:'name',
        name:'名字'
    },
    {
        field:'age',
        name:'年龄'
    },
    {
        field:'height',
        name:'身高'
    },
    {
        field:'action',
        action:{
            props:["scopeData"],
            template:`<div><el-button type="text" size="small" @click="check">查看</el-button>
                <el-button type="text" size="small" @click="edit">编辑</el-button></div>`,
            methods:{
                check: function () {
                    this.$emit('action',{actionName:'check',row:this.scopeData.row})
                },
                edit: function () {
                    this.$emit('action',{actionName:'editTable',row:this.scopeData.row})
                }
            }
        }
    }
];

export default dataModel;