var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
    {
        tenNguoiDung: { type: String },
        soDienThoai: { type: String },
        password: { type: String },
        role:  { type: String, default:'gv' },
        hinh:{type:String,default:"hero-bg.jpg"}
        
        

    }
);
module.exports=mongoose.model('Teacher',UserSchema)