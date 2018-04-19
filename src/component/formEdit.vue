<template>
    <div>
        <el-dialog
                title="提示"
                :visible="dialogVisible"
                width="700px"
                @close="afterClose"
                @open="handleOpen"
                :before-close="beforeClose">
            <el-form :inline="false" :model="ruleForm" :rules="rules" ref="ruleForm" v-if="dialogVisible">
                <template v-for="(model,index) in dataModel" v-if="canEdit(model.edit)">
                    <el-col :span="24" v-if="model.type == 'text'">
                        <el-form-item :label="model.name" label-width="100px" :prop="model.field">
                            <el-input v-model="ruleForm[model.field]" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="model.type == 'dateRange'">
                        <el-form-item :label="model.name" label-width="100px" :prop="model.field">
                            <el-col :span="11">
                                <el-date-picker v-if="model.firstDate.type == 'date'" v-model="ruleForm[model.firstDate.field]" type="date" :placeholder="model.firstDate.placeholder" style="width: 100%;"></el-date-picker>
                                <el-time-picker v-if="model.firstDate.type == 'fixed-time'" v-model="ruleForm[model.firstDate.field]" type="fixed-time" :placeholder="model.firstDate.placeholder" style="width: 100%;"></el-time-picker>
                            </el-col>
                            <el-col class="line" :span="1" style="text-align: center">-</el-col>
                            <el-col :span="11">
                                <el-date-picker v-if="model.lastDate.type == 'date'" v-model="ruleForm[model.lastDate.field]" type="date" :placeholder="model.lastDate.placeholder" style="width: 100%;"></el-date-picker>
                                <el-time-picker v-if="model.lastDate.type == 'fixed-time'" v-model="ruleForm[model.lastDate.field]" type="fixed-time" :placeholder="model.lastDate.placeholder" style="width: 100%;"></el-time-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="model.type == 'number'">
                        <el-form-item :label="model.name" label-width="100px" :prop="model.field">
                            <el-input-number v-model="ruleForm[model.field]" controls-position="right" :min="model.min || 0" :max="model.max || 100"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="model.type == 'select'">
                        <el-form-item :label="model.name" label-width="100px" :prop="model.field">
                            <el-select :placeholder="model.placeholder" v-model="ruleForm[model.field]">
                                <el-option :key="index" v-for="(item,index) in selectSource[model.source]" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="model.type == 'switch'">
                        <el-form-item :label="model.name" label-width="100px" :prop="model.field">
                            <el-switch
                                    v-model="ruleForm[model.field]"
                                    :active-text="model.activeText"
                                    :inactive-text="model.inactiveText">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="model.span || 24" v-if="model.type == 'radio'">
                        <el-form-item :label="model.name" label-width="100px" :prop="model.field">
                            <el-radio-group v-model="ruleForm[model.field]">
                                <el-radio :label="item.label" :key="index" v-for="(item,index) in selectSource[model.source]">{{item.text}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="model.type == 'upload'">
                        <el-form-item :label="model.name" label-width="100px" :prop="model.field">
                            <el-upload
                                    drag
                                    :headers="{'Access-Control-Allow-Origin': '*'}"
                                    :file-list="ruleForm[model.field]"
                                    :list-type="model.fileType || 'picture'"
                                    :action="model.uploadUrl"
                                    :multiple="model.multiple"
                                    :name="model.filename || 'file'"
                                    :on-success="model.uploadSuccess ? model.uploadSuccess(ruleForm,model.field) : uploadSuccess(model.field)"
                            >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">{{model.tip}}</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="confirmAction">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>

</style>
<script>
    export default{
        props:['dataModel','dialogVisible','selectSource','dataSource','editType'],

        data(){
            return{
                rules:{},
                ruleForm:{}
            }
        },

        components:{

        },

        methods:{
            confirmAction () {
                this.$emit('confirmAction',this.ruleForm)
            },

            formCancel () {
                this.$emit('formCancel')
            },

            beforeClose (done) {
                this.$emit('beforeClose',done)
            },

            closeDialog () {
                this.$emit('update:dialogVisible', false)
            },

            afterClose () {
                this.$emit('afterClose')
            },

            canEdit (edit) {
                return typeof edit === "function" ? edit() : edit;
            },

            handleOpen () {
                if(this.editType == 'create') {
                    for(let model of this.dataModel) {
                        if(this.canEdit(model.edit)){
                            this.ruleForm[model.field] = model.default;
                        }
                    }
                }else{
                    this.ruleForm = this.dataSource;
                }
            },

            uploadSuccess (field) { /* 成功上传文件 */
                let modelField = field;
                return (response, file, fileList) => {
                    console.log(file)
                    console.log(fileList)
                }
            },

            saveUploadField () {
                console.log(89)
            }
        },

        created () {
            for(let model of this.dataModel) {
                if(this.canEdit(model.edit)){
                    this.rules[model.field] = model.rules;
                    this.ruleForm[model.field] = model.default;
                }
            }
        },

        mounted () {

        }
    }
</script>
