///绑定学生来源数据
var SelectSourceBind = function () {
    var that = this;
    layui.use(['laydate', 'layer', 'form', 'layedit', 'element'], function () {
        var $ = layui.jquery;
        var form = layui.form();

        $.get("http://localhost:30400/HDictionary/GetHDictionaryList", { Valid: 1, ColumnName: 'Source_ID' }, function (result) {
            $.each(result.ReturnData.Data, function (i, n) {
                $(that.document).find("#Source_ID").append("<option value=\"" + n.ID + "\">" + n.Description + "</option>")
            })
            form.render('select');
        });
    });
}

///绑定学历列表数据
var SelectEducationBind = function () {
    var that = this;
    layui.use(['laydate', 'layer', 'form', 'layedit', 'element'], function () {
        var $ = layui.jquery;
        var form = layui.form();

        $.get("http://localhost:30400/HDictionary/GetHDictionaryList", { Valid: 1, ColumnName: 'Education_ID' }, function (result) {
            $.each(result.ReturnData.Data, function (i, n) {
                $(that.document).find("#Education_ID").append("<option value=\"" + n.ID + "\">" + n.Description + "</option>")
            })
            form.render('select');
        });

    });
}

///绑定省份列表数据
var SelectProvinceBind = function () {
    var that = this;
    layui.use(['laydate', 'layer', 'form', 'layedit', 'element'], function () {
        var $ = layui.jquery;
        var form = layui.form();
        $.get("http://localhost:30400/ProvinceCityDistrict/GetProvinceList", function (result) {
            $.each(result.ReturnData.Data, function (i, n) {
                $(NowProvince).append("<option value=\"" + n.ProvinceID + "\">" + n.ProvinceName + "</option>")
            })
            form.render('select');
        });
        form.on('select(NowProvince)', function (data) {
            SelectCityBind(data.value);
            SelectDistrictBind(0);
        });
    });
}

///绑定城市列表数据
var SelectCityBind = function (obj) {
    var that = this;
    layui.use(['laydate', 'layer', 'form', 'layedit', 'element'], function () {
        var $ = layui.jquery;
        var form = layui.form();
        NowCity.innerHTML = "<option value=\"\"></option>";
        if (obj > 0) {
            $.get("http://localhost:30400/ProvinceCityDistrict/GetCityList", { ProvinceID: obj }, function (result) {
                $.each(result.ReturnData.Data, function (i, n) {
                    $(NowCity).append("<option value=\"" + n.CityID + "\">" + n.CityName + "</option>")
                })
                form.render('select');
            });
        }
        form.on('select(NowCity)', function (data) {
            SelectDistrictBind(data.value);
        });
    });
}

///绑定地区列表数据
var SelectDistrictBind = function (obj) {
    var that = this;
    layui.use(['laydate', 'layer', 'form', 'layedit', 'element'], function () {
        var $ = layui.jquery;
        var form = layui.form();
        NowArea.innerHTML = "<option value=\"\"></option>";
        if (obj > 0) {
            $.get("http://localhost:30400/ProvinceCityDistrict/GetDistrictList", { CityID: obj }, function (result) {
                $.each(result.ReturnData.Data, function (i, n) {
                    $(NowArea).append("<option value=\"" + n.DistrictID + "\">" + n.DistrictName + "</option>")
                })
                form.render('select');
            });
        }
    });
}

