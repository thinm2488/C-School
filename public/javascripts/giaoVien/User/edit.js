

var app = angular.module("user",[]);

app.controller('userController', function ($scope, $http) {
    var id = $('#id').text();
    $scope.tenNguoiDung = getCookie('tenNguoiDung');
        $scope.hinh = getCookie('hinh');
    $http.get("/api/route/user/"+id).then(function (res) {
        $scope.tenNguoiDung = res.data.user.user.tenNguoiDung;
        $scope.password = res.data.user.user.password
        $scope.MSHS = res.data.user.user.maSoHocSinh;
        $scope.SDT = res.data.user.user.soDienThoai;
      

      
     

     
    });
    $scope.sua = function () {

       
        
            var data = {
                soDienThoai: $scope.SDT,
                password: $scope.password,
                tenNguoiDung: $scope.tenNguoiDung,
                maSoHocSinh:$scope.MSHS,
            }
            $http.put( '/api/route/user/edit', data).then(function (res) {
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
    $scope.xoa = function () {
        $http.delete("/api/route/user/" + id).then(function (res) {


            window.location.href = "/user/list";

            window.alert('Xóa thành công!');

        }).catch(function (res) {
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

