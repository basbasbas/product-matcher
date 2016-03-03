module.exports = function(dragDrop, listInput) {

    var global = require('./global.js'),
        conf = require('./list-config.js'),
        templates = require('./list-templates.js'),
        Item = require('./list-item.js');

    var def = {
        // List definitions
        container: '.category-list',
        dragContainer: '.base-category-list',
    }

    var defaultItem = {
        name: 'unknown',
        level: 1,
        count: 0
    }

    var container = $(def.container),
        root = container.find(conf.root).first(),
        closure = {};

    dragDrop.setup({
        fromContainer: def.container,
        toContainer: def.container,
        from: conf.text,
        to: conf.text,
        send: drag,
        receive: drop
    });

    function drag(e) {
        var item = $(this).closest(conf.item),
            data = item.data(),
            string = JSON.stringify(data);

        closure.drag = item;

        e.dataTransfer.setData('data', string);
    }

    function drop(e) {
        e.preventDefault();
        var item = $(this).closest(conf.item),
            name = closure.drag.data('name'),
            siblings = item.siblings(conf.item).addBack().not(closure.drag);

        // Can't drop parent in own child
        if (item.closest(closure.drag).length) {
            console.log('in parent');
            return;
        }

        // Avoid name dupes
        if (hasDuplicateItems(siblings, name)) {
            console.log('name dupe');
            return;
        }

        item.after(closure.drag);

        var itemAndDescendants = closure.drag.find(conf.item).addBack();
        updateLevel(itemAndDescendants);

        delete closure.drag;
    }

    function getLevel(item) {
        var parentItem = item.parents(conf.item).first();

        if (parentItem && parentItem.data('level')) {
           return parseInt(parentItem.data('level')) + 1;
        }

        return 1;
    }

    function updateLevel(item) {
        $.each(item, function(i, item) {
            var item = new Item($(item)),
                level = getLevel(item.el);

            item.el.data('level', level);

            var badge = item.text().find(".badge.level");
                badge.removeClass().addClass('badge level level-' + level);
                badge.text('Lvl ' + level);
        });
    }

    function addRootItem(data) {
        data = _.defaults(data, defaultItem);
        var items = root.find(conf.item).first().siblings().addBack();

        if (hasDuplicateItems(items, data.name)) return;

        var html = templates.bottomNoInput(data);

        root.append(html);
    }

    function hasDuplicateItems(items, name) {
        var names = [];

        $.each(items, function(i, item) {
            var name = $(item).data('name');
            if (name) names.push(name);
        });

        return $.inArray(name, names) !== -1
    }


    function prepAddItem(data) {
        data = _.defaults(data, defaultItem);
        if (data.item) {

            var html = templates.bottomWithInput(data),
                item = new Item(data.item);

            // Already has sub items
            if (item.children().length) {
                item.children().append(html);
            }
            // Create new list group
            else {
                item.el.append(templates.group(html))

                // Assign IDs
                var id = global.helper.UUID();

                item.children().attr('id', id);
                item.text().attr('data-toggle', 'collapse')
                           .attr('data-target', '#' + id);
            }

            item.children().collapse('show');

            var input = item.el.find(conf.input.newChild).first();
                input.focus();
        }
    }

    function addItem(data) {

        if(!data.item) return;

        // Name entry is empty
        if (!data.name) {
            removeItem({ item: data.item });
            return;
        }

        var item = new Item(data.item),
            name = data.name;

        // Name already exists in group
        if (hasDuplicateItems(item.el.siblings(conf.item), name)) {
            var prevName = item.el.data('prev-name');

            // Entry is new
            if (!prevName) {
                removeItem({ item: item.el });
                return;
            }

            // Entry is being updated
            item.label().html(prevName);
            item.el.data('name', prevName);
            item.el.removeAttr('data-prev-name');
        }
        else {
            item.label().html(name);
            item.el.data('name', name);

            var parent = item.el.parents(conf.item).first();
            itemSetParent(parent);
        }
    }

    function itemIsParent(item) {
        if (item.find(conf.item).length) itemSetParent(item);
    }
    function itemIsBottom(item) {
        if (!item.find(conf.item).length) itemSetBottom(item);
    }
    function itemSetParent(item) {
        item.removeClass('bottom');
    }
    function itemSetBottom(item) {
        item.addClass('bottom');
    }

    function removeItem(data) {
        var parent = data.item.parents(conf.item).first();

        data.item.remove();

        if (parent) itemIsBottom(parent);
    }

    function getLabelInput(label) {
        return label.find(conf.input.newChild).first();
    }

    function prepEditItem(data) {
        if (data.item) {
            var item = new Item(data.item);

            item.label().html(templates.subInput());

            var input = getLabelInput(item.label());
            input.attr('value', data.name);
            item.el.data('prev-name', data.name);
            input.focus();
        }
    }

    function sortItem(data) {

    }

    // Subscribers
    var containerID = conf.containerID(def.container);
    var events = {
        addRootItem:    { input: conf.input.new,            func: addRootItem },
        prepAddItem:    { input: conf.input.prepNewChild,   func: prepAddItem },
        addItem:        { input: conf.input.newChild,       func: addItem },
        prepEditItem:   { input: conf.input.prepEdit,       func: prepEditItem },
        removeItem:     { input: conf.input.remove,         func: removeItem },
        sortItem:       { input: conf.input.sort,           func: sortItem }
    }
    $.each(events, function(i, event) {
        $.subscribe(containerID + event.input, function(e, data) { event.func(data) } );
    });

    // Event handling
    listInput.setup({ container: def.container, events: events });

};