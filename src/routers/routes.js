/**
 * Created by luwenwei on 18/4/14.
 */
const bar = function (resolve) {
    require.ensure(["../pages/bar.vue"],function () {
        resolve(require("../pages/bar.vue"))
    },"bar");
}

const foo = function (resolve) {
    require.ensure(["../pages/foo/foo.vue"],function () {
        resolve(require("../pages/foo/foo.vue"))
    },"foo");
}

const routes = [
    {
        path: '/bar',
        components: {
            default:bar,
        }
    },
    {
        path: '/foo',
        components: {
            default:foo,
        }
    }
]

export default routes