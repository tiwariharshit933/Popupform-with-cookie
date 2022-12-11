//--------------------------------------------------------------------------
//---------------- Popup Close function Start Here --------------------------
$(".close").click(function () {
    $.cookie.raw = true;
    $.cookie($('#fullname').attr('name'), $('#fullname').val());
    $.cookie($('#email').attr('name'), $('#email').val());
    if ($('input.checks').prop('checked')) {
        $('.checks').val('on');
    } else {
        $('.checks').val('off');
    }
    $.cookie($('.checks').attr('name'), $('.checks').val());
    console.log("Cookie added");
    $(".popup").fadeOut(500);
});

//---------------- Popup Close function Ends Here --------------------------
//---------------- Popup Open function on load Start Here --------------------------

$(window).on('load', function () {
    if ($(window).width() < 1000) {
        setTimeout(function () {
            $(".popup").fadeIn(500);
        }, 5000);
    } else {
        $(".popup").fadeIn(500);
    }
});

//---------------- Popup Open function on load Ends Here --------------------------
//---------------- Click Function Start Here --------------------------

$('.submitButton').click(function (e) {
//---------------- Form Validation Start Here --------------------------

    e.preventDefault();
    var name = $("#fullname").val();
    var email = $("#email").val();

    if (name.length == "") {
        alert("Please enter your Name")
        $("#name").focus();
        return false;
    }
    else if (email.length == "") {
        alert("Please enter your Email");
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!filter.test(email)) {
            $("#email").css("border-color", "red");
            $("#email").focus();
            // alert("Please enter your Email");
            return false;
        }
        return false;
    } else if (!$("#checks").is(":checked")) {
        alert("Please select checkbox. This is required.");
        return false;
    }
    else {

//---------------- Object Creation Start Here --------------------------
// get all the inputs into an array.

        var $inputs = $('#myform :input');
        var values = {};
        $inputs.each(function () {
            values[this.name] = $(this).val();
            if ($('input.checks').prop('checked')) {
                values[$('.checks').name] = $('.checks').val('on');
            } else {
                values[$('.checks').name] = $('.checks').val('off');
            }
        });

//---------------- Form Validation Ends Here --------------------------
//---------------- Object Creation Ends Here --------------------------

        Object.keys(values).forEach(key => {
            if (values[key] === null || values[key] === '' || values[key] === undefined) {
                delete values[key];
            }
        });

//---------------- Cookie Creation Start Here --------------------------

        console.log(values);
        $.cookie.raw = true
        $.cookie($('#fullname').attr('name'), $('#fullname').val());
        $.cookie($('#email').attr('name'), $('#email').val());
        $.cookie($('.checks').attr('name'), $('.checks').val());
        console.log("Cookie added");
        $(".popup").fadeOut(500);
        console.log(values.fullname);
        $("input,select,textarea").val("");
        return true;
    }

//---------------- Cookie Creation Ends Here --------------------------

});

//---------------- Click function Ends Here --------------------------
//---------------- Cookie Deletion after page load Start Here --------------------------

$(window).on("unload", function (e) {
    //Destroy cookies here
    $.removeCookie($('#fullname').attr('name'), $('#fullname').val());
    $.removeCookie($('#email').attr('name'), $('#email').val());
    $.removeCookie($('.checks').attr('name'), $('.checks').val());
    console.log("Cookie Removed");
});

//---------------- Cookie Deletion after page load Ends Here --------------------------
//-------------------------------------------------------------------------------------