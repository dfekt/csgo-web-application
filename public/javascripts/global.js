
//fields
var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var now = new Date();
var hours = now.getHours()<10 ? "0"+now.getHours() : now.getHours();
var minutes = now.getMinutes()<10 ? "0"+now.getMinutes() : now.getMinutes();


$(document).ready(function() {

    //Navigation bar
    $(".button-collapse").sideNav();


    // createGather FORMS
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        min: new Date()
    });
    $('#startingDate').val(now.getDate() + " " + months[now.getMonth()] + ", " + now.getFullYear());
    $('#startingTime').val(hours+":"+minutes);


    $('select').material_select();

    $('.modal-trigger').leanModal();

    $("a.post").click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        var href = this.href;
        var parts = href.split('?');
        var url = parts[0];
        var params = parts[1].split('&');
        var pp, inputs = '';
        for(var i = 0, n = params.length; i < n; i++) {
            pp = params[i].split('=');
            inputs += '<input type="hidden" name="' + pp[0] + '" value="' + pp[1] + '" />';
        }
        $("body").append('<form action="'+url+'" method="post" id="poster">'+inputs+'</form>');
        $("#poster").submit();
    });
});

