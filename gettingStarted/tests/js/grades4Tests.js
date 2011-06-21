
(function ($) {
    $(document).ready(function () {
        var gradesTests = new jqUnit.TestCase("Grades Tutorial Tests: View Components");

        gradesTests.test("view component, with pre-init", function () {
            var test1 = tutorials.componentWithAView("#cwav");
            jqUnit.assertEquals("Heading has been inserted", "New Heading Text", $(".tut-cwav-heading").text());
            jqUnit.assertEquals("Body has been inserted", "New Body Text", $(".tut-cwav-body").text());
            jqUnit.assertEquals("Footer has been inserted", "New Footer Text", $(".tut-cwav-footer").text());

            test1.locate("body").text("Changed body text");
            jqUnit.assertEquals("Body has been updated", "Changed body text", $(".tut-cwav-body").text());
        });
    });
})(jQuery);