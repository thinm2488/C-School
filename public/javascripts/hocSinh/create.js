

var app = angular.module('user', []);
var formData = new FormData();

app.controller('createController', function ($scope, $http) {

    
   


    $scope.tao = function () {

        formData.append("tenHocSinh", $scope.tenHocSinh);
        formData.append("lop", $scope.lop);
        formData.append("loai", $scope.loai);
        formData.append("gioiTinh", $scope.gioiTinh);
        formData.append("diaChi", $scope.diaChi);
        formData.append("ngaySinh", $scope.ngaySinh);
        formData.append("queQuan", $scope.queQuan);
        $http({
            method: 'POST',
            url: window.location.origin + '/api/route/student/create',
            data: formData,
            headers: { 'Content-Type': undefined }
        }).then(function (res) {
            window.alert('Lưu thông tin thành công');


           window.location.href = "/hocSinh/list";
        }).catch(function (res) {
            console.log(res)
            window.alert(res.data.errorMessage);
        })

    }



    $scope.chooseImage = function () {

        document.getElementById("fileUpdateImage").click()
        setCookie("hinh", document.getElementById("fileUpdateImage"))
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
