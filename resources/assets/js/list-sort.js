module.exports = function(sort, sortInput) {

    var def = {
        // List definitions
        container: '.base-category-list',
        listSub: '.categories',
        listItem: '.list-item',
    }

    var list = $(def.container),

        // Callbacks by data-sort attribute
        // ----
        // Callback     -   function to apply
        // Data         -   attribute name to use
        // Reverse      -   sort order
        callbacks = {
            'products-most': {
                'callback': sort.numeric,
                'data': 'count',
                'reverse': false
            },
            'products-least': {
                'callback': sort.numeric,
                'data': 'count',
                'reverse': true
            },
            'name-descending': {
                'callback': sort.alphabetically,
                'data': 'name',
                'reverse': false
            },
            'name-ascending': {
                'callback': sort.alphabetically,
                'data': 'name',
                'reverse': true
            }
        }

    // Listen for UI input
    sortInput.listEvent(list, eventCallback);

    function eventCallback(method) {
        sortByCallback(callbacks[method]);
    }

    function sortByCallback(data) {
        var attr = 'data-' + data.data,
            callback = data.callback(attr, data.reverse);

        sortBy(callback);
    }

    function sortBy(callback) {
        var groups = list.find(def.listSub);

        $.each(groups, function (i, el) {
            $(el).children(def.listItem).sort(callback).appendTo($(el));
        });
    }

    return {
    }
};