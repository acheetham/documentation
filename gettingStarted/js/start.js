
// register the namespace
var tutorials = tutorials || {};

(function ($, fluid) {

    /***************************************************************************
     * The creator function for a simple "littleComponent"
     * All this offers is options merging
     */
    tutorials.simpleComponent = function (options) {
        var that = fluid.initLittleComponent("tutorials.simpleComponent", options);
        // a "little component" offers only options merging
        return that;
    };
    
    /*
     * Defaults for the "simpleComponent" component
     */
    fluid.defaults("tutorials.simpleComponent", {
        gradeNames: ["fluid.littleComponent"],
        simpleValue: "default value",
        deepObject1: {
            subOpt1: 27,
            subOpt2: {
                deepValue: "something"
            }
        },
        deepObject2: {
            sub1: "A",
            sub2: "B",
            sub3: "C",
            sub4: "D"
        },
        mergePolicy: {
            // simpleValue not specified, no need
            // deepObject1 not specified: default is deep merge
            deepObject2: "replace" // any options will completely replace the default, not be merged with it
        }
    });

    /***************************************************************************
     * The same component, created using "autoInit"
     * No need to write a creator function: the framework will
     * create it for you.
     */
    fluid.defaults("tutorials.simpleAutoComponent", {
        // the only difference is the addition of the "autoInit" grade
        // and the absense of a creator function
        gradeNames: ["fluid.littleComponent", "autoInit"],
        simpleValue: "default value",
        deepObject1: {
            subOpt1: 27,
            subOpt2: {
                deepValue: "something"
            }
        },
        deepObject2: {
            sub1: "A",
            sub2: "B",
            sub3: "C",
            sub4: "D"
        },
        mergePolicy: {
            // simpleValue not specified, no need
            // deepObject1 not specified: default is deep merge
            deepObject2: "replace" // any options will completely replace the default, not be merged with it
        }
    });

    /***************************************************************************
     * Suppose you want your component to offer some functionality
     * to its users through a public API. You can add methods
     * to the component object. 
     */
    tutorials.currencyConverter = function (options) {
        var that = fluid.initLittleComponent("tutorials.currencyConverter", options);

        that.convert = function (amount) {
            return amount * that.options.exchangeRate;
        }
        return that;
    };
    
    /*
     * The defaults for the currency converter component
     */
    fluid.defaults("tutorials.currencyConverter", {
        gradeNames: ["fluid.littleComponent"],
        exchangeRate: 1.035
    });

    /***************************************************************************
     * If you autoInit your component, you can take advantage of
     * the "finalInit" hook to add your public method.
     * This hook is the last thing that happens before the final
     * component is returned to the user.
     */
    fluid.defaults("tutorials.currencyConverterAuto", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        exchangeRate: 1.035,
        finalInitFunction: "tutorials.currencyConverterAuto.finalInit"
    });

    /*
     * The final init function
     */
    tutorials.currencyConverterAuto.finalInit = function (that) {
        that.convert = function (amount) {
            return amount * that.options.exchangeRate;
        }
    };
    

    /**
     * In general, we recommend the "autoInit" method of creating
     * components, so the rest of these examples will use that.
     * We suggest you only write your own creator function if the
     * autoInit method, with its lifecycle hooks, are not sufficient.
     */
    
    /***************************************************************************
     * Suppose you want your component to manage a data model:
     * You need a "modelComponent".
     * Model components automatically get a "change applier"
     * which should be used for any modification to or queries
     * of your model.
     */
    fluid.defaults("tutorials.modelBearingComponent", {
        gradeNames: ["fluid.modelComponent", "autoInit"],
        model: {}
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
        model: {},
        preInitFunction: "tutorials.datedComponent.preInitFunction"
    });

    /*
     * A pre-init function to ensure that the model is in the correct
     * state before proceeding with other component initialization
     */
    tutorials.datedComponent.preInitFunction = function (that) {
        // set the date in the model to ensure that it is
        // correctly set to "the date at runtime"
        that.model.date = "today's date"; // should be 'new Date()', but we use something testable for this tutorial
    };
    
}) (jQuery, fluid_1_4);
