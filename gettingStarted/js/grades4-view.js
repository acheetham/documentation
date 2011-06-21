
// register the namespace
var tutorials = tutorials || {};

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


})(jQuery, fluid_1_4);
