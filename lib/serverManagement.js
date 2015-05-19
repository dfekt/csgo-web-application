var request = require("request")
var config = require("../config.json")


var serverManagement  = function () {

    var call = function (action, body, method, callback) {
        var options = {
            url: config.API_URL + action,
            method: method || 'GET',
            json: body || true
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

    return {
        get_servers: get_servers
    }

}()

var s = serverManagement

s.get_servers(function(err, data) {
    console.log(data)
})
