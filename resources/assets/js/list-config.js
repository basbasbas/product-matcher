module.exports = (function() {

return {
    root: '.list-group-root',
    group: '.list-group',
    item: '.list-item',
    text: '.list-item-text',
    label: '.list-item-label',
    root: '.list-group-root',
    input: {
        new: '.add-root-item',
        prepNewChild: '.prep-add-item',
        newChild: '.add-item',
        prepEdit: '.list-item-label',
        remove: '.remove-item',
        sort: '.sort-item',
    },
    containerID: function(str) {
        return str.substr(1);
    }
}

}());