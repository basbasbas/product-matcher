module.exports = function(sort) {

    var list = $('.category-list'),
        sortList = list.find('.sort'),
        search = list.find('.search'),
        data = {
            'products-most': {
                'callback': sortByProductCountDescending,
                'data': 'count'
            },
            'products-least': {
                'callback': sortByProductCountAscending,
                'data': 'count'
            },
            'name-ascending': {
                'callback': sortByNameAscending,
                'data': 'name'
            },
            'name-ascending': {
                'callback': sortByNameDescending,
                'data': 'name'
            }
        }

    sortList.on('click', 'li', function() {
        var method = $(this).data('sort');

        //switch(method) {
        //    case 'products-most': sortByProductCountDescending(); break;
        //    case 'products-least': sortByProductCountAscending(); break;
        //    case 'name-ascending': sortByNameAscending(); break;
        //    case 'name-descending': sortByNameDescending(); break;
        //}

        sortByCallback(data[method]);
    });

    search.on('input', function () {
        var val = $(this).val();

        if (val.length > 1) {
            searchByName(val);
        }
    });

    function searchByName(name) {
        var items = list.find('.list-item');

        var matches = items.filter(function() {
            return $(this).data("name").indexOf(name) >= 0;
        });

        clearSearch(items);

        var anchor = matches.children('a');
        anchor.addClass('search-match');
    }

    function clearSearch(el) {
        el.removeClass('search-match');
    }

    function sortBy(callback) {
        var groups = list.find('.categories');

        $.each(groups, function (i, el) {
            $(el).children('.list-item').sort(callback).appendTo($(el));
        });
    }

    function sortByProductCount(data, reverse) {
        var attr = 'data-' + data;

        sortBy(sort.numeric(attr, reverse));
    }

    function sortByCallback(data) {
        //reverse = reverse || false;


    }

    function sortByName(reverse) {
        reverse = reverse || false;
        var attr = 'data-name';

        sortBy(sort.alphabetically(attr, reverse));
    }

    function sortByNameAscending() { sortByName(true); }
    function sortByNameDescending() { sortByName(false); }
    function sortByProductCountAscending() { sortByProductCount(true); }
    function sortByProductCountDescending() { sortByProductCount(false); }

    return {
    }
};