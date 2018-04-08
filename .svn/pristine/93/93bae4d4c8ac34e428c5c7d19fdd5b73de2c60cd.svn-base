layui.define(["table", "fnr", "jquerypolyv"],
    function(exports) {
        var $ = layui.$;
        var fnr = layui.fnr;
        var upload = layui.jquerypolyv;
        var Upload = {
            events: {},
            polyvVideo: {
                userid: "",
                ts: "",
                hash: "",
                luping: "",
                extra: ""
            },
            maxQueueSize: 1,
            secondFormat: function(value) {
                function getTimeFormat(time) {
                    time = parseInt(time);
                    if (time < 10) {
                        return "0" + time;
                    } else {
                        return time.toString();
                    }
                }

                var theTime = parseInt(value); // 秒
                var theTime1 = 0; // 分
                var theTime2 = 0; // 小时
                if (theTime > 60) {
                    theTime1 = parseInt(theTime / 60);
                    theTime = parseInt(theTime % 60);
                    if (theTime1 > 60) {
                        theTime2 = parseInt(theTime1 / 60);
                        theTime1 = parseInt(theTime1 % 60);
                    }
                }
                var result = getTimeFormat(theTime);
                result = (theTime1 > 0 ? getTimeFormat(theTime1) : "00") + ":" + result;
                result = (theTime2 > 0 ? getTimeFormat(theTime2) : "00") + ":" + result;
                return result;
            },
            updateOption: function(opt) {
                fnr.mergeJson(opt, Upload.polyvVideo);
            },
            addEventListener: function(eventName, func) {
                Upload.events[eventName] = func;
            },
            endpoint: location.protocol === "https:"
                ? "https://upload.polyv.net:1081/files/"
                : "http://upload.polyv.net:1080/files/",
            create: function(file) {
                var polyvfbp = {};
                var upload = null;
                polyvfbp.uploadIng = false;
                polyvfbp.stopIng = false;
                polyvfbp.file = file;
                polyvfbp.percentage = 0; //上传进度
                polyvfbp.complete = false; //是否已完成
                polyvfbp.title = file.name; //标题
                polyvfbp.tag = ""; //标签
                polyvfbp.desc = ""; //表述
                polyvfbp.cataid = 1; //类目
                polyvfbp.fileSize = fnr.getSize(file.size);
                polyvfbp.speed = "0 KB";
                polyvfbp.countDown = "00:00:00";
                polyvfbp.showText = "未开始";
                var speedTime;
                polyvfbp.start = function() {
                    var re = /(?:\.([^.]+))?$/,
                        //ext = re.exec(file.name);
                        ext = polyvfbp.file.type.replace(/.+\//, "");
                    var options = {
                        endpoint: Upload.endpoint,
                        resetBefore: false,
                        resetAfter: true,
                        title: polyvfbp.title,
                        tag: polyvfbp.tag,
                        desc: polyvfbp.desc,
                        ext: ext,
                        cataid: polyvfbp.cataid || 1,
                        ts: Upload.polyvVideo.ts,
                        hash: Upload.polyvVideo.hash,
                        userid: Upload.polyvVideo.userid,
                        luping: Upload.polyvVideo.luping,
                        extra: Upload.polyvVideo.extra,
                        urlCallback: function (jQpolyv) {
                            var fun = Upload.events["getVid"];
                            if (typeof fun == 'function') {
                                var url = jQpolyv.fileUrl;
                                var vidReg = new RegExp("^http[s]?://upload\.polyv\.net:[0-9]{4}/files/(.*?)$");
                                if (vidReg.test(url)) {
                                    fun.call(polyvfbp, vidReg.exec(url)[1]);
                                }
                            }
                        }
                    };

                    var starSize = 0,
                        endSize = 0;
                    speedTime = setInterval(function() {
                            if (starSize > 0) {
                                var speed = (endSize - starSize); //计算速度
                                if (speed != 0) {
                                    polyvfbp.speed = fnr.getSize(speed) + "/S"; //转换为显示的速度
                                    polyvfbp.countDown =
                                        Upload.secondFormat((polyvfbp.file.size - endSize) / speed); //剩余时长 =剩余字节数/速度;
                                }
                            }
                            starSize = endSize;
                        },
                        1100);
                    upload = polyv.upload(polyvfbp.file, options)
                        .fail(function(error) {
                            console.log(error);
                        })
                        .progress(function(e, bytesUploaded, bytesTotal) {
                            var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
                            polyvfbp.percentage = percentage;
                            endSize = bytesUploaded;

                        })
                        .done(function(url, file, filedata) {
                            polyvfbp.complete = true;
                            polyvfbp.uploadIng = false;
                            polyvfbp.speed = "-";
                            polyvfbp.countDown = "-";
                            polyvfbp.showText = "已完成";
                            if (speedTime)
                                clearInterval(speedTime);
                            var fun = Upload.events["complete"];
                            if (typeof fun == "function") {
                                fun(polyvfbp);
                            }
                        });

                    polyvfbp.showText = "上传中";
                    //polyvfbp.countDown = "00:00:00";
                    polyvfbp.uploadIng = true;
                    polyvfbp.stopIng = false;
                };
                polyvfbp.pause = function() {
                    if (upload) {
                        upload.stop();
                    }
                    if (speedTime)
                        clearInterval(speedTime);
                    polyvfbp.stopIng = true;
                    polyvfbp.showText = "暂停中";
                    //polyvfbp.countDown = "暂停中";
                    //polyvfbp.speed = "0 KB";
                    polyvfbp.uploadIng = false;
                };
                return polyvfbp;
            }
        };

        exports("polyvfbp", Upload);
    });