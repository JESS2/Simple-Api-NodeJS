/**
 * Simple Resume Web With Node.js
 */

'use strict';

const express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 9212,
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'dusl8753',
        port: 3306,
        database: 'STUDY'
    });

connection.connect();

app.use('/assets', express.static(__dirname + '/view'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, function () {
    console.log('Start Server through ' + port);
});

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, './view')});
    console.log('CONNECTION GET');
});

//리스트 불러오기
app.get('/user', function (req, res) {
    console.log('CONNECTION GET - /user');

    let getInfoOfUser_q = 'SELECT * FROM `STUDY`.`USER` ORDER BY `id` DESC;';
    let getInfoOfUser = connection.query(getInfoOfUser_q, function (getInfoOfUserErr, getInfoOfUserResult) {
        if (getInfoOfUserErr) {
            throw new Error(getInfoOfUserErr);
        }

        res.json(getInfoOfUserResult);
        return console.log(getInfoOfUserResult);
    });
});

//리스트 삽입
app.post('/user', function (req, res) {
    console.log('CONNECTION POST - /user');

    let setNewUser_q = 'INSERT INTO `STUDY`.`USER` (`user_id`, `user_name`) VALUES ("' + req.body.user_id + '", "' + req.body.user_name + '") ;';
    let setNewUser = connection.query(setNewUser_q, function (setNewUserErr) {
        if (setNewUserErr) {
            throw new Error(setNewUserErr);
        }

        res.json({'result': 'Y'});
        return console.log({'result': 'Y'});
    });
});

//리스트 삭제
app.delete('/user', function (req, res) {
    console.log('CONNECTION DELETE - /user');

    let delUser_q = 'DELETE FROM `STUDY`.`USER` WHERE (`user_id` = "' + req.body.user_id + '") ORDER BY `id` DESC LIMIT 1;';
    let delUser = connection.query(delUser_q, function (delUserErr) {
        if (delUserErr) {
            throw new Error(delUserErr);
        }

        res.json({'result': 'Y'});
        return console.log({'result': 'Y'});
    });
});
