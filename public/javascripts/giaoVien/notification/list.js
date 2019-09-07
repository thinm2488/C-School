

var app = angular.module("user", []);

app.controller('notiController', function ($scope, $http) {
    var id=getCookie('id')
    $scope.tenNguoiDung = getCookie('tenNguoiDung');
    $scope.hinh = getCookie('hinh');
    $http.get('/api/route/notification/').then(function (res) {
        $scope.listnoti = res.data.listnoti;
    
        
          
          
          

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


