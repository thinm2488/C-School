

var app = angular.module('user', []);
var formData = new FormData();

app.controller('profileController', function ($scope, $http) {

    
   


    $scope.create = function () {

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
