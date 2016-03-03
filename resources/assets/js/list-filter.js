module.exports = function(filter, filterInput) {

    var helpers = require('./helpers.js');

    var def = {
        // List definitions
        container: '.base-category-list',
        listRoot: '.list-group-root',
        listSub: '.categories',
        listItem: '.list-item',
        listItemText: '.list-item-text',
        listItemLabel: '.list-item-label',
        searchMatch: 'search-match'
    }

    var container = $(def.container),
        root = container.find(def.listRoot).first(),

        // Callbacks by data-search attribute
        // ----
        // Callback     -   function to apply
        // Data         -   attribute name to use
        callbacks = {
            'name': {
                'callback': filter.byString,
                'data': 'name'
            },
            'default': {
                'callback': clearSearch
            }
        };

    // Listen for UI input
    filterInput.inputEvent(container, eventCallback);

    function eventCallback(method, val) {
        if (method === undefined) callbacks.default.callback();
        else {
            filterByCallback(callbacks[method], val);
        }
    }

    function filterByCallback(data, val) {
        var items = container.find(def.listItem),
            matches = data.callback(items, data.data, val),
            texts = matches.children(def.listItemText),
            count = matches.length;

        // Remove matched text span
        clearMatch();

        // Show matched items, including its tree and sublist
        filterTree(items, matches);

        // Add matched text span
        addMatch(texts, val);

        // Disable list interaction
        root.attr('data-off', '');
    }

    function filterTree(items, matches) {
        // Hide all list items
        items.hide();

        // Show matched list item
        matches.show();

        // Show matched list item tree
        var parents = matches.parents(def.listItem).show(),
            children = matches.find(def.listItem).show(),
            tree = matches.add(parents.add(children));

        // Show matched tree sublists
        tree.children(def.listSub).show();
    }

    function clearSearch() {
        // Show all list items
        container.find(def.listItem).show();

        // Reset show/hide style state
        container.find(def.listSub).removeAttr('style');

        // Re-enable list interaction
        root.removeAttr('data-off');

        // Remove matched text span
        clearMatch();
    }

    function clearMatch() {
        unwrapMatch(container);
    }

    function addMatch(matches, val) {

        // Remove matched text span
        unwrapMatch(matches);

        $.each(matches, function (i, el) {
            el = $(el);

            // Wrap span around matched text
            var label = el.find(def.listItemLabel),
                text = helpers.getTextOnly(label),
                index = text.toLowerCase().indexOf(val.toLowerCase()),
                subtext = text.substring(index, index + val.length),
                html = wrapMatchHTML(subtext);

            label.html(text.replace(subtext, html));
        });
    }

    function wrapMatchHTML(html) {
        return '<span class="' + def.searchMatch + '">' + html + '</span>';
    }

    function unwrapMatch(el) {
        helpers.unwrapText(el.find('span.' + def.searchMatch));
    }


    return {
    }
};