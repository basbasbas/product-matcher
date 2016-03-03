module.exports = (function() {

    var templates = {
        bottom: function (data, labelInner) {
            return '' +
            '<div class="list-item bottom" draggable="true" data-level="' + data.level + '" data-count="' + data.count + '" data-name="' + data.name + '">' +
                '<a href="#" class="list-item-text list-group-item">' +
                    '<span class="badge level level-' + data.level + '">Lvl ' + data.level + '</span>' +
                    '<span class="badge count">' + data.count + '</span>' +
                    '<span class="list-item-label">' + labelInner + '</span>' +
                    '<i class="glyphicon glyphicon-remove-circle remove-item"></i>' +
                    '<i class="glyphicon glyphicon-plus-sign prep-add-item"></i>'
                '</a>' +
            '</div>';
        },
        bottomNoInput: function (data) {
            return this.bottom(data, data.name);
        },
        bottomWithInput: function (data) {
            return this.bottom(data, this.subInput());
        },
        subInput: function () {
            return '' +
            '<input type="text" class="add-item" onfocus="this.value = this.value" data-add="category" placeholder="Add category..">';
        },
        group: function (html) {
            return '' +
            '<div class="list-group collapse categories">' + html + '</div>';
        }

    }

    return templates;

}());