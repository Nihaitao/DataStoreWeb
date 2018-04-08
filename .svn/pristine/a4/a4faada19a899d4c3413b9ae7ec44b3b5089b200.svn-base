
//绑定机构
var listsd = function () {
    var data = {
        search: true,
        fields: { root: "Data", key: 'ID', value: 'Name' },
        options: [],
        remote: { url: "/service/crm/Client/GeTmechanismList", data: {} }
    }
    return data;
}

///绑定学校
var list1 = function (ProvinceID) {
    var data;
    if (ProvinceID > 0) {
        data = {
            search: true,
            fields: { root: "Data", key: 'Account_ID', value: 'Name' },
            options: [],
            remote: { url: "/service/crm/Client/GetRecipientList", data: { ID: ProvinceID } }
        }
    } else {
        data = {
            search: true,
            fields: { key: 'ID', value: 'Name' },
            options: [],
            remote: { url: "", data: {} }
        }
    }
    return data;
}