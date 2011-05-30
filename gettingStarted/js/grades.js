
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
     * Defaults for the "simpleComponent" component options
     * All these will be stored in an object called "options"
     * in the final component
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
     * What do "options" mean in the real world? What kinds of things are options
     * used for?
     */
    /*
     * Add real-world example
     */

    /***************************************************************************
     * The same component, created using "autoInit"
     * No need to write a creator function: the framework will
     * create it for you.
     */
    /*
     * convert this to use the real-world example
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

        // note that these methods have access to the values stored in 'options'
        // - the ones provided in the defaults, and possibly overriden by implementors
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
     * The autoInit lifecycle exposes points where you can modify the component.
     * == need to link to the lifecycle docs
     * The 'finalInit' hook is the last thing that happens before the final
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
    /*
     * Add real-world example
     */
    
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

    /*
     * You can, of course, use the final init function to add any public methods, etc.
     */

    /***************************************************************************
     * Your component probably works in an environment where other things are
     * operating, and probably needs to notify those other things of key events,
     * activities, etc. The Infusion Framework includes an events system, and
     * the easiest way to use it is to create an 'evented' component.
     * Note that this can be combined with a model component, if desired.
     * == need a link to events and event types
     */
    fluid.defaults("tutorials.componentWithEvents", {
        // because the gradeNames includes both eventedComponent and modelComponent,
        // the component will support both a model and events
        // if a model is not used, you can leave out modelComponent
        gradeNames: ["fluid.eventedComponent", "fluid.modelComponent", "autoInit"],
        model: {},
        events: {
            afterSave: null,
            onRemove: "preventable",
            afterRemove: null
        },
        finalInitFunction: "tutorials.componentWithEvents.finalInit"
    });
    
    /*
     * Add public methods that will fire events when they do things
     */
    tutorials.componentWithEvents.finalInit = function (that) {
        that.save = function () {
            // save stuff, then
            // let anyone listening know the save has happened:
            that.events.afterSave.fire();
        };
        
        that.remove = function () {
            // see if anyone listening objects to the removal:
            var prevent = that.events.onRemove.fire();
            if (prevent === false) {
                // a listener prevented the move,
                // don't do it
            }
            else {
                // no one objects, go ahead and remove
                that.events.afterRemove.fire();
            }
        };
    };
    
    /*
     * Need to talk about adding your own listeners as well.
     */

    /***************************************************************************
     * You might be creating a component that will actually want to do something
     * visual on your HTML page. little, model and evented components don't
     * provide any support for this: you'll need a viewComponent.
     * A view component assumes you have a list of dom elements you're interested in
     * and will provide very easy access to them through the DOM Binder
     * == need a link to DOM Binder docs
     * == need to explain why selector names are in defaults and not hard-coded
     * Note: view components automatically also provide support for model and events,
     * so you don't need to include those in your gradeNames
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
    
    /*
     * What else does a view component offer? what should you do with a view
     * component (e.g. write that.refreshView()?)
     */

    /***************************************************************************
     * If your view needs are more complicated, you might need a rendererComponent.
     * See that tutorial...
     */

}) (jQuery, fluid_1_4);
