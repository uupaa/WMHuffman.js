var ModuleTestWMHuffman = (function(global) {

var _runOnNode = "process" in global;
var _runOnWorker = "WorkerLocation" in global;
var _runOnBrowser = "document" in global;

return new Test("WMHuffman", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       false, // test the primary module and secondary module
    }).add([
        testWMHuffman_buildTable,
    ]).run().clone();

function testWMHuffman_buildTable(test, pass, miss) {

    test.done(miss());
}


})((this || 0).self || global);

