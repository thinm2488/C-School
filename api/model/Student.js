var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
    {
        tenHocSinh: { type: String },
        maSoHocSinh:{type:String},
        gioiTinh: { type: String },
        ngaySinh: { type: String },
        queQuan: { type: String },
        lop: { type: String },
        diaChi: { type: String },
        hinh:{type:String,default:"hero-bg.jpg"}
        
        
        

    }
);
module.exports=mongoose.model('User',UserSchema)