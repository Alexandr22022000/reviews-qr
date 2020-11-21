const express = require("express"),
    bodyParser = require("body-parser"),
    fs = require("fs"),
    path = require("path"),
    { consoleLog } = require("./server/core/logs"),
    router = require("./server/core/router"),
    database = require("./server/core/database"),
    app = express();

app.set("port", process.env.PORT || 5000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

database.init(app);
router(app);
app.use(express.static("build"));

app.get("/*", (req, res) => {
    const stream = fs.createReadStream(path.resolve("build/index.html"));
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    stream.pipe(res);
});

app.listen(app.get("port"), () => consoleLog("Server is starting on port " + app.get("port")));
