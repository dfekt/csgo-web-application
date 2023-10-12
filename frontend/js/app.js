/*
var admin = require("./admin.js")
var gather = require("./gather.js")

if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str){
        return this.indexOf(str) === 0
    }
}

window.addEventListener("load", function(){
    if (window.location.pathname.startsWith('/admin')) {
        console.log("admin")
        console.log(admin)
        admin.init()
    } else if (window.location.pathname.startsWith('/gathers')) {
        console.log("gather")
    } else {
        console.log("main")
    }
})
*/
