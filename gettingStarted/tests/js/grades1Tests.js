
(function ($) {
    $(document).ready(function () {
        var gradesTests = new jqUnit.TestCase("Grades Tutorial Tests: Little Components");

        gradesTests.test("simple littleComponent", function () {
            // create a component
            var test1 = tutorials.simpleComponent();
            var componentDefaults = {
                option1: "default value",
                option2: {
                    subOpt1: 27,
                    subOpt2: {
                        deepValue: "something"
                    }
                }
            };
            jqUnit.assertEquals("Component has type", "tutorials.simpleComponent", test1.typeName);
            jqUnit.assertEquals("Component has nickName", "simpleComponent", test1.nickName);
            jqUnit.assertEquals("Component has grade", "fluid.littleComponent", test1.options.gradeNames[0]);
            jqUnit.assertEquals("Default value present", componentDefaults.option1, test1.options.option1);
            jqUnit.assertDeepEq("Default object present", componentDefaults.option2, test1.options.option2);

            // override a default
            var overrides = {
                option1: "override",
                option2: {
                    // note that subOpt1 is not changed
                    subOpt2: {
                        deepValue: "something different"
                    }
                }
            };
            var test2 = tutorials.simpleComponent(overrides);
            jqUnit.assertEquals("Override value present", overrides.option1, test2.options.option1);
            jqUnit.assertEquals("Unchanged value preserved", componentDefaults.option2.subOpt1, test2.options.option2.subOpt1);
            jqUnit.assertDeepEq("Overridden object value present", overrides.option2.subOpt2, test2.options.option2.subOpt2);

        });

        gradesTests.test("auto-initted littleComponent", function () {
            // create a component
            var test1 = tutorials.simpleAutoComponent();
            var componentDefaults = {
                option1: "default value",
                option2: {
                    subOpt1: 27,
                    subOpt2: {
                        deepValue: "something"
                    }
                }
            };
            jqUnit.assertEquals("Component has type", "tutorials.simpleAutoComponent", test1.typeName);
            jqUnit.assertEquals("Component has nickName", "simpleAutoComponent", test1.nickName);
            jqUnit.assertEquals("Component has grade", "fluid.littleComponent", test1.options.gradeNames[0]);
            jqUnit.assertEquals("Default value present", componentDefaults.simpleValue, test1.options.simpleValue);
            jqUnit.assertDeepEq("Default object present", componentDefaults.option2, test1.options.option2);

            // override a default
            var overrides = {
                option1: "override",
                option2: {
                    // note that subOpt1 is not changed
                    subOpt2: {
                        deepValue: "something different"
                    }
                }
            };
            var test2 = tutorials.simpleAutoComponent(overrides);
            jqUnit.assertEquals("Override value present", overrides.option1, test2.options.option1);
            jqUnit.assertEquals("Unchanged value preserved", componentDefaults.option2.subOpt1, test2.options.option2.subOpt1);
            jqUnit.assertDeepEq("Overridden object value present", overrides.option2.subOpt2, test2.options.option2.subOpt2);

        });

        gradesTests.test("littleComponent with method", function () {
            var test1 = tutorials.currencyConverter();
            jqUnit.assertEquals("", 1.035, test1.convert(1));

            var test2 = tutorials.currencyConverter({exchangeRate: 0.97});
            jqUnit.assertEquals("", 0.97, test2.convert(1));
        });

        gradesTests.test("littleComponent with method, autoInitted", function () {
            var test1 = tutorials.currencyConverter();
            jqUnit.assertEquals("", 1.035, test1.convert(1));

            var test2 = tutorials.currencyConverter({exchangeRate: 0.97});
            jqUnit.assertEquals("", 0.97, test2.convert(1));
        });

    });
})(jQuery);