module.exports = (function() {

    function byString(el, data, sub) {
        return el.filter(function() {
            // TODO; not case sensitive
            return $(this).data(data).toLowerCase().indexOf(sub.toLowerCase()) >= 0;
        });
    }

    return {
        byString: byString
    }

}());