/**
 * Created by luwenwei on 18/4/15.
 */
let _dateRangeSelect = function () {
    function firstSecond (date, fromSelect, minView) {
        if (!date) {
            return ''
        }
        let d = new Date(date)
        if (!fromSelect) {
            if (minView !== '0') {
                d.setHours(0)
                d.setMinutes(0)
                d.setSeconds(0)
                d.setMilliseconds(0)
            }
            return d
        }
        d.setHours(0)
        d.setMinutes(0)
        d.setSeconds(0)
        d.setMilliseconds(0)
        return d
    }

    function lastSecond (date, fromSelect, minView) {
        if (!date) {
            return ''
        }
        let d = new Date(date)
        if (!fromSelect) {
            if (minView !== '0') {
                d.setHours(23)
                d.setMinutes(59)
                d.setSeconds(59)
                d.setMilliseconds(999)
            }
            return d
        }
        d.setHours(23)
        d.setMinutes(59)
        d.setSeconds(59)
        d.setMilliseconds(999)
        return d
    }

    function dateNameToRange (name) {
        let t
        let now = new Date()
        let begin, end
        let yang = new MrYangUtil() // 返回当前时间
        switch (name) {
        case '今天':
            begin = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // 年月日
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // 年月日
            break
        case '自定义':
            begin = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // 年月日
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // 年月日
            break
        case '昨天':
            t = yang.getYesterday()
            begin = t
            end = t
            break
        case '前天':
            t = yang.getTwoDaysAgo()
            begin = t
            end = t
            break
        case '本周':
            t = yang.getCurrentWeek()
            begin = t[0]
            end = t[1]
            break
        case '上周':
            t = yang.getPreviousWeek()
            begin = t[0]
            end = t[1]
            break
        case '本月份':
            t = yang.getCurrentMonth()
            begin = t[0]
            end = t[1]
            break
        case '上个月':
            t = yang.getPreviousMonth()
            begin = t[0]
            end = t[1]
            break
        case '最近三个月':
            t = yang.getLastThreeMonths()
            begin = t[0]
            end = t[1]
            break
        case '最近一年':
            t = yang.getLastYear()
            begin = t[0]
            end = t[1]
            break
        case '本季度':
            t = yang.getCurrentSeason()
            begin = t[0]
            end = t[1]
            break
        case '上个季度':
            t = yang.getPreviousSeason()
            begin = t[0]
            end = t[1]
            break
        case '本年度':
            t = yang.getCurrentYear()
            begin = t[0]
            end = t[1]
            break
        case '上一年度':
            t = yang.getPreviousYear()
            begin = t[0]
            end = t[1]
            break
        case '不限':
            begin = ''
            end = ''
            break
        default:
            begin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
            break
        }
        begin = firstSecond(begin, true)
        end = lastSecond(end, true)
        return [ begin, end ]
    }

    function MrYangUtil () {
        this.getCurrentDate = function () {
            return new Date()
        } // 返回当前时间

        this.getCurrentWeek = function () {
            let currentDate = this.getCurrentDate()
            let week = currentDate.getDay()

            let millisecond = 1000 * 60 * 60 * 24 // 一天的毫秒树
            let minusDay = week !== 0 ? week - 1 : 6
            let monday = new Date(currentDate.getTime() - (minusDay * millisecond))
            let sunday = new Date(monday.getTime() + (6 * millisecond))
            return [ monday, sunday ]
        }

        this.getCurrentMonth = function () {
            let currentDate = this.getCurrentDate()
            let currentMonth = currentDate.getMonth()
            let currentYear = currentDate.getFullYear()
            let firstDay = new Date(currentYear, currentMonth, 1)

            if (currentMonth === 11) {
                currentYear++
                currentMonth = 0
            } else {
                currentMonth++
            }

            let millisecond = 1000 * 60 * 60 * 24
            let nextMonthDayOne = new Date(currentYear, currentMonth, 1)
            let lastDay = new Date(nextMonthDayOne.getTime() - millisecond)

            return [ firstDay, lastDay ]
        }

        this.getQuarterSeasonStartMonth = function (month) {
            let spring = 0
            let summer = 3
            let fall = 6
            let winter = 9

            if (month < 3) {
                return spring
            } else if (month < 6) {
                return summer
            } else if (month < 9) {
                return fall
            } else {
                return winter
            }
        }

        this.getMonthDays = function (year, month) {
            let relativeDate = new Date(year, month, 1)
            let relativeMonth = relativeDate.getMonth()
            let relativeYear = relativeDate.getFullYear()

            if (relativeMonth === 11) {
                relativeYear++
                relativeMonth = 0
            } else {
                relativeMonth++
            }
            let millisecond = 1000 * 60 * 60 * 24
            let nextMonthDayOne = new Date(relativeYear, relativeMonth, 1)
            return new Date(nextMonthDayOne.getTime() - millisecond).getDate()
        }

        this.getCurrentSeason = function () {
            let currentDate = this.getCurrentDate()
            let currentMonth = currentDate.getMonth()
            let currentYear = currentDate.getFullYear()
            let quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth)
            let quarterSeasonEndMonth = quarterSeasonStartMonth + 2
            let quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1)
            let quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth))
            return [ quarterSeasonStartDate, quarterSeasonEndDate ]
        }

        this.getCurrentYear = function () {
            let currentDate = this.getCurrentDate()
            let currentYear = currentDate.getFullYear()

            let currentYearFirstDate = new Date(currentYear, 0, 1)
            let currentYearLastDate = new Date(currentYear, 11, 31)
            return [ currentYearFirstDate, currentYearLastDate ]
        }

        this.getPriorMonthFirstDay = function (year, month) {
            if (month === 0) {
                month = 11
                year--
                return new Date(year, month, 1)
            }
            month--
            return new Date(year, month, 1)
        }

        this.getPreviousMonth = function () {
            let currentDate = this.getCurrentDate()
            let currentMonth = currentDate.getMonth()
            let currentYear = currentDate.getFullYear()
            let priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth)
            let priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()))
            return [ priorMonthFirstDay, priorMonthLastDay ]
        }

        this.getPreviousWeek = function () {
            let currentDate = this.getCurrentDate()
            let week = currentDate.getDay()
            let millisecond = 1000 * 60 * 60 * 24
            let minusDay = week !== 0 ? week - 1 : 6
            let currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay))
            let priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond)
            let priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6))
            return [ priorWeekFirstDay, priorWeekLastDay ]
        }

        this.getPriorSeasonFirstDay = function (year, month) {
            let spring = 0
            let summer = 3
            let fall = 6
            let winter = 9
            if (month < 3) {
                --year
                month = winter
            } else if (month < 6) {
                month = spring
            } else if (month < 9) {
                month = summer
            } else {
                month = fall
            }
            return new Date(year, month, 1)
        }

        this.getPreviousSeason = function () {
            let currentDate = this.getCurrentDate()
            let currentMonth = currentDate.getMonth()
            let currentYear = currentDate.getFullYear()
            let priorSeasonFirstDay = this.getPriorSeasonFirstDay(currentYear, currentMonth)
            let priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, this.getMonthDays(priorSeasonFirstDay.getFullYear(),
                priorSeasonFirstDay.getMonth() + 2))
            return [ priorSeasonFirstDay, priorSeasonLastDay ]
        }

        this.getPreviousYear = function () {
            let currentDate = this.getCurrentDate()
            let currentYear = currentDate.getFullYear() - 1
            let priorYearFirstDay = new Date(currentYear, 0, 1)
            let priorYearLastDay = new Date(currentYear, 11, 31)
            return [ priorYearFirstDay, priorYearLastDay ]
        }

        this.getYesterday = function () {
            let currentDate = this.getCurrentDate()
            let yesterday = new Date(currentDate.getTime() - 1000 * 60 * 60 * 24)
            return yesterday
        }

        this.getTwoDaysAgo = function () {
            let today = new Date()
            let twoDaysAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 2)
            return twoDaysAgo
        }

        this.getLastThreeMonths = function () {
            let today = new Date()
            let ninetyDaysAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 90)
            let theFirstDay = new Date(ninetyDaysAgo.getFullYear(), ninetyDaysAgo.getMonth(), 1)
            return [theFirstDay, today]
        }

        this.getLastYear = function () {
            let today = new Date()
            let aYearAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 365)
            let theFirstDay = new Date(aYearAgo.getFullYear(), aYearAgo.getMonth(), 1)
            return [theFirstDay, today]
        }
    }

    function dateRangeSelect (dateRangeName) {
        let t = dateNameToRange(dateRangeName)
        let currentDateRange = {begin_time: t[0], end_time: t[1], dateRangeName: dateRangeName}
        return currentDateRange
    }

    return dateRangeSelect
}

export default _dateRangeSelect()
