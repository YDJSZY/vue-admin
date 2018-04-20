import Vue from 'vue'
import Framework from '../component/framework.vue'
import DateRange from '../component/dateRange.vue'
import DataTable from '../component/dataTable.vue'
import TablePagination from '../component/tablePagination.vue'
import FormEdit from '../component/formEdit.vue'

Vue.component('framework', Framework)
Vue.component('dateRange', DateRange)
Vue.component('data-table', DataTable)
Vue.component('table-pagination', TablePagination)
Vue.component('form-edit', FormEdit)

export default Vue
