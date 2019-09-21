const mongoose = require('mongoose');
const Student = mongoose.model('Student');
// const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const createStudent = async function (data) {
    // let student = await Student.findOne({ maSoHocSinh: data.maSoHocSinh });
    // if (student) {
    //     throw new Error('Mã số đã được sử dụng ! ')
    // }
    student = new Student(data);
    await student.save();
    return {
        student
    }

}
const laystudent = async function () {
    var liststudent = await Student.find();
    return {
        liststudent
    }

}
const layChiTietStudent = async function (id) {
    var student = await Student.findOne({_id:id});
    return {
        student
    }

}
const editProfile = async function (data) {
    let student = await Student.findOne({ _id: data.id });

   
    if (data.tenHocSinh) {
        student.tenHocSinh = data.tenHocSinh;
    }
    if (data.lop) {
        student.lop = data.lop;
    }
    if (data.loai) {
        student.loai = data.loai;
    }
    if (data.diaChi) {
        student.diaChi = data.diaChi;
    }
    if (data.ngaySinh) {
        student.ngaySinh = data.ngaySinh;
    }
    if (data.queQuan) {
        student.queQuan = data.queQuan;
    }
    if (data.hinh) {
        student.hinh = data.hinh;
    }
    

    await student.save();
    return { student }

}
const xoaStudent = async function (id) {
    let student = await Student.findOne({ _id: id });
    student.remove();
    return {
        mess:'Xóa thành công!'
    }
}
module.exports={
    createStudent:createStudent,
    laystudent:laystudent,
    layChiTietStudent:layChiTietStudent,
    editProfile:editProfile,
    xoaStudent:xoaStudent
}