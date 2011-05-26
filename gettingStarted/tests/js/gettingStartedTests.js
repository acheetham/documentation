
(function ($) {
    $(document).ready(function () {
        var gettingStartedTests = new jqUnit.TestCase("Getting Started Tutorial Tests");

        gettingStartedTests.test("simple littleComponent", function () {
            // create a component
            var test1 = tutorials.simpleComponent();
            var componentDefaults = {
                simpleValue: "default value",
                deepObject1: {
                    subOpt1: 27,
                    subOpt2: {
                        deepValue: "something"
                    }
                }
            };
            jqUnit.assertEquals("Component has type", "tutorials.simpleComponent", test1.typeName);
            jqUnit.assertEquals("Component has nickName", "simpleComponent", test1.nickName);
            jqUnit.assertEquals("Component has grade", "fluid.littleComponent", test1.options.gradeNames[0]);
            jqUnit.assertEquals("Default value present", componentDefaults.simpleValue, test1.options.simpleValue);
            jqUnit.assertDeepEq("Default object present", componentDefaults.deepObject1, test1.options.deepObject1);

            // override a default
            var overrides = {
                simpleValue: "override",
                deepObject1: {
                    // note that subOpt1 is not changed
                    subOpt2: {
                        deepValue: "something different"
                    }
                },
                deepObject2: {
                    sub2: "only this one"
                }
            };
            var test2 = tutorials.simpleComponent(overrides);
            jqUnit.assertEquals("Override value present", overrides.simpleValue, test2.options.simpleValue);
            jqUnit.assertEquals("Unchanged value preserved", componentDefaults.deepObject1.subOpt1, test2.options.deepObject1.subOpt1);
            jqUnit.assertDeepEq("Overridden object value present", overrides.deepObject1.subOpt2, test2.options.deepObject1.subOpt2);
            // note that all other sub-objects have been removed by the 'replace' merge policy
            jqUnit.assertDeepEq("'replace' merge policy", {sub2: "only this one"}, test2.options.deepObject2);

        });

        gettingStartedTests.test("auto-initted littleComponent", function () {
            // create a component
            var test1 = tutorials.simpleAutoComponent();
            var componentDefaults = {
                simpleValue: "default value",
                deepObject1: {
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
            jqUnit.assertDeepEq("Default object present", componentDefaults.deepObject1, test1.options.deepObject1);

            // override a default
            var overrides = {
                simpleValue: "override",
                deepObject1: {
                    // note that subOpt1 is not changed
                    subOpt2: {
                        deepValue: "something different"
                    }
                },
                deepObject2: {
                    sub2: "only this one"
                }
            };
            var test2 = tutorials.simpleAutoComponent(overrides);
            jqUnit.assertEquals("Override value present", overrides.simpleValue, test2.options.simpleValue);
            jqUnit.assertEquals("Unchanged value preserved", componentDefaults.deepObject1.subOpt1, test2.options.deepObject1.subOpt1);
            jqUnit.assertDeepEq("Overridden object value present", overrides.deepObject1.subOpt2, test2.options.deepObject1.subOpt2);
            // note that all other sub-objects have been removed by the 'replace' merge policy
            jqUnit.assertDeepEq("'replace' merge policy", {sub2: "only this one"}, test2.options.deepObject2);

        });

        gettingStartedTests.test("littleComponent with method", function () {
            var test1 = tutorials.currencyConverter();
            jqUnit.assertEquals("", 1.035, test1.convert(1));

            var test2 = tutorials.currencyConverter({exchangeRate: 0.97});
            jqUnit.assertEquals("", 0.97, test2.convert(1));
        });

        gettingStartedTests.test("littleComponent with method, autoInitted", function () {
            var test1 = tutorials.currencyConverter();
            jqUnit.assertEquals("", 1.035, test1.convert(1));

            var test2 = tutorials.currencyConverter({exchangeRate: 0.97});
            jqUnit.assertEquals("", 0.97, test2.convert(1));
        });

        gettingStartedTests.test("model-bearing component, autoInitted", function () {
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

        gettingStartedTests.test("model-bearing component, with pre-init", function () {
            var test1 = tutorials.datedComponent();
            jqUnit.assertEquals("Date added to model", "today's date", test1.model.date);

            var test2 = tutorials.datedComponent({model: {date: "yesterday's date"}});
            jqUnit.assertEquals("Correct date overrides model", "today's date", test2.model.date);
        });
    });
})(jQuery);