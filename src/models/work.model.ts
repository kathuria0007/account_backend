import { Schema, model } from 'mongoose';
import { LABOUR_WORK_STATUS } from '../constants/app.constants';
const WorkSchemaforLabour = new Schema(
  {
    labourid: { type: String, required: true},
    labourfirstname: { type: String, required: true, default: null },
    labourlastname: { type: String, required: true, trim: true},
    labourage: { type: String, required: true},
    nameofclient: { type: String, required: true},
    clientage: { type: String, required: true},
    clientlocation: { type: String, required: true},
    clientpincode: { type: String, required: true },
    clientcity: { type: String, required: true},
    statusofwork: { type: String, enum: [LABOUR_WORK_STATUS.PENDING, LABOUR_WORK_STATUS.COMPLETED], default: LABOUR_WORK_STATUS.PENDING },
    image:{type:String}
  }, { timestamps: true, versionKey: false }
)
export default model('dailyworkforlabour', WorkSchemaforLabour)



