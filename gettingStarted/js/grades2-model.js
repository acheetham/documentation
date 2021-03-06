/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */
/*global fluid, jQuery*/

// define the namespace
var tutorials = tutorials || {};

(function ($, fluid) {

    /***************************************************************************
     * Suppose you want your component to manage a data model:
     * You need a "modelComponent".
     * Model components automatically get a "change applier"
     * which should be used for any modification to or queries
     * of your model.
     * == need to link to a changeapplier tutorial
     * Note that *all* component grades provide options merging by default.
     */
    fluid.defaults("tutorials.modelBearingComponent", {
        gradeNames: ["fluid.modelComponent", "autoInit"],
        model: {} // flesh out a sample model a bit
    });
    
    /***************************************************************************
     * What might you use a model for?
     */
    /**
     * The defaults for the currency converter component, with many countries
     */
    fluid.defaults("tutorials.currencyConverter", {
        gradeNames: ["fluid.modelComponent", "autoInit"],
        model: {
            currentSelection: "euro",
            rates: {
                euro: 0.712,
                yen: 81.841,
                yuan: 6.609,
                usd: 1.02,
                rupee: 45.789
            }
        },
        finalInitFunction: "tutorials.currencyConverter.finalInit"
    });
    
    
    /***************************************************************************
     * Suppose you need to do something to your model before it
     * is used (e.g. validate a value, update something). The
     * component lifecycle offers a "preInit" hook that you 
     * can use. This will happen after options merging, but
     * before any dependent subcomponents are created.
     */
    fluid.defaults("tutorials.datedComponent", {
        gradeNames: ["fluid.modelComponent", "autoInit"],
        model: {
            date: null
        },
        preInitFunction: "tutorials.datedComponent.preInit"
    });

    /*
     * A pre-init function to ensure that the model is in the correct
     * state before proceeding with other component initialization
     */
    tutorials.datedComponent.preInit = function (that) {
        // set the date in the model to ensure that it is
        // correctly set to "the date at runtime"
        that.applier.requestChange("date", "today's date"); // should be 'new Date()', but we use something testable for this tutorial
    };

    /*
     * You can, of course, use the final init function to add any public methods, etc.
     */

})(jQuery, fluid);
