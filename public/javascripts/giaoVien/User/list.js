

var app = angular.module("user", []);

app.controller('userController', function ($scope, $http) {
    var id = $scope.xoauser
    $scope.tenNguoiDung = getCookie('tenNguoiDung');
    $scope.hinh = getCookie('hinh');
    $http.get('/api/route/user/getall').then(function (res) {



        $scope.listuser = res.data.list.listuser;

    })
    
    
    $scope.checkrole=function(){
        var role=getCookie("role")
        if(role=="gv"){
              return  true
        }else{
              return  false
        }}
    
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
});

