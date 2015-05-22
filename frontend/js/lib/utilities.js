var request = require('browser-request')

var utilities = function () {
    var ajax = function (action, body, method, callback) {
        var options = {
            url: "/" + action,
            method: method || 'GET',
            json: body || true
        }

        var body_error = {
            "status": "failed"
        }

        request(options, function(err, res, body) {
            console.log(callback)
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

    return {
        ajax: ajax
    
    
    }
}()

module.exports = utilities
