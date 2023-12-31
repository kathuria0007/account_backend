import { Schema, model } from 'mongoose';

const ClientSchema = new Schema(
  {
    firstname: { type: String, required: true, default: null },
    lastname: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true },
    fathername: { type: String, required: true},
    age: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    city: { type: String, default: null },
    pincode: { type: String, required: false, defalut: null },
    device_type: { type: [String],default:null },
    device_token: { type: [String],default:null },
  }, { timestamps: true, versionKey: false }

)
export default model('clients', ClientSchema)



