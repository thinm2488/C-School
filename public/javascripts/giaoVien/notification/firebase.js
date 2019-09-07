

var app = angular.module("user", []);

app.controller('notiController', function ($scope, $http) {
    var id = getCookie('id')
    
    //$scope.notifications=[];
    $scope.tenNguoiDung = getCookie('tenNguoiDung');
    $scope.hinh = getCookie('hinh');

    const firebaseConfig = {
        apiKey: "AIzaSyBCon2O9GDH82NiGHI5E5gs64HEyV9sDf0",
        authDomain: "c-school-apps.firebaseapp.com",
        databaseURL: "https://c-school-apps.firebaseio.com",
        projectId: "c-school-apps",
        storageBucket: "c-school-apps.appspot.com",
        messagingSenderId: "353430333264",
        appId: "1:353430333264:web:ea7d5f99891fa0d0"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //listenFirebase();

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }




    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    $scope.tao = function () {
        if ($scope.tenNguoiDung != null) {
            var today = new Date();
            var time = today.getTime();;
            var _id = makeid(15);
            var dbRef = firebase.database().ref();
            var dbNoti = dbRef
            
                .child("notifications/" + id + "/" + _id);
            dbNoti.set({
                _id: _id,
                ngaytao: time,
                nguoiTao: $scope.tenNguoiDung,
                hinh: $scope.hinh,
                noiDung: $scope.noiDung,
                chuDe: $scope.chuDe,
                IsBadge: false,

            });
           
            window.alert("Thêm thông báo thành công");
            taonoti(_id, time, $scope.tenNguoiDung, $scope.hinh, $scope.noiDung, $scope.chuDe)
            setTimeout(function () {
                window.location.href="/thongbao"

              }, 3000)
           
        } else {
            window.alert("Vui lòng đăng nhập để đăng bình luận")
        }
        //  var comment = document.getElementById("exampleFormControlTextarea1").value;
       
    }






    function taonoti(id, thoiGiantao, nguoiTao, hinh, noiDung, chuDe) {



        var data = {
            idfirebase: id,
            gioTao: thoiGiantao,
            nguoiTao: nguoiTao,
            hinh: hinh,
            noiDung: noiDung,
            chuDe: chuDe
        }
        $http.post('/api/route/notification/create', data).then(function (res) {

            $scope.notifications = res.data



        }).catch(function (res) {
            console.log(res)
            window.alert(res.data.errorMessage);
        })

    }
    $scope.checkrole = function () {
        var role = getCookie("role")
        if (role == "gv") {
            return true
        } else {
            return false
        }
    }
});

