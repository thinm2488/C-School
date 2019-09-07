var app = angular.module("user", []);

app.controller('indexController', function ($scope, $http) {


        $scope.tenNguoiDung = getCookie('tenNguoiDung');
        $scope.hinh = getCookie('hinh');

        // $scope.role=getCookie('role');
        // if(  $scope.role=="gv"){
        //     window.location.href = "/Home"

        // }
        // else {
        //     window.location.href = "/Home"
        // }
        $scope.logout = function () {


                $http.get('/api/route/user/signout').then(function (res) {
                        if(res.data.status==200){
                         window.alert(res.data.messsage)
                         window.location.href = "/" 
                        }else{
                        window.alert(res.data.errorMessage)
                        }
                        
                })
        }
        $scope.checkrole=function(){
                if(role=="gv"){
                        true
                }else{
                        false
                }
        }



});
