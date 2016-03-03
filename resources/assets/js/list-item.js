module.exports = (function() {

    var conf = require('./list-config.js');

    function Item(item) {
        this.el = item;

        this.children = function() {
            return find(conf.group);
        };

        this.text = function() {
            return find(conf.text);
        };

        this.label = function() {
            return find(conf.label);
        };

        function find(sel) {
            return item.find(sel).first();
        }
    }

    return Item;

}());