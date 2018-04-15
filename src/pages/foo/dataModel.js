/**
 * Created by luwenwei on 18/4/15.
 */
let dataModel = [
    {
        field:'date',
        name:'日期',
        sort:true
    },
    {
        field:'name',
        name:'名字'
    },
    {
        field:'address',
        name:'地址'
    },
    {
        field:'action',
        action:{
            props:["row","column","index"],
            template:`<div><el-button type="text" size="small" @click="check">查看</el-button>
                <el-button type="text" size="small" @click="edit">编辑</el-button></div>`,
            methods:{
                check: function () {
                    this.$emit('action',{actionName:'check',row:this.row})
                },
                edit: function () {
                    this.$emit('action',{actionName:'editTable',row:this.row})
                }
            }
        }
    }
];

export default dataModel;