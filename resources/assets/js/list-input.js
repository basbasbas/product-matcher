module.exports = (function() {

    //var global = require('./global.js');
    var conf = require('./list-config.js');

    var events = {
        addRootItem: addRootItem,
        prepAddItem: prepAddItem,
        addItem: addItem,
        prepEditItem: prepEditItem,
        removeItem: removeItem,
        sortItem: sortItem,
        setup: setup
    }

    function prepAddItem(def) {
        $(def.container).off('click', def.input).on('click', def.input, function(e) {
            e.stopPropagation();
            var item = $(this).closest(conf.item),
                level = item.data('level');

            if (item.length) {
                $.publish(def.container.substr(1) + conf.input.prepNewChild, {
                    item: item,
                    level: parseInt(level) + 1
                });
            }
        });
    }

    function addRootItem(def) {
        $(def.container).off('keyup', def.input).on('keyup', def.input, function(e) {
            var el = $(this),
                val = el.val();

            if (e.keyCode == 13 && val) {
                $.publish(def.container.substr(1) + conf.input.new, {
                    name: val,
                    level: 1
                });

                el.val('');
            }
        });
    }

    function addItem(def) {
        $(def.container).off('blur keyup', def.input).on('blur keyup', def.input, function(e) {
            $.publish('hello');
            if (e.type != 'keyup' || e.keyCode == 13) {
                var item = $(this).closest(conf.item);

                if (item.length) {
                    $.publish(def.container.substr(1) + conf.input.newChild, {
                        name: $(this).val(),
                        item: item
                    });
                }
            }
        });
    }

    function prepEditItem(def) {
        $(def.container).off('click', def.input).on('click', def.input, function(e) {
            e.stopPropagation();

            if ($(this).children(conf.newChild).length) return;

            var item = $(this).closest(conf.item);

            $.publish(def.container.substr(1) + conf.input.prepEdit, {
                name: item.data('name'),
                item: item
            });
        });
    }

    function removeItem(def) {
        $(def.container).off('click', def.input).on('click', def.input, function(e) {
            e.stopPropagation();
            var item = $(this).closest(conf.item);

            $.publish(def.container.substr(1) + conf.input.remove, {
                item: item
            });
        });
    }

    function sortItem(def) {

    }

    function setup(def) {
        $.each(def.events, function(key, event) {
            events[key]({ container: def.container, input: event.input });
        });
    }

    return events;

}());