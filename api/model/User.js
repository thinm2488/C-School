var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
    {
        idTao:{type:String},
        tenNguoiDung: { type: String },
        androidToken: {
          type: String,
          default: ''
      },
        email: { type: String },
        quanHe: [{
            tenHocSinh: {
              type: String
              // default: constants.hinhThucArray.TIEN_MAT,
              // enum: constants.hinhThucArray
            },
            lop: {type:String},
            maSoHocSinh: {type:String},
            diaChi: {type:String},
            

          }],
        soDienThoai: { type: String },
        password: { type: String },
        
        role:  { type: String, default:'ph' },
        hinh:{type:String,default:"hero-bg.jpg"}
        
        

    }
    
);
module.exports=mongoose.model('User',UserSchema)