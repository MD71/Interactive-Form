$(document).ready(function () {
    /*Focuses on name field on initial load*/
    $("#name").focus();
    /*Hides other field*/
    $("#other-title").hide();
    $('#title').change(function () {
        let selected = $(this).val();
        if (selected == 'other') {
            $('#other-title').slideDown();
        } else {
            $('#other-title').slideUp();
        }
    });

    /*************************************************** 
     * T-Shirt SECTION
     ***************************************************/
    // Hide the “Select Theme” `option` element in the “Design” menu.
    $('#design option[value="select-theme"]').attr('disabled', true).attr('hidden', true);

    //Update the “Color” field to read “Please select a T - shirt theme”.
    const selectTheme = new Option("Please select a T-shirt theme", "select-theme-first");
    $('#color').prepend(selectTheme);
    //Make selectTheme default option
    $('#color option[value="select-theme-first"]').attr("selected", true);
    //Once option is selected selectTheme disappears
    $('#color option[value="select-theme-first"]').attr('hidden', true);

    //● Hide the colors in the “Color” drop down menu.
    $('#color option').hide();

    //This is executing change function anytime design selection is made.
    $('#design')
        .change(function () {
            //Colors for JS Puns
            const cornflowerblue = $('#color option[value ="cornflowerblue"]');
            const gold = $('#color option[value="gold"]');
            const darkslategrey = $('#color option[value ="darkslategrey"]');
            //Colors for heart JS
            const tomato = $('#color option[value ="tomato"]');
            const steelblue = $('#color option[value ="steelblue"]');
            const dimgrey = $('#color option[value ="dimgrey"]');

            const target = $('#design option:selected').val();

            if (target === "js puns") {
                gold.show();
                darkslategrey.show();
                cornflowerblue.show();
            } else {
                gold.hide();
                darkslategrey.hide();
                cornflowerblue.hide();
            }
            if (target === "heart js") {
                tomato.show();
                steelblue.show();
                dimgrey.show();
            } else {
                tomato.hide();
                steelblue.hide();
                dimgrey.hide();
            }
        });
    /*************************************************** 
     * REGISTER SECTION
     ***************************************************/
    const totalCostText = '<p></p>'; //a new element to store total cost of activities  
    let totalCost = 0;
    $('.activities').append(totalCostText); //append new element 


    $('.activities').change(function (e) {
        const clicked = e.target;
        //get cost make it number
        let clickedCost = $(clicked).attr('data-cost');
        clickedCost = clickedCost.match(/\d+/g);
        clickedCost = parseInt(clickedCost, 10);
        const isItChecked = $(clicked).is(':checked');

        if (isItChecked) {
            totalCost += clickedCost;
        } else {
            totalCost -= clickedCost;
        }
        $('p').text(`Total: $ ${totalCost}`); //add text with total cost to h2 created above
        // console.log("total cost" + " " + totalCost);

        //Start of day and time:
        //holds time for each clicked input
        const clickedTime = $(clicked).attr('data-day-and-time');
        //holds checkbox elements
        const checkboxes = document.querySelectorAll('.activities input');

        for (i = 0; i <= checkboxes.length; i++) {
            //gets time for each checkbox
            const checkboxTime = $(checkboxes[i]).attr('data-day-and-time');
            if (checkboxTime === clickedTime) {
                if (isItChecked) {
                    checkboxes[i].disabled = true; // disables anything equal to checked input
                    $(clicked).prop("disabled", false); //enables initial checked input
                } else if (!isItChecked) {
                    checkboxes[i].disabled = false;
                }

            };

        };

    });
    /*************************************************** 
     * PAYMENT SECTION
     ***************************************************/

    //Makes credit card default option:
    $('#payment option[value="credit card"]').attr("selected", true);
    //Hides select payment method:
    $('#payment option[value = "select method"]').hide();
    //Hides All other payment options by default
    $('#paypal').hide();
    $('#bitcoin').hide();
    $('#payment')
        .change(function () {
            const target = $('#payment option:selected').val();
            const payPal = "paypal";
            const bitcoin = "bitcoin";

            if (target === payPal) {
                $('#credit-card').hide();
                $('#bitcoin').hide();
                $('#paypal').show();
                $("#cc-num").prop('required', false);


            } else if (target === bitcoin) {
                $('#credit-card').hide();
                $('#paypal').hide();
                $('#bitcoin').show();
            } else {
                $('#credit-card').show();
                $('#paypal').hide();
                $('#bitcoin').hide();

            }

        });

    /*************************************************** 
     * Validate Name
     ***************************************************/
    function validNameField() {
        const validName = /^[a-zA-Z ]+$/
        // Check field for input. If no input, an error message in the form of 
        // a red border is given.
        $('fieldset input#name').keyup(function () {
            if ($('input#name').val() !== "" && validName.test($('input#name').val())) {
                $('label[for="name"]').css('color', '');
                $('input#name').css('border', '');
            }
        });

        if ($('input#name').val() == "" ) {
            $(' label[for="name"]').css('color', 'red');
            $('input#name').css('border', 'red 2px solid');
            $('input#name').focus();
            return false;
        }

        return true;
    }
    /*************************************************** 
     * Validate Email
     ***************************************************/
    function validEmailField() {

        // Create reg expr then test if input is valid
        const validEmail = /^[^@]+@[^@.]+\.[a-z]+$/i;

        $('fieldset input#mail').keyup(function () {
            if ($('input#mail').val() !== "" && validEmail.test($('input#mail').val())) {
                $('label[for=mail]').css('color', '');
                $('input#mail').css('border', '');
            }
        });

        //  Remove error on keyup when user inputs formated email.
        $('input#mail').keyup(function () {
            if (validEmail.test($('input#mail').val()) && $('input#name').val() !== "") {
                $('.error').remove();
            }
        });

        // Add Border Color of Red if it doesn't match
        if ($('input#mail').val() == "") {
            $('label[for=mail]').css('color', 'red');
            $('input#mail').css('border', 'red 2px solid');
            return false;
        }

        return true;
    }
    /*************************************************** 
     * Validate Activity Section
     ***************************************************/
    function validActivity() {
        const mailExist = $('input#mail').val() !== "";
        const nameExist = $('input#name').val() !== "";
        const activityDoesNotExist = $('.activities input[type=checkbox]').prop('checked') === false;

        if (activityDoesNotExist && mailExist && nameExist) {
            $('input[type=checkbox]').focus();
        }
        $('.activities input[type=checkbox]').click(function (event) {
            if ($(event.target).prop('checked')) {
                $('.activities legend').css('color', '');
            }
        });
        if ($('.activities input[type=checkbox]').prop('checked') === false) {
            $('.activities legend').css('color', 'red');
            return false;
        }
        return true;
    }
    /*************************************************** 
     * Validate CC 
     ***************************************************/
    function validCreditCard() {
        const ValidCC = /^[0-9]{13,16}$/; // CC Regex
        const cvv = /^\d{3}$/; // CVV regex
        const ValidZip = /^\d{5}$/; // Zip Code Regex

        if ($('#payment').val() == 'credit card') {

            //CC Validation
            $('input#cc-num').keyup(function () {
                if (ValidCC.test($('input#cc-num').val())) {
                    $('label[for="cc-num"]').css('color', '');
                    $('input#cc-num').css('border', '');
                    $('div .cc-error').hide();
                    $('div .cc-error-x').hide();
                } else {
                    $('label[for="cc-num"]').css('color', 'red');
                    $('input#cc-num').css('border', 'red 2px solid');
                    $('div .cc-error').show();
                    $('div .cc-error-x').hide();
                }
                if ($('input#cc-num').val().length > 16) {
                    $('div .cc-error').hide();
                    $('div .cc-error-x').show();
                }
            });

            //Zip Code Validation
            $('input#zip').keyup(function () {
                if (ValidZip.test($('input#zip').val())) {
                    $('label[for="zip"]').css('color', '');
                    $('input#zip').css('border', '');
                    $('div .zip-error').hide();
                } else {
                    $('label[for="zip"]').css('color', 'red');
                    $('input#zip').css('border', 'red 2px solid');
                    $('div .zip-error').show();
                }
                if ($('input#zip').val().length < 5 || $('input#zip').val().length > 5) {
                    $('div .zip-error').show();
                }
            });

            //Cvv Validation
            $('input#cvv').keyup(function () {
                if (cvv.test($('input#cvv').val())) {
                    $('label[for="cvv"]').css('color', '');
                    $('input#cvv').css('border', '');
                    $('div .cvv-error').hide();
                } else {
                    $('label[for="cvv"]').css('color', 'red');
                    $('input#cvv').css('border', 'red 2px solid');
                    $('div .cvv-error').show();
                }
                if ($('input#cvv').val().length > 3 || $('input#cvv').val().length < 3) {
                    $('div .cvv-error').show();
                }
            });

        }

        if ($('#payment').val() == 'paypal' || $('#payment').val() == 'bitcoin') {
            return true;
        }

        // If validation fails stop
        if ($('#payment').val() == 'credit card') {
            if (!ValidCC.test($('input#cc-num').val()) && !ValidZip.test($('input#zip').val()) && !cvv.test($('input#cvv').val())) {
                $('#credit-card div label').css('color', 'red');
                $('#credit-card input').css('border', 'red 2px solid');
                return false;
            }
        }
        if (!ValidCC.test($('input#cc-num').val())) {
            $('label[for="cc-num"]').css('color', 'red');
            $('input#cc-num').css('border', 'red 2px solid');
            return false;
        }
        if (!ValidZip.test($('input#zip').val())) {
            $('label[for="zip"]').css('color', 'red');
            $('input#zip').css('border', 'red 2px solid');
            return false;
        }
        if (!cvv.test($('input#cvv').val())) {
            $('label[for="cvv"]').css('color', 'red');
            $('input#cvv').css('border', 'red 2px solid');
            return false;
        }

        return true;
    }


    function validateUserFields() {

        //Load functions into single one
        console.log(validNameField());
        console.log(validEmailField());
        console.log(validActivity());
        console.log(validCreditCard());

        if (validNameField() && validEmailField() && validActivity() && validCreditCard()) {
            return true;
        } else {
            return false;
        }
    }

    //Validates form when 'register is clicked'
    $('form').submit(function (event) {
        if (validateUserFields()) {
            return true;
        } else {
            event.preventDefault(); //return false;
        }
    })
});