var app = angular.module('user', []);
var formData = new FormData();

app.controller('profileController', function ($scope, $http) {

    $http.get(window.location.origin + "/api/route/user/profile").then(function (res) {
        $scope.user = res.data.user;
        setCookie("hinh", res.data.user.hinh)
        setCookie("tenNguoiDung", res.data.user.tenNguoiDung)
        setCookie("role", res.data.user.role)

        $scope.tenNguoiDung = getCookie("tenNguoiDung");
        $scope.hinh = getCookie("hinh");
        $scope.soDienThoai = res.data.user.soDienThoai
        setCookie("SDT", res.data.user.soDienThoai)
    }).catch(function (res) {
        console.log(res)
    })
    $scope.changepassword = function () {
        $scope.SDT=getCookie("SDT");
        var data = {
            oldpassword: $scope.oldpassword,
            newpassword: $scope.newpassword,
            soDienThoai: $scope.SDT
        }
        if (!$scope.oldpassword) {
            window.alert('Chưa nhập password !')
        }
        else if ($scope.passwordconfirm !== $scope.newpassword) {
            window.alert('Xác nhận mật khẩu không đúng !')
        }
        else {
          
            $http.post("/api/route/user/change-password", data).then(function (res) {
                window.alert("Đổi mật khẩu thành công")
                window.location.href = "/"
            }).catch(function (res) {
                console.log(res)
                window.alert(res.data.errorMessage);
            })

        }
    }


    $scope.editProfile = function () {

        formData.append("tenNguoiDung", $scope.tenNguoiDung);
        formData.append("soDienThoai", $scope.soDienThoai);

        $http({
            method: 'POST',
            url: window.location.origin + '/api/route/user/change-avatar',
            data: formData,
            headers: { 'Content-Type': undefined }
        }).then(function (res) {
            window.alert('Lưu thông tin thành công');


            window.location.href = "/phuHuynh/hoso";
        }).catch(function (res) {
            console.log(res)
            window.alert(res.data.errorMessage);
        })

    }



    $scope.chooseImage = function () {

        document.getElementById("fileUpdateImage").click()
        setCookie("hinh", document.getElementById("fileUpdateImage"))
    }
    $scope.logOut = function () {
        $http.get('/api/user/logout').then(function (res) {


            delete_cookie('email');
            window.location.href = "/"
        })

    }
    $scope.check = function () {
        $scope.email = getCookie("email");
        if (!$scope.email) {
            return false;
        }

        return true;


    }
 

});
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
        formData.append("hinh", input.files[0]);


    }
}