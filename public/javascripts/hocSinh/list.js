

var app = angular.module("user", []);

app.controller('studentController', function ($scope, $http) {
    // var id = $scope.xoauser
    $scope.tenNguoiDung = getCookie('tenNguoiDung');
    $scope.hinh = getCookie('hinh');
   
    $scope.laydanhsach=function(){
        var data={
            lop:$scope.lop,
            loai:$scope.loai,
        }
        $http.post('/api/route/student/getall',data).then(function (res) {



            $scope.liststudent = res.data.list.liststudent;
            if($scope.liststudent.length>0){
                $scope.check=true
                $scope.checklist=false
            }
            else{
                $scope.checklist=true
                $scope.check=false
            }
    
        })
    }
   
    $scope.danhSachLop = [
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
        { name: '10', value: '10' },
        { name: '11', value: '11' },
        { name: '12', value: '12' },
       
        
       
    ]
    $scope.lop=$scope.danhSachLop[0].value;
    $scope.danhSachLoai = [
        { name: 'A', value: 'A' },
        { name: 'B', value: 'B' },
        { name: 'C', value: 'C' },
        { name: 'D', value: 'D' },
        { name: 'E', value: 'E' },
        
       
        
       
    ]
    $scope.loai=$scope.danhSachLoai[0].value;
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

