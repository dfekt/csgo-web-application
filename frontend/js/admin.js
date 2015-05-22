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

    var doServerAction = function(button, action) {
        var call = url + "servers/" + button.parentNode.id + "/" + action
        u.ajax(call, function(err, data){
            console.log(err)
        })
    }

    var updateConsole = function(consoleDiv) {
        var call = url + "servers/" + consoleDiv.previousSibling.id + "/console"
        console.log(call)
        u.ajax(call, function(err, data){
            var pre = "<pre>"

            data.forEach(function(line){
                pre += line
            })

            pre += "</pre>"

            consoleDiv.innerHTML = pre
        })
    }

    return {
        init: function() {

            var consoles = document.querySelectorAll(".console")

            for (var i = 0; i < consoles.length; i++) {
                consoles[i].style.display = "none"
                updateConsole(consoles[i])
            }

            var startBtns = document.querySelectorAll(".startBtn")
            var stopBtns = document.querySelectorAll(".stopBtn")
            var restartBtns = document.querySelectorAll(".restartBtn")
            var consoleBtns = document.querySelectorAll(".consoleBtn")

            // Start buttons
            for (var i = 0; i < startBtns.length; i++) {
                startBtns[i].addEventListener('click', function(event) {
                    doServerAction(this, "start")
                })
            }

            // Stop buttons
            for (var i = 0; i < stopBtns.length; i++) {
                stopBtns[i].addEventListener('click', function(event) {
                    doServerAction(this, "stop")
                })
            }

            // Restart buttons
            for (var i = 0; i < restartBtns.length; i++) {
                restartBtns[i].addEventListener('click', function(event) {
                    doServerAction(this, "restart")
                })
            }

            // Console buttons
            for (var i = 0; i < consoleBtns.length; i++) {
                consoleBtns[i].addEventListener('click', function(event) {
                    toggleConsole(this.parentNode.nextSibling)
                })
            }


            //restartBtns.forEach(function(button){
            //    console.log("all the buttons")
            //    button.addEventListener('click', function(event) {
            //        u.ajax(url + "servers/" + this.parentNode.id + "/restart", function(err, data){
            //            console.log(data)
            //        })
            //    })
            //})


        }
    }
}()

module.exports = admin
