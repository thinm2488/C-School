

var app = angular.module("user",[]);

app.controller('loginController', function ($scope, $http) {
   
    $scope.dangNhap = function () {

        if (!$scope.sdt) {
            window.alert('Chưa nhập email !')
        }
        else if ($scope.password = '') {
            window.alert('Chưa nhập password !')
        }
        else {
            var data = {
                soDienThoai: $scope.sdt,
                password: $scope.passWord
            }
            $http.post( '/api/route/user/signin', data).then(function (res) {
                window.console.log(res)
                 $scope.tenNguoiDung =res.data.user.tenNguoiDung
              
                    setCookie('role',res.data.user.role );
                    setCookie('email', $scope.Email);
                    setCookie('tenNguoiDung',$scope.tenNguoiDung);
                    setCookie('hinh',res.data.user.hinh);
                    setCookie('id',res.data.user._id);
                    
                    window.location.href = "/Home"
                   
                    checkLogin();
            }).catch(function(res){
                console.log(res)
                window.alert(res.data.errorMessage);
            })
        }
    }
    var checkLogin=function(){

        $scope.role=getCookie('role');
        if(  $scope.role=="gv"){
            window.location.href = "/Home"
        }
        else {
            window.location.href = "/Home/Phuhuynh"
        }
    }
   

});

