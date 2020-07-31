// 特殊path需要单独处理可以后期考虑加上if判断...

const pages = require.context('views', false, /\.vue$/).keys();

const routes = pages.map((item) => {
    const name = item.split('./')[1].split('.vue')[0];
    return {
        path: `/${name}`,
        component: () => import(`views/${name}.vue`)
    }
});


export default routes;
