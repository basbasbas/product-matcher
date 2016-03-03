module.exports = (function() {

    function alphabetically(attr, reverse) {
        return function(a, b) {
            if (reverse) return a.getAttribute(attr).toUpperCase().localeCompare(b.getAttribute(attr).toUpperCase());
            else return b.getAttribute(attr).toUpperCase().localeCompare(a.getAttribute(attr).toUpperCase());
        }
    }

    function numeric(attr, reverse) {
        return function(a, b) {
            if (reverse) return parseInt(a.getAttribute(attr)) - parseInt(b.getAttribute(attr));
            else return parseInt(b.getAttribute(attr)) - parseInt(a.getAttribute(attr));
        }
    }

    return {
        alphabetically: alphabetically,
        numeric: numeric,
    }
})();