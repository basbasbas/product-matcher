module.exports = (function() {

    var def = {
        sortList: '.sort',
        sortData: 'sort'
    }

    function listEvent(el, callback) {
        el.find(def.sortList).on('click', 'li', function() {
            var method = $(this).data(def.sortData);

            callback(method);
        });
    }

    return {
        listEvent: listEvent
    }
})();