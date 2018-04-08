/// <reference path="E:\网校\StuMobile\html/Center/personalInformation.html" />
/// <reference path="E:\网校\StuMobile\html/Center/personalInformation.html" />

var nameEl = document.getElementById('Address');

var first = []; /* 省，直辖市 */
var second = []; /* 市 */
var third = []; /* 镇 */

var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */

var checked = [0, 0, 0]; /* 已选选项 */

var ImageP;
var picker;
function creatList(obj, list) {
    obj.map(function (item, index) {
        var temp = new Object();
        temp.text = item.ProvinceName || item.CityName || item.DistrictName;
        temp.value = item.DistrictID || item.CityID || item.ProvinceID;
        list.push(temp);
    })
}

function getIndex(index, arr) {
    var arr1 = new Array();
    for (var i in arr) {
        arr1.push(arr[i].value)
    }
    return arr1.indexOf(index)
}


//获取省份
function GetProvince() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/service/ProvinceCityDistrict/GetProvinceList',
            success: function (res) {
                resolve(res)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}
//获取城市
function GetCity(ProvinceID) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/service/ProvinceCityDistrict/GetCityList',
            data: { ProvinceID: ProvinceID },
            success: function (res) {
                if (res.SuccessResponse) {
                    resolve(res)
                }
                reject(res)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}
//获取区
function GetDistrict(CityID, cb) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/service/ProvinceCityDistrict/GetDistrictList',
            data: { CityID: CityID },
            success: function (res) {
                if (res.SuccessResponse) {
                    resolve(res)
                }
                reject(res)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}
//获取个人信息
function GetStudentInfo() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/service/edu/Student/GetStudentInfo',
            success: function (res) {
                if (res.SuccessResponse) {
                    resolve(res)
                }
                reject(res)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}

function firstChange(picker, selectedIndex) {
    second = [];
    third = [];
    GetCity(selectedIndex).then(function (res) {
        var city = res.ReturnData.Data
        creatList(city, second);
        picker.refillColumn(1, second);
        GetDistrict(city[0].CityID).then(function (res) {
            var district = res.ReturnData.Data
            creatList(district, third);
            picker.refillColumn(2, third);
        })
    })
}
function secondChange(picker, selectedIndex) {
    third = [];
    GetDistrict(selectedIndex).then(function (res) {
        var district = res.ReturnData.Data
        creatList(district, third);
        picker.refillColumn(2, third);
    })
}



    //****************************************分割线*****************************************
    //学历选择
    function GetEducation(Education) {
        picker2 = $.get("/service/public/HDictionary/GetHDictionaryList", { Valid: 1, ColumnName: 'Education_ID' }, function (res) {
            if (res.SuccessResponse) {
                var Education = [];
                res.Data.map(function (a, b) {
                    Education.push({ text: a.Description ,value:a.ID})
                });
                picker2 = new Picker({
                    data: [Education],
                    title: '选择学历'
                });
                picker2.on('picker.select', function (selectedVal, selectedIndex) {
                    var text1 = Education[selectedIndex[0]].text;
                    $("p[data-name=Education] .txt").attr("data-value", Education[selectedIndex[0]].value)
                    $("p[data-name=Education] .txt").html(text1);
                });
            }

            return picker2;
        })
        return picker2;
    }
    $("p[data-name=Education]").on('click', function () { 
        picker2.show();
    });
    //GetEducation()
    //****************************************分割线*****************************************
    //性别选择
    var Sex = [{ text: '男', value: 1 }, { text: '女', value: 0 }];
    
    picker3 = new Picker({
        data: [Sex],
        title: '性别'
    });
    picker3.on('picker.select', function (selectedVal, selectedIndex) {
        var text1 = Sex[selectedIndex[0]].text;
        $("p[data-name=Sex] .txt").attr("data-value", Sex[selectedIndex[0]].value)
        $("p[data-name=Sex] .txt").html(text1);
    });
    $("p[data-name=Sex]").on('click', function () {
        picker3.show();
    });
//查找学历选择器
    function getPicker(p,N) {
        var index;
        p.map(function (a, b) {
            if (a.value == N) {
                index= b
            }
      })
      return index;
    }

    //****************************************分割线*****************************************
//信息填充
    GetStudentInfo().then(function (res) {

        var NowProvince = res.ReturnData.Data.NowProvince;
        var NowCity = res.ReturnData.Data.NowCity;
        var NowArea = res.ReturnData.Data.NowArea;
        Promise.all([GetProvince(), GetCity(NowProvince), GetDistrict(NowCity)]).then(function (rsp) {
            var province = rsp[0].ReturnData.Data;
            var city = rsp[1].ReturnData.Data;
            var area = rsp[2].ReturnData.Data;
            creatList(province, first);
            creatList(city, second);
            creatList(area, third);
            var index1 = getIndex(NowProvince, first);
            var index2 = getIndex(NowCity, second);
            var index3 = getIndex(NowArea, third);
            var picker = new Picker({
                data: [first, second, third],
                selectedIndex: [index1, index2, index3],
                title: '地址选择'
            });
            nameEl.addEventListener('click', function () {
                picker.show();
            })
            picker.on('picker.change', function (index, selectedIndex) {
                var selectedIndex = selectedIndex + 1;
                if (index === 0) {
                    firstChange(picker, selectedIndex);
                } else if (index === 1) {
                    secondChange(picker, selectedIndex);
                }
            });
            picker.on('picker.select', function (selectedVal, selectedIndex) {
                var text1 = first[selectedIndex[0]].text;
                var text2 = second[selectedIndex[1]].text;
                var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
                checked[0] = first[selectedIndex[0]].value;
                checked[1] = second[selectedIndex[1]].value;
                checked[2] = third[selectedIndex[2]] ? third[selectedIndex[2]].value : '';
                $("p[data-name=adderess] .txt").text(text1 + text2 + text3)
            })

            //基本信息填充内容
            dataOld = res.ReturnData.Data;
            $("main p[data-name]").map(function (a, b) {
                $(b).find(".txt").html(res.ReturnData.Data[$(b).attr("data-name")]);
                $(b).find("input").val(res.ReturnData.Data[$(b).attr("data-name")]);
            });
            $("main p[data-img=HeadImg] img").attr("src", res.ReturnData.Data.HeadImg)
            $("main p[data-name=Sex]>.txt").html(res.ReturnData.Data.Sex == 1 ? "男" : "女")
            $("main p[data-name=adderess]>.txt").html(res.ReturnData.Data.ProvinceName + res.ReturnData.Data.CityName + (res.ReturnData.Data.DistrictName ? res.ReturnData.Data.DistrictName : ""))
            checked[0] = res.ReturnData.Data.NowProvince;
            checked[1] = res.ReturnData.Data.NowCity;
            checked[2] = res.ReturnData.Data.NowArea ? res.ReturnData.Data.NowArea : '';
            $("p[data-name=Sex] .txt").attr("data-value", res.ReturnData.Data.Sex);
            $("p[data-name=Education] .txt").attr("data-value", res.ReturnData.Data.Education_ID);
            $("p[data-name=Education] .txt").html(res.ReturnData.Data.EducationName);
            //设置学历选择器默认

            function setPicker() {
                var promise = new Promise(function (resolve, reject) {

                    //学历选择器创建
                    GetEducation()
                    resolve(picker2);
                })
                return promise;
            }

            setPicker().then(function () {
                picker2.selectedIndex = [getPicker(picker2.data[0], res.ReturnData.Data.Education_ID)];
            }).catch(function (err) { console.log(err) })

        })
    })
//****************************************分割线*****************************************
//头像上传
    var formData = new FormData();
    function selectImage(file) {
        if (!file.files || !file.files[0]) {
            return;
        }
        formData.append("file", file.files[0]);
        uploadImage();
    }
    function uploadImage() {
        $.ajax({
            type: 'POST',
            url: '/service/upload?busType=Student',
            data: formData,
            processData: false,
            contentType: false,
            async: false,
            dataType: 'json',
            success: function (res) {
                if (res.SuccessResponse) {
                    ImageP = res.Message;
                    $("p[data-img=HeadImg] img").attr("src", res.Message);
                } else {
                    layer.open({ content: "上传失败，请重新上传", type: 0, time: 0.5 })
                }
            },
            error: function (err) {
                alert('网络故障');
            }

        });
    }
    //****************************************分割线*****************************************
    //表单提交
    $("button.saveUp.informationSave").on("click", function () {
            var data = dataOld;
            data.HeadImg = ImageP ? ImageP : dataOld.HeadImg;
            data.Name = dataOld.Name;
            data.CardNumber = dataOld.CardNumber;
            data.Phone = dataOld.Phone;
            data.Email = '123456@qq.com';
            data.Phone2 = $("p[data-name=Phone2] input").val();
            data.Remark = dataOld.Remark;
            data.Sex = $("p[data-name=Sex] .txt").attr("data-value"),
            data.NowProvince_ID = checked[0],
            data.NowCity_ID = checked[1],
            data.NowArea_ID = checked[2],
            data.HomeAddress = $("p[data-name=NowAddress] input").val(),
            data.Education_ID = $("p[data-name=Education] .txt").attr("data-value"),
            data.QQ = $("p[data-name=QQ] input").val(),
        
        $.post("/service/edu/Student/EditStudentInfoByStuId", data, function (rsp) {
            if (rsp.SuccessResponse) {
                layer.open({
                    content: rsp.Message, btn: ['确定'], yes: function (index) {
                        layer.close(index);
                        location.href="./personalIndex.html"
                    }
                 });
            } else {
                layer.open({ content: "修改失败", type: 0, time: 0.5 });
            }
        })
    })
   


