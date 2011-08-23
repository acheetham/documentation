
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */
/*global fluid, jQuery*/

// define the namespace
var tutorials = tutorials || {};

(function ($, fluid) {

    fluid.setLogging(true);

    /***************************************************************************
     * You might be creating a component that will actually want to do something
     * visual on your HTML page. little, model and evented components don't
     * provide any support for this: you'll need a viewComponent.
     * 
     * A view component assumes you have a list of dom elements you're interested in
     * and will provide very easy access to them through the DOM Binder
     * 
     * Note: view components automatically also provide support for model and events,
     * so you don't need to include those in your gradeNames
     * 
     * == need a link to DOM Binder docs
     * == need to explain why selector names are in defaults and not hard-coded
     */
    fluid.defaults("tutorials.componentWithAView", {
        gradeNames: ["fluid.viewComponent", "autoInit"],
        model: {},
        events: {},
        selectors: {
            heading: ".tut-cwav-heading",
            body: ".tut-cwav-body",
            footer: ".tut-cwav-footer"
        },
        finalInitFunction: "tutorials.componentWithAView.finalInit"
    });
    tutorials.componentWithAView.finalInit = function (that) {
        // Your component will likely use something more complicated than just
        // insert raw strings: you might show or hide things, add or remove
        // styles, etc.
        that.locate("heading").text("New Heading Text");
        that.locate("body").text("New Body Text");
        that.locate("footer").text("New Footer Text");
    };
    
    /***************************************************************************
     * Currency Converter
     */

    fluid.defaults("tutorials.currencyConverter", {
        gradeNames: ["fluid.viewComponent", "autoInit"],
        selectors: {
            amount: ".tut-currencyConverter-amount",
            currency: ".tut-currencyConverter-currency-selecter",
            result: ".tut-currencyConverter-result"
        },
        model: {
            rates: {
                euro: 0.712,
                yen: 81.841,
                yuan: 6.609,
                usd: 1.02,
                rupee: 45.789
            },
            currentSelection: "euro",
            amount: 0
        },
        events: {
            conversionUpdated: null
        },
        finalInitFunction: "tutorials.currencyConverter.finalInit"
    });
    
    var bindEventHanders = function (that) {
        that.locate("currency").change(function () {
            that.applier.requestChange("currentSelection", that.locate("currency").val());
        });

        that.locate("amount").change(function () {
            that.applier.requestChange("amount", that.locate("amount").val());
        });

        // When the model changes, update the resulting "converted" value
        that.applier.modelChanged.addListener("*", function () {
            that.convert(that.model.amount);
        });
    };

    tutorials.currencyConverter.finalInit = function (that) {

        // Add a method to the component object
        that.convert = function (amount) {
            var convertedAmount = parseInt(amount) * that.model.rates[that.model.currentSelection];
            that.locate("result").text(convertedAmount);
            that.events.conversionUpdated.fire(convertedAmount);
        };
        
        bindEventHanders(that);
    };

    /*
     * What else does a view component offer? what should you do with a view
     * component (e.g. write that.refreshView()?)
     */

    /***************************************************************************
     * If your view needs are more complicated, you might need a rendererComponent.
     * See that tutorial...
     */


})(jQuery, fluid);
