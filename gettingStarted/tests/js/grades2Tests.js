
(function ($) {
    $(document).ready(function () {
        var gradesTests = new jqUnit.TestCase("Grades Tutorial Tests: Model Components");

        gradesTests.test("model-bearing component, autoInitted", function () {
            var test1 = tutorials.modelBearingComponent();
            jqUnit.assertTrue("Comoponent has a change applier", test1.applier);

            var testModel = {
                val1: "foo",
                val2: "bar"
            };
            var test2 = tutorials.modelBearingComponent({
                model: testModel
            });
            jqUnit.assertDeepEq("Applier has specified model", testModel, test2.applier.model);
            test2.applier.modelChanged.addListener("val2", function (model, oldModel, changeRequest) {
                jqUnit.assertEquals("Changed model has correct new value", "CAT", model.val2)              
            });
            test2.applier.requestChange("val2", "CAT");

            test2.applier.modelChanged.addListener("val1", function (model, oldModel, changeRequest) {
                jqUnit.assertTrue("modelChanged fired for val1", true)              
            });
            test2.applier.guards.addListener("val1", function (model, changeRequest) {
                if (changeRequest.value === null) {
                    // a return of false will prevent the requested change from happening
                    return false;
                }
            });
            test2.applier.requestChange("val1", null); // should NOT trigger modelChanged
            test2.applier.requestChange("val1", "FOG"); // will trigger modelChanged
        });

        gradesTests.test("model-bearing component, with pre-init", function () {
            var test1 = tutorials.datedComponent();
            jqUnit.assertTrue("Date added to model", (test1.model.date !== null));

            var test2 = tutorials.datedComponent({model: {date: "yesterday's date"}});
            jqUnit.assertEquals("Correct date overrides model", "today's date", test2.model.date);
        });
        
        gradesTests.test("currency converter", function () {
            var changeCount = 0;
            var test1 = tutorials.currencyConverter();
            jqUnit.assertEquals("Default conversion correct", 2*0.712, test1.convert(2));

            test1.applier.modelChanged.addListener("rates.yuan", function (model, oldModel, changeRequest) {
                changeCount++;
            });
            test1.updateRate("yuan", 42);
            jqUnit.assertTrue("modelChanged fired for rates", changeCount === 1);
            jqUnit.assertEquals("New value is present in model", 42, test1.model.rates.yuan);

            test1.applier.modelChanged.addListener("currentSelection", function (model, oldModel, changeRequest) {
                changeCount++;
            });
            test1.updateCurrency("rupee");
            jqUnit.assertTrue("modelChanged fired for currentSelection", changeCount === 2);
            jqUnit.assertEquals("Updated conversion correct", 2*45.789, test1.convert(2));
        });
    });
})(jQuery);