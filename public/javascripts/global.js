




$(document).ready(function() {

    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var now = new Date();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        min: new Date()
    });
    $('#startingDate').val(now.getDate() + " " + months[now.getMonth()] + ", " + now.getFullYear());

    var hours = now.getHours()<10 ? "0"+now.getHours() : now.getHours();
    var minutes = now.getMinutes()<10 ? "0"+now.getMinutes() : now.getMinutes();

    $('#startingTime').val(hours+":"+minutes);


    $('select').material_select();
});