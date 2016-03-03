module.exports = (function() {

    function unwrapText(el) {
        el.each(function() {
            $(this).replaceWith(this.childNodes);
        });
    }

    function getTextOnly(el) {
        return el.contents().filter(function() {
            return this.nodeType == Node.TEXT_NODE;
        }).text();
    }

    return {
        unwrapText: unwrapText,
        getTextOnly: getTextOnly
    }
}());