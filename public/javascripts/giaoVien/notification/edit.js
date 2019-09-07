

var app = angular.module("user", []);

app.controller('notiController', function ($scope, $http) {
    
    var id = $('#id').text();
    //$scope.notifications=[];
    $scope.tenNguoiDung = getCookie('tenNguoiDung');
    $scope.hinh = getCookie('hinh');
    $http.get('/api/route/notification/'+id).then(function (res) {
        $scope.noti = res.data.noti;
        setCookie('idfirebase',res.data.noti.idfirebase);
        $scope.noiDung=res.data.noti.noiDung;
        $scope.chuDe=res.data.noti.chuDe;
        $scope.idTao=res.data.user._id;
      

 
    var firebaseConfig = {
        apiKey: "AIzaSyBCon2O9GDH82NiGHI5E5gs64HEyV9sDf0",
        authDomain: "c-school-apps.firebaseapp.com",
        databaseURL: "https://c-school-apps.firebaseio.com",
        projectId: "c-school-apps",
        storageBucket: "",
        messagingSenderId: "353430333264",
        appId: "1:353430333264:web:ea7d5f99891fa0d0"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      //listenFirebase();

      idFirebase=getCookie('idfirebase')
      $scope.sua= function(){
          if( $scope.tenNguoiDung!=null){
              var today = new Date();
              var time =  today.getTime();;
             
              
                var dbRef = firebase.database().ref();
                var dbNoti = dbRef
                
                .child("notifications/" +   $scope.idTao + "/"+ idFirebase);
                dbNoti.set({
                    _id: idFirebase,
                    ngaytao: time,
                    nguoiTao:$scope.tenNguoiDung,
                    hinh: $scope.hinh,
                    noiDung:$scope.noiDung,
                    chuDe  : $scope.chuDe,
                    
                    
                });
            
                window.alert("Sửa tin tức thành công!!");
                suanoti( idFirebase,time,$scope.tenNguoiDung,$scope.hinh,$scope.noiDung,$scope.chuDe);
                    setTimeout(function () {
                window.location.href="/thongbao"

              }, 3000)
              
          }
        
         
         
        //  var comment = document.getElementById("exampleFormControlTextarea1").value;
        
      }
      $scope.xoa= function(){
        if( $scope.tenNguoiDung!=null){
            var today = new Date();
        
           
            
              var dbRef = firebase.database().ref();
              dbRef .child("notifications/" +   $scope.idTao + "/"+ idFirebase).remove();
           
          
              window.alert("Xóa thành công");
              xoanoti( idFirebase);
                  setTimeout(function () {
              window.location.href="/thongbao"

            }, 3000)
            
        }
      
       
       
      //  var comment = document.getElementById("exampleFormControlTextarea1").value;
      
    }
      
      


        function suanoti (id,thoiGiantao,nguoiTao,hinh,noiDung,chuDe) {

       
        
            var data = {
                idfirebase:id,
                gioTao: thoiGiantao,
                nguoiTao:nguoiTao,
                hinh: hinh,
                noiDung:noiDung,
                chuDe  : chuDe
            }
            $http.put( '/api/route/notification/edit', data).then(function (res) {
               
                 $scope.notifications =res.data
              
                   
                   
            }).catch(function(res){
                console.log(res)
                window.alert(res.data.errorMessage);
            })
        
    }
    function xoanoti (id) {

       
        
      
        $http.delete( '/api/route/notification/'+id).then(function (res) {
           
            
          
               
               
        }).catch(function(res){
            console.log(res)
            window.alert(res.data.errorMessage);
        })
    
}
})
        $scope.checkrole=function(){
            var role=getCookie("role")
            if(role=="gv"){
                  return  true
            }else{
                  return  false
            }}
});

