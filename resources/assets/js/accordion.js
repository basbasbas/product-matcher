module.exports = (function() {

    var global = require('./global.js');

    var container = '.base-category-list',
        listRoot = '.list-group-root',
        listItem = '.list-group-item',
        listSub = '.list-group';

    //$(listRoot).on('click', listItem, function () {
    //
    //});

    $(listRoot).on('click', listItem, function(e) {
        if ($(this).closest(listRoot)[0].hasAttribute('data-' + global.state.off) || $(this).siblings(listSub).is(global.accordion.collapsing)) {
            e.stopPropagation();
        } else {
            $(global.iconSelector + '.chevron', this)
                .toggleClass(global.accordion.iconExpanded)
                .toggleClass(global.accordion.iconContracting);
        }

    });

}());