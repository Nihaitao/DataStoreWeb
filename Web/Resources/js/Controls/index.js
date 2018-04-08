var demoJson = [
        [
            {
                id: 1,
                name: '数据作战室',
                children: [
                    {
                        cid: 11,
                        name: '招生工作台'
                    },
                    {
                        cid: 12,
                        name: '教务工作台'
                    }
                ]
            },
            {
                id: 2,
                name: '招生统计',
                children: [
                    {
                        cid: 21,
                        name: '客户统计'
                    },
                    {
                        cid: 22,
                        name: '来源统计'
                    },
                    {
                        cid: 23,
                        name: '客户时段统计'
                    },
                    {
                        cid: 24,
                        name: '招生点排行'
                    }
                ]
            },
            {
                id: 3,
                name: '推广统计',
                children: [
                    {
                        cid: 31,
                        name: '推广统计'
                    },
                    {
                        cid: 32,
                        name: '推广账号'
                    },
                    {
                        cid: 33,
                        name: '推广分组'
                    }
                ]
            },
            {
                id: 4,
                name: '地区数据统计',
                children: [
                    {
                        cid: 41,
                        name: '地区招生数据'
                    },
                    {
                        cid: 42,
                        name: '地区服务数据'
                    }
                ]
            }
        ],
        [
            {
                id: 5,
                name: '数据XXX',
                children: [
                    {
                        cid: 51,
                        name: '招生XXX'
                    },
                    {
                        cid: 52,
                        name: '教务XXX'
                    }
                ]
            },
            {
                id: 6,
                name: 'XX统计',
                children: [
                    {
                        cid: 61,
                        name: 'XX统计2'
                    },
                    {
                        cid: 62,
                        name: 'XX统计3'
                    },
                    {
                        cid: 63,
                        name: 'XX统计4'
                    },
                    {
                        cid: 64,
                        name: 'XX排行5'
                    }
                ]
            },
            {
                id: 7,
                name: '推广XX1',
                children: [
                    {
                        cid: 71,
                        name: '推广XX2'
                    },
                    {
                        cid: 72,
                        name: '推广XX3'
                    },
                    {
                        cid: 73,
                        name: '推广XX4'
                    }
                ]
            },
            {
                id: 8,
                name: '地区XX统计',
                children: [
                    {
                        cid: 81,
                        name: '地区XX数据1'
                    },
                    {
                        cid: 82,
                        name: '地区XX数据2'
                    }
                ]
            }
        ]
];

layui.use(['element', 'jquery'], function () {
    var element = layui.element();
    var $ = layui.jquery;

    var activeObj = {
        tabAdd: function () {
            element.tabAdd('demo', {
                title: '新选项'
                , content: '新建选项卡'
                , id: '#tabAdd'
            })
        }
    };

    $('.site-demo-active').on('click', function () {
        var othis = $(this), type = othis.data('type');
        activeObj[type] ? activeObj[type].call(this, othis) : '';
    });
    $('body').css('overflow', 'hidden');
    $('.layui-nav-side').css('top', $('.sidebarList').height() + 'px');
    

    var active = {
        tabAdd: function (strTitle, id) {
            element.tabAdd('demo', {
                title: strTitle,
                content: strTitle,
                id: id
            })
        },
        tabDelete: function (othis) {
            element.tabDelete('demo', 22);
            othis.addClass('layui-btn-disabled');
        },
        tabChange: function (id) {
            element.tabChange('demo', id);
        }
    };

    function sidebarDefault() {
        $('.layui-tab-title li').on('click', function (e) {
            e.preventDefault();
            var strSpan = $(this).find('span').text();
            var sidebarList = $('.layChild dd a');
            for (var i = 0; i < sidebarList.length; i++) {
                if ($(sidebarList[i]).data('id') === $(this).attr('lay-id')) {
                    console.log('yes');
                }
            }
        });
        $('.layui-nav-child a').one('click', function () {
            var num = $(this).data('id');
            var text = '<span data-id="' + num + '">' + $(this).text() + '</span>';
            active.tabAdd(text, num);
        });
        $('.layui-nav-child a').on('click', function () {
            var num = $(this).data('id');
            active.tabChange(num);
        });

    };
    function sidebarToggle() {
        $('.layui-nav-item a.firstBtn').on('click', function (event) {
            event.stopPropagation();
            if (!$(this).parent().hasClass('layui-nav-itemed')) {
                $(this).parent().addClass('layui-nav-itemed');
                //$(this).find('a span').html('&#xe625;');
            } else {
                $(this).parent().removeClass('layui-nav-itemed');
            }
        });
        $('.layui-nav-item dd a').on('click', function (e) {
            e.stopPropagation();
            var brosLi = $(this).parent().parent().parent();
            if (!$(this).parent().hasClass('layui-this')) {
                $(this).parent().addClass('layui-this');
                $(this).parent().siblings().removeClass('layui-this');
                $(brosLi).siblings().find('dd').removeClass('layui-this');
            }
        });

    };
    function mainRightHeight() {
        console.log($('.layTree').height());
        $('.MainRight').css('height', ($('.layTree').height() - 41) + 'px');
    };

    $('.sidebarLi').on('click', function () {
        var html = '';
        var item = demoJson;
        var id = $(this).data('id');
        for (var i = 0; i < item.length; i++) {
            if (id === i) {
                html += '<li>';
                html += '<div class="side-user">';
                html += '<div class="avatar">';
                html += '<img src="http://q3.qlogo.cn/g?b=qq&k=vibGqEefklWXxX1uvspic13A&s=140&t=1448142454" alt="">';
                html += '<span class="level">LV0</span>';
                html += '</div>';
                html += '<div class="info">';
                html += '<span class="userName">某某某</span>';
                html += '</div></div></li>';
                for (var j = 0; j < item[id].length; j++) {
                    if (j === 0) {
                        html += '<li class="layui-nav-item layui-nav-itemed">';
                    } else {
                        html += '<li class="layui-nav-item">';
                    }
                    html += '<a class="firstBtn" href="javascript:;">';
                    html += '<i class="layui-icon">&#xe630;</i>&nbsp;';
                    html += '<cite>' + item[id][j].name + '</cite>';
                    html += '<span class="layui-nav-more"></span>';
                    html += '</a>';
                    html += '<dl class="layui-nav-child layChild">';
                    for (var s = 0; s < item[id][j].children.length; s++) {
                        html += '<dd><a data-id="' + item[id][j].children[s].cid+ '" href="javascript:;">' + item[id][j].children[s].name + '</a></dd>';
                    }
                    html += '</dl>';
                }
                html += '</li>';
            }
        }
        $('.layTree').html(html);
        sidebarToggle();
        sidebarDefault();
    });
    sidebarDefault();
    mainRightHeight();
});