
// register the namespace
var tutorials = tutorials || {};

(function ($, fluid) {

    /***************************************************************************
     * In the previous examples, parent components overrode the subcomponent's
     * default values. This would be because the 
     * 
     * Ideally, subcomponents are designed to be modular and reusable.
     * When this is the case, you don't want to define the values for a
     * subcomponent's defaults in the parent's own component tree, but
     * somewhere else, where it will be applicable regardless of where it's
     * being used i.e. if it has a different parent, for example.
     * 
     * To declare the values to use for a subcomponent outside of the component
     * tree, the framework offers the notion of "demands."
     * == need link to docs on demands specifications
     * A demands statement
     * is a way of saying "When X is being used in the context of Y,
     * use these values for its options." In fact, demands even allow you to say
     * "When someone asks for X in the context of Y, use function Z" and
     * "When someone asks for X in the context of P, use function Q".
     * ==> for an example of this see cspace's demands for "select" (RecordList)
     *     (ah, shoot, those are invokers, not subcomponents...)
     *     
     * This allows for different option values in different contexts as well as
     * completely different implementations in different contexts. It also allows
     * for any parent component to just ask for X,
     * knowing that the separate demands blocks will take care of specifying what
     * the values need to be.
     */
    
    /**
     * For example: Suppose you're creating in interface for a database of records
     * Your interface will likely be presenting lists of records in many different contexts:
     * search results, recently modified, created by a certain user, related to a certain other record...
     * The columns in the lists might be different depending on whether its a list of people or a list
     * of places...
     * You might create a single component for displaying a list of records, but make it configurable
     * depending on the context. Your application would use demands block to declare just how the
     * lists would be configured in the different contexts.
     */

}) (jQuery, fluid_1_4);
