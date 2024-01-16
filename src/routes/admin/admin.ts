import express, { Request, Response } from 'express'
import AdminController from '../../controllers/admin.controller'
import multerMiddleware from '../../middlewares/multer.middleware'
import { responseWithStatus } from '../../utils/response.util'
const router = express.Router()
router.post('/createworkforlabour', async (req: Request | any, res: Response) => {
    const {labourfirstname, labourlastname,labourage,labouremail,nameofclient,clientage,clientlocation, clientpincode,clientcity} = req.body;
    const controller = new AdminController(req, res)
    const response = await controller.createworkforlabour({labourfirstname, labourlastname,labourage,labouremail,nameofclient,clientage,clientlocation, clientpincode,clientcity});
    const { status } = response;
    return responseWithStatus(res, status, response)
})
router.get('/getalllabourworks', async (req: Request | any, res: Response) => {
    const { id ,search} = req.query
    const controller = new AdminController(req, res)
    const response = await controller.getalllabourworks(id,search);
    const { status } = response;
    return responseWithStatus(res, status, response)
})
module.exports = router
