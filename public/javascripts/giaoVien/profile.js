var app = angular.module('user', []);
var formData= new FormData();

app.controller('profileController', function ($scope, $http) {
    
    $http.get(window.location.origin+"/api/route/user/profile").then(function(res){
         $scope.user= res.data.user;
         setCookie("hinh",res.data.user.hinh)
         setCookie("tenNguoiDung",res.data.user.tenNguoiDung)
         setCookie("role",res.data.user.role)
    $scope.tenNguoiDung=getCookie("tenNguoiDung");
    $scope.hinh=getCookie("hinh");
        $scope.soDienThoai=res.data.user.soDienThoai
        }).catch(function(res){
        console.log(res)
    })
//     $scope.changePassword=function(){
//         if(!$scope.oldPassword){
//             window.alert('Chưa nhập password !')
//         }
//         else if($scope.confirmPassword!==$scope.newPassword){
//             window.alert('Xác nhận mật khẩu không đúng !')
//         }
//         else{
//             $scope.Email=getCookie("email");
//         var data={
//             oldPassword:$scope.oldPassword,
//             newPassword:$scope.newPassword,
//             Email:$scope.Email
//         }
//         $http.put("/api/user/password",data).then(function(res){
//             window.alert("Đổi mật khẩu thành công")
//             window.location.href="/"
//         }).catch(function(res){
//             console.log(res)
//             window.alert(res.data.errorMessage);
//         })
    
//     }
// }

     
$scope.editProfile = function () {
       
    formData.append("tenNguoiDung",$scope.tenNguoiDung);
    formData.append("soDienThoai", $scope.soDienThoai);

    $http({
        method: 'PUT',
        url: window.location.origin+'/api/route/user/',
        data: formData,
        headers: { 'Content-Type': undefined }
    }).then(function (res) {
        window.alert('Lưu thông tin thành công');
     
        
        window.location.href = "/hoso";
    }).catch(function (res) {
        console.log(res)
        window.alert(res.data.errorMessage);
    })
   
}


$scope.chooseImage=function(){

    document.getElementById("fileUpdateImage").click()
    setCookie("hinh",  document.getElementById("fileUpdateImage"))
}   
    $scope.logOut = function(){
        $http.get('/api/user/logout').then(function (res) {

            
               delete_cookie('email');
               window.location.href="/"
            })

    }
    $scope.checkrole=function(){
        var role=getCookie("role")
        if(role=="gv"){
              return  true
        }else{
              return  false
        }}
    $scope.checkrole=function(){
        var role=getCookie("role")
        if(role=="gv"){
                true
        }else{
                false
        }
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
        formData.append("hinh",input.files[0]);
               
         
    }
}