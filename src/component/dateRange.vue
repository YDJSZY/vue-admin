<template>
    <div style='display:inline-block;vertical-align: middle;'>
        <el-date-picker
                size="small"
                v-model="value"
                type="daterange"
                align="left"
                :unlink-panels="true"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="dateChange"
                :picker-options="pickerOptions">
        </el-date-picker>
    </div>
</template>
<style>

</style>
<script>
    import dateRangeSelect from '../utils/dateRangeSelect'
    export default{
        props: ['defaultDateRange'],
        data(){
            return{
                value: [new Date(), new Date()],
                pickerOptions: {
                    shortcuts: []
                },
                dateRangeText: [
                    '今天',
                    '昨天',
                    '前天',
                    '本周',
                    '上周',
                    '本月份',
                    '上个月',
                    '最近三个月',
                    '最近一年',
                    '本季度',
                    '上个季度',
                    '本年度',
                    '上一年度',
                    '不限'
                ]
            }
        },
        methods: {
            dateChange (isInitDate) {
                if (!this.value) return
                this.$emit('dateChange', {begin_time: +(this.value[0]), end_time: +(this.value[1]), isInitDate: typeof isInitDate === 'boolean' ? true : false})
            }
        },
        created () {
            this.dateRangeText.map((date) => {
                let obj = {}
                obj.text = date
                obj.onClick = function (picker) {
                    let dateRange = dateRangeSelect(date)
                    picker.$emit('pick', [dateRange.begin_time, dateRange.end_time])
                }
                this.pickerOptions.shortcuts.push(obj)
            })
        },
        mounted () {
            if (this.defaultDateRange) {
                let dateRange = dateRangeSelect(this.defaultDateRange)
                this.value = [dateRange.begin_time, dateRange.end_time]
                this.dateChange(true)
            }
        }
    }
</script>
