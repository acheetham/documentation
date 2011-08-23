/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */
/*global fluid, jQuery*/

// define the namespace
var tutorials = tutorials || {};

(function ($, fluid) {

    /***************************************************************************
     * Your component probably works in an environment where other things are
     * operating, and probably needs to notify those other things of key events,
     * activities, etc. The Infusion Framework includes an events system, and
     * the easiest way to use it is to create an 'evented' component.
     * Note that this can be combined with a model component, if desired.
     * == need a link to events and event types
     */
    fluid.defaults("tutorials.recordEditor", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],
        events: {
            afterSave: null,
            onRemove: "preventable",
            afterRemove: null
        },
        finalInitFunction: "tutorials.recordEditor.finalInit"
    });
    
    /*
     * Add public methods that will fire events when they do things
     */
    tutorials.recordEditor.finalInit = function (that) {
        that.save = function () {
            // save stuff
            // ...
            // let anyone listening know the save has happened:
            that.events.afterSave.fire();
        };
        
        that.remove = function () {
            // see if anyone listening objects to the removal:
            var prevent = that.events.onRemove.fire();
            if (prevent === false) {
                // a listener prevented the move,
                // don't do it
            } else {
                // no one objects, go ahead and remove
                // ...
                // let listeners know that the remove has completed
                that.events.afterRemove.fire();
            }
        };
    };
     
    /***************************************************************************
     * Currency Converter
     */

    fluid.defaults("tutorials.currencyConverter", {
        gradeNames: ["fluid.modelComponent", "fluid.eventedComponent", "autoInit"],
        model: {
            rates: {
                euro: 0.712,
                yen: 81.841,
                yuan: 6.609,
                usd: 1.02,
                rupee: 45.789
            },
            currentSelection: "euro",
            amount: 0,
            convertedAmount: 0
        },
        events: {
            conversionUpdated: null
        },
        finalInitFunction: "tutorials.currencyConverter.finalInit"
    });
    
    tutorials.currencyConverter.finalInit = function (that) {

        // Add methods to the component object
        that.updateCurrency = function (newCurrency) {
            that.applier.requestChange("currentSelection", newCurrency);
        };

        that.updateRate = function (currency, newRate) {
            that.applier.requestChange("rates." + currency, newRate);
        };

        that.convert = function (amount) {
            var convertedAmount = amount * that.model.rates[that.model.currentSelection];
            that.applier.requestChange("convertedAmount", convertedAmount);
            return amount;
        };

        that.applier.modelChanged.addListener("convertedAmount", function (model, oldModel, changeRequest) {
            that.events.conversionUpdated.fire(model.convertedAmount);
        });
    };

})(jQuery, fluid);
