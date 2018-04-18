/**
 * Created by luwenwei on 18/4/15.
 */
let throttleTime = function (callback, time = 500) {
    let timer = null
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(function () {
            callback()
            timer = null
        }, time)
    }
}

let findObjectById = function (objectList, id) {
    for (let i = 0; i < objectList.length; ++i) {
        let obj = objectList[i]
        if (obj.id === id) {
            return obj
        }
    }
    return null
}

let findObjectIndexById = function (objectList, id) {
    for (let i = 0; i < objectList.length; ++i) {
        let obj = objectList[i]
        if (obj.id === id) {
            return i
        }
    }
    return null
}

export {
    throttleTime,
    findObjectById,
    findObjectIndexById
}
