// @ts-ignore
import { Route, Controller, Tags, Post, Body, Security, Query, UploadedFile, Get, Put, FormField, Path } from 'tsoa'
import { Request, Response, response } from 'express';
import { IResponse } from '../utils/interfaces.util';
import { findOne, getById, upsert, getAll, findAll, getAlls, getAggregation } from '../helpers/db.helpers';
import clientModel from '../models/client.model';
import logger from '../configs/logger.config';
import { sendEmail } from '../configs/nodemailer';
import { readHTMLFile, getCSVFromJSON, generateRandomOtp } from '../services/utils';
import { validateClientData,} from '../validations/client.validator';

//import { sendNotificationToAdmin } from '../configs/notification.config';
@Tags('Client')
@Route('api/client')
export default class ClientController extends Controller {
    req: Request;
    res: Response;
    userId: string
    constructor(req: Request, res: Response) {
        super();
        this.req = req;
        this.res = res;
        this.userId = req.body.user ? req.body.user.id : ''
    }
    /**
    * Register a client
    */
    @Post("/register")
    public async register(@Body() request: { firstname: string, lastname: string, email: string, fathername: string, age: string, city: string, pincode: string }): Promise<IResponse> {
        try {

            const {  firstname, lastname, email,fathername, age, city, pincode  } = request;
            // const validatedProfile = validateClientData({ firstname, lastname, email,fathername, age, city, pincode });
            // if (validatedProfile.error) {
            //     throw new Error(validatedProfile.error.message)
            // }
            // const userEmail = await findOne(clientModel, { email });
            // if (userEmail) {
            //     throw new Error(`Email ${email} is already exists`)
            // }
           
            const saveResponse = await upsert(clientModel, { firstname, lastname, email,fathername, age, city, pincode  })

                return {
                    data: { ...saveResponse.toObject() },
                    error: '',
                    message: 'User Subscribed Successfully',
                    status: 200
                }
        }
        catch (err: any) {
            logger.error(`${this.req.ip} ${err.message}`)
            return {
                data: null,
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }

    @Security('Bearer')
    @Get("/getusers")
    public async getusers(
        @Query() exportRequest = "false"
    ): Promise<IResponse> {
        try {
            // check for a valid id
            const getResponse = await getAll(clientModel,{});
            if(exportRequest==="true")
            {
                    const csv = getCSVFromJSON(
                        [
                            "Sno",
                            "firstname",
                            "lastname",
                            "email",
                            "fathername",
                            "age",
                            "city",
                            "pincode",
                            "createdAt"
                        ],
                        getResponse.items.map((val, index) => {
                            return {
                                ...val,
                                Sno: index + 1,
                                firstname: val.firstname || "-",
                                lastname: val.lastname || "-",
                                email: val.email || "-",
                                fathername:val.fathername,
                                age:val.age,
                                city:val.city,
                                pincode:val.pincode,
                                createdAt : val.createdAt || "-",
                            };
                        })
                    );
                    this.res.header("Content-Type", "text/csv");
                    this.res.attachment(`user.csv`);
                    return {
                        data: csv,
                        error: "",
                        message: "Csv Created Successfully",
                        status: 200,
                    };
            }

            return {
                data: getResponse || {},
                error: '',
                message: 'All users info fetched Successfully',
                status: 200
            }
        }
        catch (err: any) {
            return {
                data: null,
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }
}

