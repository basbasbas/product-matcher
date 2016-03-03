module.exports = (function() {

    var defaults = {
        charsBeforeSearch: 1
    }

    var def = {
        input: '.search',
        data: 'search'
    }

    function inputEvent(el, callback) {
        var input = el.find(def.input);
        input.off('input').on('input', function() {
            var el = $(this),
                val = el.val();

            if (val.length > defaults.charsBeforeSearch) {
                callback(el.data(def.data), val);
            }
            else {
                callback();
            }
        });
    }

    return {
        inputEvent: inputEvent
    }
})();