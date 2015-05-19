var request = require("request")
var util = require("util")
var config = require("../config.json")


var serverManagement  = function () {

    var call = function (action, body, method, callback) {
        var options = {
            url: config.API_URL + action,
            method: method || 'GET',
            json: body || true
        }

        var body_error = {
            "status": "failed"
        }

        request(options, function(err, res, body) {
            if (err)
                return callback(err)

            if (res.statusCode >= 400)
                return (typeof body !== 'object' ? callback(body_error, body) : callback(body))

            if (body === '' || body === undefined)
                return callback(null, {})
            else if (typeof body !== 'object')
                return callback(body_error, body)
            else
                callback(null, body)
        })
    }

    var _get = function(action, callback) {
        call(action, null, 'GET', callback)
    }

    var _post = function(action, body, callback) {
        call(action, body, 'POST', callback)
    }

    var get_servers = function(callback) {
        _get("/servers", callback)
    }

    var start_all = function(callback) {
        _get("/servers/start", callback)
    }

    var stop_all = function(callback) {
        _get("/servers/stop", callback)
    }

    var restart_all = function(callback) {
        _get("/servers/restart", callback)
    }

    var execute_all = function(commands, callback) {
        _post("/servers/execute", commands, callback)
    }

    var start = function(server, callback) {
        _get(util.format("/servers/%s/start", server), callback)
    }

    var stop = function(server, callback) {
        _get(util.format("/servers/%s/stop", server), callback)
    }

    var restart = function(server, callback) {
        _get(util.format("/servers/%s/restart", server), callback)
    }

    var execute = function(server, commands, callback) {
        _post(util.format("/servers/%s/execute", server), commands, callback)
    }

    return {
        get_servers: get_servers,
        start_all: start_all,
        stop_all: stop_all,
        restart_all: restart_all,
        execute_all: execute_all,
        start: start,
        stop: stop,
        restart: restart,
        execute: execute
    }

}()

var s = serverManagement

s.execute("server12", ["say derp", "say merp"],function(err, data) {
    console.log(data)
})
