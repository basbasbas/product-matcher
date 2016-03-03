module.exports = (function() {

    var conf = require('./list-config.js'),
        catConf = require('./category-config.js')

    var def = {
        container: '.category-list'
    }

    var containerID = conf.containerID(def.container);
    var events = [
        { input: conf.input.new, func: create },
    ]

    $.each(events, function(i, event) {
        $.subscribe(containerID + event.input, function(e, data) { event.func(data) } );
    });

    function create(data) {
        if (!data.name) return;

        var category = {
            name: data.name,
            branche: 1
        }

        var json = JSON.stringify(category);

        $.post(catConf.categories.store, json).done(function (data) {
            console.log(data);
        });
    }

    function update() {

    }

    function remove() {

    }



}());