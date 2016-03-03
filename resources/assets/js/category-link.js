module.exports = function(dragDrop) {

    // Local vendor
    var conf = require('./list-config.js');
    var catConf = require('./category-config.js');

    var json = {};

    $.getJSON(catConf.baseCategories.json, function (data) {
        json = data;
    });

    var def = {
        from: '.base-category-list',
        to: '.category-list',
    }

    function drag(e) {
        var item = $(this).closest(conf.item),
            data = item.data(),
            string = JSON.stringify(data);

        e.dataTransfer.setData('data', string);
    }

    function drop(e) {
        e.preventDefault();
        var string = e.dataTransfer.getData('data'),
            data = JSON.parse(string),
            item = $(this).closest(conf.item),
            arr = item.data('base-categories') || [];

        // No dupes in attr
        if ($.inArray(data.name, arr) === -1) arr.push(data.name);

        // Diff calcs
        var count = getProductCount(arr);
        setCount(item, count);

        item.data('base-categories', arr);
    }

    function setCount(item, count) {
        var badge = item.find('.badge.count').first();

        item.data('count', count);
        badge.text(count);
    }

    function getProductCount(arr) {

        var count = 0,
            bottoms = [],
            parents = [],
            names = [];

        // Assign names
        $.each(arr, function(i, name) {
            var matches = JSON.search(json, '//*[name="' + name + '"]');
            $.each(matches, function(i, match) {
                names.push(match.name);
                if (match.categories.length) parents.push(match);
                else bottoms.push(match);
            });
        });

        $.each(bottoms, function(i, child) {
            count += child.count;
        });
        $.each(parents, function(i, parent) {
            if (parent.categories.length) rec(parent.categories, names);
        });

        return count;

        function rec(categories, names) {
            $.each(categories, function(i, category) {
               if ($.inArray(category.name, names) === -1) {
                   if (category.categories.length) {
                       rec(category.categories, names);
                   }
                   else {
                       count += category.count;
                   }
               }
            });
        }
    }

    dragDrop.setup({
        fromContainer: def.from,
        toContainer: def.to,
        from: conf.text,
        to: conf.text,
        send: drag,
        receive: drop
    });
};