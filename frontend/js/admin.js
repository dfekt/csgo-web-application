var u = require("./lib/utilities.js")

var admin = function () {

    var url = "admin/api/"

    var printAvailableServersToConsole = function() {
        u.ajax(url + "servers/", null, 'GET', function(err, data){
            console.log(data)
        })
    }

    var toggleConsole = function (consoleDiv) {
        if (consoleDiv.style.display == "block") {
            consoleDiv.style.display = "none"
        } else {
            consoleDiv.style.display = "block"
        }
    }



    return {
        init: function() {
            var startBtns = document.querySelectorAll(".startBtn")
            var stopBtns = document.querySelectorAll(".stopBtn")
            var restartBtns = document.querySelectorAll(".restartBtn")
            var consoleBtns = document.querySelectorAll(".consoleBtn")

            restartBtns.forEach(function(button){
                button.addEventListener('click', function(event) {
                    u.ajax(url + "servers/" + this.parentNode.id + "/restart", function(err, data){
                        console.log(data)
                    })
                })
            })


        }
    }
}()

module.exports = admin
