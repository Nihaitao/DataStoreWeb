layui.define(["table"],
    function(exports) {
        var MOD_NAME = 'tableExt';
        var table = layui.table;
        var tableExt = {
            addEvent: function(filter, events) {
                table.on(filter,
                    function(obj) {
                        var _event = events[obj.event];
                        if (typeof (_event) == 'function') {
                            _event.call(obj.data, obj.data, obj);
                        }
                    });
            }

        };
        exports(MOD_NAME, tableExt);
    });