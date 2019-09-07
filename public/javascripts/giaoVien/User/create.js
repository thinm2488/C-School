

var app = angular.module("user",[]);

app.controller('userController', function ($scope, $http) {
    $scope.tenNguoiDung = getCookie('tenNguoiDung');
    $scope.hinh = getCookie('hinh');
    var id= getCookie('id');
    $scope.tao = function () {

       
        
            var data = {
                soDienThoai: $scope.SDT,
                password: $scope.password,
                tenNguoiDung: $scope.tenNguoiDung,
                maSoHocSinh:$scope.MSHS,
                idTao:id
            }
            $http.post( '/api/route/user/signup', data).then(function (res) {
                window.console.log(res)
                 $scope.tenNguoiDung =res.data.user.tenNguoiDung
              
                    window.alert("Thành công !!!")
                    window.location.href = "/user/list"
                   
                    // $scope.checkLogin();
            }).catch(function(res){
                console.log(res)
                window.alert(res.data.errorMessage);
            })
        
    }
    // $scope.checkLogin=function(){

    //     $scope.role=getCookie('role');
    //     if(  $scope.role=="gv"){
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
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

