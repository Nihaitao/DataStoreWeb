﻿///绑定性别下拉数据
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
            options: []
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
            options: []
        }
    }
    return data;
}
///线索来源
var SelecrSourceBing = function () {
    var data = {
        search: true,
        fields: { key: 'ID', value: 'Description' },
        options: [],
        remote: { url: "/service/public/HDictionary/GetHDictionaryList", data: { Valid: 1, ColumnName: 'Source_ID' } }
    }
    return data;
}
///线索状态
var SelectClueStatusIDBing = function () {
    var data = {
        search: true,
        fields: { key: 'ID', value: 'Description' },
        options: [],
        remote: { url: "/service/public/HDictionary/GetHDictionaryList", data: { Valid: 1, ColumnName: 'ClueStatus_ID' } }
    }
    return data;
}
