
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */
/*global fluid, jQuery*/

// define the namespace
var tutorials = tutorials || {};

(function ($, fluid) {

    fluid.setLogging(true);

    /***************************************************************************
     */
    fluid.defaults("tutorials.renderedComponent", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],
        model: {},
        events: {},
        selectors: {
            heading: ".tut-rc-heading",
            body: ".tut-rc-body",
            footer: ".tut-rc-footer"
        },
        finalInitFunction: "tutorials.renderedComponent.finalInit"
    });
    tutorials.renderedComponent.finalInit = function (that) {

    };
    
    /***************************************************************************
     * Currency Converter
     */

    fluid.defaults("tutorials.currencyConverter", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],
        selectors: {
            amount: ".tut-currencyConverter-amount",
            currency: ".tut-currencyConverter-currency-selecter",
            result: ".tut-currencyConverter-result"
        },
        model: {
            rates: {
                names: ["euro", "yen", "yuan", "usd", "rupee"],
                values: ["0.712", "81.841", "6.609", "1.02", "45.789"]
            },
            currentSelection: "0.712",
            amount: 0,
            result: 0
        },
        events: {
            conversionUpdated: null
        },
        produceTree: "tutorials.currencyConverter.produceTree",
        finalInitFunction: "tutorials.currencyConverter.finalInit",
        renderOnInit: true
    });
    
    var bindEventHanders = function (that) {
        // When the model changes, update the resulting "converted" value
        that.applier.modelChanged.addListener("amount", function () {
            that.convert(that.model.amount);
        });
        that.applier.modelChanged.addListener("currentSelection", function () {
            that.convert(that.model.amount);
        });
        that.applier.modelChanged.addListener("result", function () {
            that.refreshView();
        });
    };

    /**
     * What is the required signature of produceTree()? what are the parameters? return value?
     * takes 'that'
     * returns the protoTree
     */
    tutorials.currencyConverter.produceTree = function (that) {
        var tree = {};
        tree.amount = "${amount}";
        tree.currency = {
            optionnames: "${rates.names}",
            optionlist: "${rates.values}",
            selection: "${currentSelection}"
        };
        tree.result = "${result}";
        return tree;
    };

    tutorials.currencyConverter.finalInit = function (that) {

        // Add a method to the component object
        that.convert = function (amount) {
            var convertedAmount = parseInt(amount) * that.model.currentSelection;
            that.applier.requestChange("result", convertedAmount);
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
