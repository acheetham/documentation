
(function ($) {
    $(document).ready(function () {
        var subcomponentsTests = new jqUnit.TestCase("Subcomponents Tutorial Tests");

        subcomponentsTests.test("basic form", function () {
            // create the parent component
            var test1 = tutorials.parentComponent();
            jqUnit.assertTrue("Parent has subcomponent 1", test1.child1);
            jqUnit.assertTrue("Parent has subcomponent 2", test1.child2);
        });

        subcomponentsTests.test("Values from parent", function () {
            var test1 = tutorials.parentComponent2();
            jqUnit.assertEquals("Child has new value", "New second value", test1.childA.options.value2);
            jqUnit.assertEquals("Child has value from parent", "my thing", test1.childB.options.thing1);

            // if a component is initialized with values that override the defaults,
            // the subcomponents will inherit these values
            var test2 = tutorials.parentComponent2({thing: "Overridden thing"});
            jqUnit.assertEquals("Child has overridden value from parent", "Overridden thing", test2.childB.options.thing1);
        });
    });
})(jQuery);