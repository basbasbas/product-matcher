// Vendor
$ = jQuery =                require('jquery');
window._ =                  require('lodash');
var bootstrap =             require('bootstrap');

                            require('ba-tiny-pubsub');
                            require('./vendor/defiant.min.js');


jQuery.event.props.push('dataTransfer');

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// Server comms
var category =              require('./category.js');

// Modules
var test =                  require('./test.js');
var accordion =             require('./accordion.js');

// Dependencies
var dragDrop =              require('./drag-drop.js');

// Components
var listInput =             require('./list-input.js');

var sort =                  require('./sort-options.js');
var sortInput =             require('./sort-input.js');
var listSort =              (require('./list-sort.js'))(sort, sortInput);

var filter =                require('./filter-options.js');
var filterInput =           require('./filter-input.js');
var listFilter =            (require('./list-filter.js'))(filter, filterInput);

var dragDrop =              require('./drag-drop.js');
var dynamicLayeredList =    (require('./dynamic-layered-list.js'))(dragDrop, listInput);

var categoryLink =          (require('./category-link.js'))(dragDrop);


//console.log(test.run('!!??'));
