import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', (value, format) => {
    let newValue = moment(value).format(format)
    return newValue
})

export default Vue
