
//fields
var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var now = new Date();
var hours = now.getHours()<10 ? "0"+now.getHours() : now.getHours();
var minutes = now.getMinutes()<10 ? "0"+now.getMinutes() : now.getMinutes();


$(document).ready(function() {

    // createGather FORMS
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        min: new Date()
    });
    $('#startingDate').val(now.getDate() + " " + months[now.getMonth()] + ", " + now.getFullYear());
    $('#startingTime').val(hours+":"+minutes);


    $('select').material_select();

    $('#addGather').on('click', addGather);

    $(".button-collapse").sideNav();

    populateGatherList();
});

function populateGatherList(){

    var listContent = '';

    $.getJSON( '/gathers/gatherlist', function( data ){

        $.each(data, function(){
            listContent += '<a href="/gathers/'+this._id+'" class="collection-item">' + this.name + " - " + this.startingTime + " - " + this.currentPlayers+"/"+this.maxPlayers+'</a></td>';
        })
        $('#gatherList').html(listContent);
    })

}

// Add Gather
function addGather(event) {
    event.preventDefault();

    var dateString = $('#startingDate').val();
    var timeString = $('#startingTime').val();


    // If it is, compile all user info into one object
    var newGather = {
        name: $('#name').val(),
        startingTime: dateString + " " + timeString,
        currentPlayers: 0,
        maxPlayers: parseInt($('#teamSize').val())*2,
        skill: $('#skill').val(),
        user: "email@domain.do",
        dateCreated : new Date()
    }

    // Use AJAX to post the object to our addgather service
    $.ajax({
        type: 'POST',
        data: newGather,
        url: '/gathers/add',
        dataType: 'JSON'
    }).done(function( response ) {
        window.location.replace(response.msg);
    });
};
