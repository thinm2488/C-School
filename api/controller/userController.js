const mongoose = require('mongoose');
const User = mongoose.model('User');
// const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
// const smtpTransport=require('nodemailer-smtp-transport')
// var generator=require('generate-password')
const layuser = async function () {
    var listuser = await User.find({role:'ph'});
    return {
        listuser
    }

}
const layChiTietUser = async function (id) {
    var user = await User.findOne({_id:id});
    return {
        user
    }

}
// const islogin = async function (token) {
//     var user = await User.findOne(token:to);
//     return {
//         user
//     }

// }
const taoUser = async function (data) {
    let user = await User.findOne({ soDienThoai: data.soDienThoai });
    if (user) {
        throw new Error('Số điện thoại đã được sử dụng ! ')
    }
    user = new User(data);
    await user.save();
    return {
        user
    }

}

const getUserByPhone = async function (soDienThoai) {
    let user = await User.findOne({ soDienThoai: soDienThoai });
    return user;

}



const checkLogin = async function (data) {
    let user = await User.findOne({ soDienThoai: data.soDienThoai||data });
    if (user) {
        if (user.password === data.password) {
            user.androidToken =data.androidToken
            user.save();
            //saveAndroidToken(data.androidToken);
            return user

        } else {

            throw new Error('Nhập sai Số điện thoại hoặc password!')
        }
    } else {
        throw new Error('Số điện thoại không tồn tại!')
    }

}
const saveAndroidToken = async function(token){
    let user = await User.findOne({ soDienThoai: data.soDienThoai||data });
    if(user){
        if(token){
            user.androidToken =token
            user.save();
        }else{
            throw new Error('Không tìm thấy android Token')
        }
    }
}
const editProfile = async function (data) {
    let user = await User.findOne({ soDienThoai: data.soDienThoai });

    user.soDienThoai = data.soDienThoai;
    if (data.tenNguoiDung) {
        user.tenNguoiDung = data.tenNguoiDung;
    }
    if (data.maSoHocSinh) {
        user.maSoHocSinh = data.maSoHocSinh;
    }
    if (data.hinh) {
        user.hinh = data.hinh;
    }
    

    await user.save();
    return { user }

}
const changePass = async function (data) {
    let user = await User.findOne({ soDienThoai: data.soDienThoai });



    if (user.password === data.oldpassword) {
        user.password = data.newpassword
    }
    else {
        throw new Error('Nhập sai mật khẩu cũ!')
    }
    await user.save();
    return { user }

}

// function uploadImg (soDienThoai, file) {
//     return new Promise((resolve, reject) => {
//         let user = await User.findOne({ soDienThoai: soDienThoai }, function (err, user) {
//         if (err) {
//           console.log(err)
//           return reject(responseStatus.Code500())
//         } else if (!user) {
//           return reject(responseStatus.Code404())
//         } else {
//           let stream = fs.createReadStream(file.path)
//           if (file.name) {
//             if (file.size > 5242880) {
//               return reject(responseStatus.Code401())
//             } else {
//               let s3 = new AWS.S3({ signatureVersion: 'v2' })
//               const name =  './public/images/' 
//               const params = { Bucket: config.aws.bucketName, ACL: 'public-read', Key: name, Body: stream }
//               s3.upload(params, function (err, data) {
//                if (err) {
//                   console.log(err)
//                   return reject(responseStatus.Code500())
//                 } else {
//                   service.photoURL = data.Location
//                   service.save(function (err) {
//                     if (err) {
//                       return reject(responseStatus.Code500())
//                     } else {
//                       return resolve(responseStatus.Code200({ photoURL: data.Location }))
//                     }
//                   })
//                 }
//               })
//             }
//           }
//         }
//       })
//     })
//   }
// const resetPassword = async function (data,host) {
//     let user = await User.findOne({ Email: data.Email });
//     if (!user) {
//         throw new Error('Người dùng không tồn tại!')
//     }
//     var token = jwt.sign({ Email: data.Email }, "secret")
//     var transPorter = nodemailer.createTransport(smtpTransport({
//         service: "gmail",
//         auth: {
//             user: "cinemaproject19@gmail.com",
//             pass: "cinemaproject2019"
//         }
//     }))
//     var mailOption = {
//         from: "cinemaproject19@gmail.com",
//         to: data.Email,
//         subject: "Reset Password",
//         text: "Nhấp vào đường link để thay đổi mật khẩu:\n" + "http://" + host + "/user/resetpassword/" + token
//     }
//     console.log(mailOption)
// return transPorter.sendMail(mailOption);
// }
const changePassword = async function (data) {
    let user = await User.findOne({ Email: data });

    var newpass= generator.generate({
        length:8,
        Number:true
    })
    user.password=newpass;

    
    await user.save();
    return { user, newpass }

}
const xoaUser = async function (id) {
    let user = await User.findOne({ _id: id });
    user.remove();
    return {
        mess:'Xóa thành công!'
    }
}



module.exports = {
    layuser:layuser,
    layChiTietUser:layChiTietUser,
    //islogin:islogin,
    taoUser: taoUser,
   getUserByPhone: getUserByPhone,
    checkLogin: checkLogin,
    editProfile: editProfile,
    xoaUser:xoaUser,
    changePass: changePass,
    // resetPassword: resetPassword,
   // changePassword:changePassword
}


