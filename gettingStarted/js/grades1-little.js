
// register the namespace
var tutorials = tutorials || {};

(function ($, fluid) {

    /**
     * Generic creator function for a simple "littleComponent"
     * All this offers is options merging
     */
    tutorials.simpleComponent = function (options) {
        var that = fluid.initLittleComponent("tutorials.simpleComponent", options);

        // attach any public methods to the 'that' object
        that.publicFunction = function () {
            // ...
        };

        return that;
    };
    
    /****
     * Sample default for a littleComponent.
     * "Little components" offer only "options merging":
     */
    fluid.defaults("tutorials.simpleComponent", {
        gradeNames: ["fluid.littleComponent"],
        option1: "default value",
        option2: {
            subOpt1: 27,
            subOpt2: {
                deepValue: "something"
            }
        }
    });

    /**
     * Simple example: Currency Converter
     */
    tutorials.currencyConverter = function (options) {
        var that = fluid.initLittleComponent("tutorials.currencyConverter", options);

        // note that these methods have access to the values stored in 'options'
        // - the ones provided in the defaults, and possibly overriden by implementors
        that.convert = function (amount) {
            return amount * that.options.exchangeRate;
        }

        return that;
    };
    
    /**
     * Defaults for the currency converter component
     */
    fluid.defaults("tutorials.currencyConverter", {
        gradeNames: ["fluid.littleComponent"],
        exchangeRate: 1.035
    });


    /**
     * Other sample of options
     */
    fluid.defaults("tutorials.resourceLoader", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        basePath: "../resources",
        files: {
            headerTemplate: "headerTemplate.html",
            bodyTemplate: "bodyTemplate.html",
            footerTemplate: "footerTemplate.html"
        }
    });


    /**
     * The simple component, using autoInit
     */
    fluid.defaults("tutorials.simpleAutoComponent", {
        // the only difference is the addition of the "autoInit" grade
        // and the absence of a creator function
        gradeNames: ["fluid.littleComponent", "autoInit"],
        option1: "default value",
        option2: {
            subOpt1: 27,
            subOpt2: {
                deepValue: "something"
            }
        }
    });

    /**
     * The currency converter, using autoInit
     */
    fluid.defaults("tutorials.currencyConverterAuto", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        exchangeRate: 1.035,
        finalInitFunction: "tutorials.currencyConverterAuto.finalInit"
    });

    /**
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
    

}) (jQuery, fluid_1_4);
