
///绑定学生来源下拉数据
var SelectSourceBind = function () {
    var data = {
        search: true,
        fields: { key: 'ID', value: 'Description' },
        options: [],
        remote: { url: "/service/public/HDictionary/GetHDictionaryList", data: { Valid: 1, ColumnName: 'Source_ID' } }
    }
    return data;
}

///绑定学历下拉数据
var SelectEducation = function () {
    var data = {
        search: true,
        fields: { key: 'ID', value: 'Description' },
        options: [],
        remote: { url: "/service/public/HDictionary/GetHDictionaryList", data: { Valid: 1, ColumnName: 'Education_ID' } }
    }
    return data;
}
///绑定民族下拉数据
var NationSetting = function () {
    var data = {
        search: true,
        fields: { key: 'ID', value: 'Name' },
        options: [],
        remote: { url: "/service/ProvinceCityDistrict/GetHNationList", data: { } }
    }
    return data;
}
///绑定性别下拉数据
var SelectSex = function () {
    var data = {
        tags: { name: "Sex" },
        options: [
        { key: "1", value: "男" },
        { key: "0", value: "女" }
        ]
    }
    return data;
}


///绑定省份列表数据
var SelectProvinceBind = function () {
    var data = {
        search: true, 
        fields: { key: 'ProvinceID', value: 'ProvinceName' },
        options: [],
        remote: { url: "/service/ProvinceCityDistrict/GetProvinceList", data: {} }
    }
    return data;
}

///绑定城市列表数据
var SelectCityBind = function (ProvinceID) {
    var data;
    if (ProvinceID > 0) {
        data = {
            search: true,
            fields: { key: 'CityID', value: 'CityName' },
            options: [],
            remote: { url: "/service/ProvinceCityDistrict/GetCityList", data: { ProvinceID: ProvinceID } }
        }
    } else {
        data = {
            search: true,
            fields: { key: 'CityID', value: 'CityName' },
            options: [],
            remote: { url: "", data: {} }
        }
    }
    return data;
}
///绑定地区列表数据
var SelectDistrictBind = function (CityID) {
    var data
    if (CityID > 0) {
        data = {
            search: true,
            fields: { key: 'DistrictID', value: 'DistrictName' },
            options: [],
            remote: { url: "/service/ProvinceCityDistrict/GetDistrictList", data: { CityID: CityID } }
        }
    } else {
        data = {
            search: true,
            fields: { key: 'DistrictID', value: 'DistrictName' },
            options: [],
            remote: { url: "", data: {} }
        }
    }
    return data;
}
///参数获取
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function newAjax(options, params) {
    return new Promise(function (resolve, reject) {
        $.ajax(Object.assign({}, options, { successs: resolve, fail: reject }), params)
    })
}



///绑定二级学科
var SelectDisciplineBind = function (CID) {
    var data;
    if (CID != null) {
        data = {
            search: true,
            fields: { root: 'Data', key: 'ID', value: 'Name' },
            options: [],
            remote: { url: "/service/datastore/Discipline/GetDisciplineWithCID", data: { CID: CID } }
        }
    } else {
        data = {
            search: true,
            fields: { key: 'ID', value: 'Name' },
            options: [],
        }
    }
    return data;
}
