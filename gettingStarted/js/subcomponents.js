// register the namespace
var tutorials = tutorials || {};

(function ($, fluid) {
    
    /***************************************************************************
     * Basic form
     * Need discussion of why split functionality out into multiple components
     * - examples, use cases, benefits
     */

    /*
     * Define one subcomponent
     */
    fluid.defaults("tutorials.subcomponent1", {
        gradeNames: ["fluid.littleComponent", "autoInit"]
    });
    /*
     * Define another subcomponent
     */
    fluid.defaults("tutorials.subcomponent2", {
        gradeNames: ["fluid.littleComponent", "autoInit"]
    });
    /*
     * Define the parent component, to use the subcomponents
     */
    fluid.defaults("tutorials.parentComponent", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        components: {
            child1: {
                type: "tutorials.subcomponent1"
            },
            child2: {
                type: "tutorials.subcomponent2"
            }
        }
    });

    /***************************************************************************
     * How can the subcomponents access information in the parent component,
     * especially if they don't know they're a child of a parent?
     */

    /*
     * Define one subcomponent
     */
    fluid.defaults("tutorials.subcomponentA", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        value1: "value 1",
        value2: "value 2"
    });
    /*
     * Define another subcomponent
     */
    fluid.defaults("tutorials.subcomponentB", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        thing1: "thing 1",
        thing2: "thing 2"
    });
    /*
     * Define the parent component, to use the subcomponents
     */
    fluid.defaults("tutorials.parentComponent2", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        thing: "my thing",
        components: {
            childA: {
                type: "tutorials.subcomponentA",
                options: {
                    value2: "New second value"
                }
            },
            childB: {
                type: "tutorials.subcomponentB",
                options: {
                    thing1: "{parentComponent2}.options.thing"
                }
            }
        }
    });
})(jQuery, fluid_1_4);
