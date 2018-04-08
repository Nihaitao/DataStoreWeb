layui.config({
    base: '/Resources/js/'
}).extend({ //设定模块别名
    tableExt: 'modules/layer/lay/modules/tableExt',
    polyvfbp: 'modules/layer/lay/modules/polyvfbp',
    jquerypolyv: 'modules/layer/lay/modules/jquery.polyv',
    fnr: 'util'
});
var def_require_js_arr_alias = [
    'fnr'
];
var require_js_file = function(arr, func) {
    Array.prototype.push.apply(def_require_js_arr_alias, arr);
    layui.use(def_require_js_arr_alias,
        function() {
            func(layui.fnr);
        });
};