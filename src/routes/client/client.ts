import express, { Request, Response } from 'express'
import ClientController from '../../controllers/client.controller'
import multerMiddleware from '../../middlewares/multer.middleware'
import { responseWithStatus } from '../../utils/response.util'
import { authenticateClient } from '../../controllers/auth.middleware'
const router = express.Router()
router.post('/register', async (req: Request | any, res: Response) => {
    const { firstname, lastname, email,fathername, age, city, pincode ,password} = req.body;
    const controller = new ClientController(req, res)
    const response = await controller.register({  firstname, lastname, email,fathername, age, city, pincode,password });
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
router.post('/login', async (req: Request | any, res: Response) => {
    const { email, password,device_type,device_token} = req.body;
    const controller = new ClientController(req, res)
    const response = await controller.login({ email, password,device_type,device_token });
    const { status } = response;
    return responseWithStatus(res, status, response)
})
router.get('/me', authenticateClient, async (req: Request | any, res: Response) => {
    const controller = new ClientController(req, res)
    const response = await controller.me();
    const { status } = response;
    return responseWithStatus(res, status, response)
})
module.exports = router
