const fs = require("fs"),
    request = require("request"),
    path = require("path");

let defaultServer = 'http://127.0.0.1:5000/classify'

module.exports.getTestData = function () {
    let list = fs.readFileSync(path.resolve(__dirname, "dataset/flower_labels.csv"), "utf8")
    return list.split("\n").slice(1).map(line => {
        return {
            "file": line.split(",")[0],
            "label": line.split(",")[1]
        }
    })
}

module.exports.testImg = function (img, server, cb) {
    if (typeof server === "function") {
        cb = server
        server = defaultServer
    }


    request.post(server, {
        formData: {
            file: fs.createReadStream(path.resolve(__dirname, "dataset", img))
        }
        ,proxy:'http://localhost:8888'
    }, cb)

}