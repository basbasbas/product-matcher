module.exports = (function() {

    function setup(def) {
        $(def.fromContainer).on({
            dragstart: def.send,
            dragleave: dragLeave,
            dragenter: dragEnter,
            dragend: dragEnd,
            dragover: preventDefault,
            drop: preventDefault
        }, def.from);

        $(def.toContainer).off('dragover drop').on({
            dragover: preventDefault,
            drop: def.receive
        }, def.to);
    }

    function preventDefault(e) {
        e.preventDefault();
    }
    function dragEnter() {
        $(this).addClass('over');
    }
    function dragLeave() {
        $(this).removeClass('over');
    }
    function dragEnd() {
        $(this).css('opacity', '1');
    }
    function dragStart() {
        $(this).css('opacity', '0.5');
    }

    return {
        setup: setup,
    }

}());