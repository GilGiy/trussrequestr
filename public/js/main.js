$( document ).ready(function() {

    function makeContact(name, email, phone) {
        return {
            name: name,
            email: email,
            phone: phone,
        }
    }

    function makeJobsite(street, city, zip) {
        return {
            street: street,
            city: city,
            zip: zip,
        }
    }
    
    function newLoads (snow, wind) {
        return {
            snow: snow,
            wind: wind,
        }
    }

    function newTruss (span, pitch, spacing, heel) {
        return {
            span: span,
            pitch: pitch,
            spacing: spacing,
            heel: heel,
        }
    }

    
    $("#next-1").click(function() {
        // If all the fields are filled
        if ($("#name_field").val() == "" || $("#email_field").val() == "" || $("#phone_field").val() == "") {
            alert("Please fill all the fields");
            return;
        }

        // Generate the object
        contact = makeContact($("#name_field").val(), $("#email_field").val(), $("#phone_field").val());

        // Show the next dialog
        $("#dc-1").hide();
        $("#dc-2").show();
    })

    $("#next-2").click(function() {
        // If all the fields are filled
        if ($("#street_field").val() == "" || $("#city_field").val() == "" || $("#zip_field").val() == "") {
            alert("Please fill all the fields");
            return;
        }

        // Generate the object
        jobsite = makeJobsite($("#street_field").val(), $("#city_field").val(), $("#zip_field").val());

        // Show the next dialog
        $("#dc-2").hide();
        $("#dc-3").show();
    })

    $("#next-3").click(function() {
        // If all the fields are filled (wind is optional)
        if ($("#snow_field").val() == "") {
            alert("Please fill all the fields");
            return;
        }

        // Generate the object
        loads = newLoads($("#snow_field").val(), $("#wind_field").val());

        // Show the next dialog
        $("#dc-3").hide();
        $("#dc-4").show();
    })

    $("#next-4").click(function() {
        // If all the fields are filled
        if ($("#span_field").val() == "" || $("#pitch_field").val() == "" || $("#spacing_field").val() == "" || $("#heel_field").val() == "") {
            alert("Please fill all the fields");
            return;
        }

        // Generate the object
        truss = newTruss($("#span_field").val(), $("#pitch_field").val(), $("#spacing_field").val(), $("#heel_field").val());

        // Show the next dialog
        $("#dc-4").hide();
        // $("#dc-4").show();
    })

    $("#prev-2").click(function() {
        $("#dc-2").hide();
        $("#dc-1").show();
    })

    $("#prev-3").click(function() {
        $("#dc-3").hide();
        $("#dc-2").show();
    })

    $("#prev-4").click(function() {
        $("#dc-4").hide();
        $("#dc-3").show();
    })

});
