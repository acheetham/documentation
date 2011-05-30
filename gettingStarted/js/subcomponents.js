// register the namespace
var tutorials = tutorials || {};

(function ($, fluid) {
    
    /***************************************************************************
     * Basic form
     * Need discussion of why split functionality out into multiple components
     * - examples, use cases, benefits
     * When components have subcomponents, the various parent-child relationships
     * result in a 'tree' structure of related components, referred to as the
     * "component tree."
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

    /*
     * Need to note that subcomponents can have options, and anything that could
     * be specified as an option can be specified in the subcomponent definition, 
     * such as listeners, selectors, styles, etc.
     */
    
    /*
     * Question: When would 'events' be specified in the subcomponent options?
     * Is this injection?
     * == might need a link to injection docs/tutorial here
     */

    /***************************************************************************
     * What kind of scenario/design would require subcomponents?
     */
    /*
     * Add a real-world example
     */

    /***************************************************************************
     * How can the subcomponents access information in the parent component,
     * especially if they don't know they're a child of a parent?
     * 
     * When a component is created by the framework though the autoInit lifecycle,
     * it is "registered" with the framework: It becomes part of the 'environment.'
     * When other components are created in the component tree, they have access to
     * this environment and can access components that have already been registered.
     * This is how subcomponents can access information in their parent component.
     * Note that not *everything* that's ever been registered is within the scope of
     * everything else: components can "see" ancestors, siblings created before them,
     * things that have explicitly been scoped to the whole application, etc.
     * === need link to full specifics of exactly what is in scope
     */
    /*
     * Convert this to use real-world example, or add separate real-world
     * example after it
     */

    fluid.defaults("tutorials.subcomponentA", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        value1: "value 1",
        value2: "value 2"
    });
    fluid.defaults("tutorials.subcomponentB", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        thing1: "thing 1",
        thing2: "thing 2"
    });
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
                    // childB is accessing its parent using the parent's "nickname"
                    // which is the final component of its full name
                    // the curly braces {} are the notation used by the framework
                    // to access components in the environment
                    thing1: "{parentComponent2}.options.thing"
                }
            }
        }
    });

    /***************************************************************************
     * Fun things to do with subcomponent!
     */
    
    /*
     * Need to finish fleshing these out, and add narrative text explaining them:
     * when, why, how, what...
     */

    // specify the container
    listLoadingIndicator: {
        type: "cspace.util.loadingIndicator",
        container: "{listEditor}.dom.list",
        options: { ...

    // shorthand notation (?)
    components: {
        eventHolder: "{eventHolder}" //Autocomplete.js
    }

    // use the 'empty subcomponent'
    components: {
        showAddButton: {
            // why do this?
            type: "fluid.emptySubcomponent"  // Demands.js
        }
    }
    
    // specify a special event to wait for before creating
    nonVocabularies: {
        type: "cspace.relatedRecordsList",
        createOnEvent: "afterRender", // <<<===
        options: { ...
        
    // nest
    components: {
        fileUploader: {
            type: "fluid.uploader",
            createOnEvent: "afterRender",
            container: "{mediaUploader}.dom.fileUploader",
            options: {
                components: {
                    fileQueueView: { ...

    // specify a priority
    components: {
        pageCategory: {
            type: "cspace.pageCategory",
            priority: "first",
            options: { ...

})(jQuery, fluid_1_4);
