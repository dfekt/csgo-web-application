var u = require("./lib/utilities.js")

var admin = function () {

    var url = "admin/api/"

    var printAvailableServersToConsole = function() {
        u.ajax(url + "servers/", null, 'GET', function(err, data){
            console.log(data)
        })
    }

    return {
        init: function() {
            var button = document.querySelector("#button")
            button.addEventListener('click', function(){
                printAvailableServersToConsole()
            })

        }
    }
}()

module.exports = admin
