import express, { Request, Response } from 'express'
import ClientController from '../../controllers/client.controller'
import multerMiddleware from '../../middlewares/multer.middleware'
import { responseWithStatus } from '../../utils/response.util'
const router = express.Router()
router.post('/register', async (req: Request | any, res: Response) => {
    const { firstname, lastname, email,fathername, age, city, pincode } = req.body;
    const controller = new ClientController(req, res)
    const response = await controller.register({  firstname, lastname, email,fathername, age, city, pincode });
    const { status } = response;
    return responseWithStatus(res, status, response)
})
router.get('/getusers', async (req: Request | any, res: Response) => {
    const{exportRequest}=req.query
    const controller = new ClientController(req, res)
    const response = await controller.getusers(exportRequest);
    const { status } = response;
    const { data } = response;
    if (exportRequest === 'true') {
        return res.send(data)
    }
    return responseWithStatus(res, status, response)
})

module.exports = router
