
(function ($) {
    $(document).ready(function () {
        var gradesTests = new jqUnit.TestCase("Grades Tutorial Tests: Evented Components");

        gradesTests.test("evented component, with pre-init", function () {
            expect(2);
            var saveListener = function () {
                jqUnit.assertTrue("afterSave should fire", true);
            };
            var removePreventer = function () {
                jqUnit.assertTrue("onRemove should fire", true);
                // returning false will prevent the action
                return false;
            };
            var removeListener = function () {
                // this test will fail if executed - it should not happen
                jqUnit.assertTrue("afterRemove should NOT fire", false);
            };
            var opts = {
                listeners: {
                    afterSave: saveListener,
                    onRemove: removePreventer,
                    afterRemove: removeListener
                }
            };
            var test1 = tutorials.recordEditor(opts);
            test1.save();
            test1.remove();
        });
    });
})(jQuery);