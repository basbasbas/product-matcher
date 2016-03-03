module.exports = (function() {

    // Private..
    function run(n) {
        return n + ' has run';
    }

    // Public..
    return {
        run: run
    }
}());