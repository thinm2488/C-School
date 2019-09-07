var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Home', function(req, res, next) {
  res.render('Home', { title: 'Sign-in' });
});
router.get('/user/create', function(req, res, next) {
  res.render('giaoVien/User/create', { title: 'Create new user' });
});
router.get('/user/list', function(req, res, next) {
  res.render('giaoVien/User/list', { title: 'Create new user' });
});
router.get('/giaoVien/hoso', function(req, res, next) {
  res.render('giaoVien/profile', { title: 'Ho-so' });
});
router.get('/user/:id', function(req, res, next) {
  var id = req.params.id;


  res.render('giaoVien/User/edit', { id:id });
});

router.get('/thongbao', function(req, res, next) {
  res.render('giaoVien/notification/list', { title: 'Ho-so' });
});

router.get('/thongbao/tao', function(req, res, next) {
  res.render('giaoVien/notification/create', { title: 'Ho-so' });
});

router.get('/thongbao/sua', function(req, res, next) {
  res.render('giaoVien/notification/edit', { title: 'Ho-so' });
});

router.get('/thongbao/:id', function(req, res, next) {
  var id = req.params.id;


  res.render('giaoVien/notification/edit', { id:id });
});



router.get('/Home/Phuhuynh', function(req, res, next) {
  res.render('phuHuynh/Home', { title: 'Sign-in' });
});
router.get('/phuHuynh/hoso', function(req, res, next) {
  res.render('phuHuynh/profile', { title: 'Ho-so' });
});
router.get('/hoso', function(req, res, next) {
  res.render('hocsinh/hoso', { title: 'Hồ sơ học sinh' });
});
router.get('/bangdiem', function(req, res, next) {
  res.render('hocsinh/bangdiem', { title: 'Bảng điểm' });
});
router.get('/thoikhoabieu', function(req, res, next) {
  res.render('hocsinh/thoikhoabieu', { title: 'Thời khóa biểu' });
});
router.get('/chuyencan', function(req, res, next) {
  res.render('hocsinh/chuyencan', { title: 'Chuyên cần' });
});
// router.get('/Teacher/home', function(req, res, next) {
//   res.render('giaovien/index', { title: 'Sign-in' });
// });
module.exports = router;
