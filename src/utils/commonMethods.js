/**
 * Created by luwenwei on 18/4/15.
 */
let commonMethods = {
    throttleTime: function (callback,time=500) {
        let timer = null;
        return function () {
            if(timer) clearTimeout(timer);
            timer = setTimeout(function() {
                callback();
                timer = null;
            },time)
        }
    }
}

export default commonMethods;