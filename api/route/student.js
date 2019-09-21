var express = require('express');
var session = require('express-session')
var router = express.Router();
var studentController = require('../controller/studentController');
// var authController = require('../controller/authController');
var jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
const path = require('path');
// var passport = require('../controller/passport').passport
// var multipart = require('connect-multiparty')
// var multipartMiddleware = multipart()
router.post('/getall', async function (req, res) {
    try {
        var list = await studentController.laystudent(req.body);
        res.send({
            list,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})
router.get('/:id', async function (req, res) {
    try {
        var students = await studentController.layChiTietStudent(req.params.id);
        var student = students.student
        res.send({
            student,
            status:200

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }

})
router.post('/create', fileUpload(), async function (req, res) {

    try {
       
        var student
        if (!req.files) {
            student = await studentController.createStudent(req.body);
        }
        else {
            var file = req.files.hinh;
            req.body.hinh = file.name;
            var url = path.join(path.join(__dirname, '../../'), 'public/images/');
            file.mv(url + req.files.hinh.name, async function () {
                student = await studentController.createStudent(req.body);

            })

        }
        res.send({
            student,
            status:200

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});
router.put('/update', fileUpload(), async function (req, res) {

    try {
        
        var student
        if (!req.files) {
            student = await studentController.editProfile(req.body);
        }
        else {
            var file = req.files.hinh;
            req.body.hinh = file.name;
            var url = path.join(path.join(__dirname, '../../'), 'public/images/');
            file.mv(url + req.files.hinh.name, async function () {
                student = await studentController.editProfile(req.body);

            })

        }
        res.send({
            student,
            status:200

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});
router.delete('/:id', async function (req, res) {
    try {
       
        var student = await studentController.xoaStudent(req.params.id);
        res.send({
            status: 200,
            // id: req.params.id
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }



});
module.exports = router;
