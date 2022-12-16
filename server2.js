const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

//create connection from database
const mysql = require("mysql");
const dbconnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clario'
});


app.get("/user", function(req, res){
    var sql = "select * from register order by username desc";
    dbconnect.query(sql, function (error, rows, fields) {
        var jsonData = JSON.stringify(rows);// array to json
        res.write(jsonData);
        res.end();
    })
});

app.post("/saveuser", function (req, res) {

    var username = req.body.username;
    var password = req.body.password;
    var city = req.body.city;
    var message = req.body.mesage;
   

    var sql = "insert into register(username, password, city, message) values('" + username + "', '" + password + "', '" + city + "','" + message + "')";

    dbconnect.query(sql, function (error, rows, fields) {

        res.write("Record Added Successfully");
        res.end();
    })
});

app.listen(2000, function () {

});