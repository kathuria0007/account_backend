import { Route, Controller, Tags, Post, Body, Get, Security, Query, Put, FormField, UploadedFile, UploadedFiles, Delete } from 'tsoa'
import { IResponse } from '../utils/interfaces.util';
import { Request, Response } from 'express'
import { findOne, getById, upsert, getAll, getAggregation, deleteById, findAll } from '../helpers/db.helpers';
import { verifyHash, signToken, genHash } from '../utils/common.util';
import logger from '../configs/logger.config';
import path from 'path';
import handlebar, { parse } from 'handlebars'
import tokenModel from '../models/token.model';
import DailyWorkModel from '../models/work.model';
import LabourModel from '../models/client.model';
import mongoose from "mongoose";

@Tags('Admin')
@Route('api/admin')
export default class AdminController extends Controller {
    req: Request;
    res: Response;
    userId: string
    constructor(req: Request, res: Response) {
        super();
        this.req = req;
        this.res = res;
        this.userId = req.body.user ? req.body.user.id : ''
    }

    @Security('Bearer')
    @Post("/createworkforlabour")
    public async createworkforlabour(
        @Body() request: {labourfirstname: string, labourlastname: string,labourage: string,labouremail:string,nameofclient: string,clientage:string,clientlocation: string, clientpincode: string,clientcity: string}
        ): Promise<IResponse> {
        try {
            const{labourfirstname, labourlastname,labourage,labouremail,nameofclient,clientage,clientlocation, clientpincode,clientcity}=request;
            let payload :any ={};
            //find the labour _id;
            const labour=await findOne(LabourModel,{email:labouremail});
            const labourid=labour._id;
            payload.labourid=labourid;
            if(labourfirstname)
            {
                payload.labourfirstname=labourfirstname;
            }
            
            if(labourlastname)
            {
                payload.labourlastname=labourlastname;
            }
            if(labourage)
            {
                payload.labourage=labourage;
            }
            if(nameofclient)
            {
                payload.nameofclient=nameofclient;
            }
            if(clientage)
            {
                payload.clientage=clientage;
            }
            if(clientlocation)
            {
                payload.clientlocation=clientlocation;
            }
            if(clientpincode)
            {
                payload.clientpincode=clientpincode;
            }
            if(clientcity)
            {
                payload.clientcity=clientcity;
            }
            const response=await upsert(DailyWorkModel,payload);
            return {
                data: { response },
                error: '',
                message: 'Work of Labour ',
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
    //get all labour works..
    @Security("Bearer")
    @Get("/getalllabourworks")
    public async getalllabourworks(@Query() id?: string,@Query() search?: string,): Promise<IResponse> {
      try {

        let payload: any = {};
        if (search) {
            payload = {
                $or:[
                    {labourfirstname:{$regex:search,$options:'i'}},
                    {statusofwork:{$regex:search,$options:'i'}}
                ]
            }
        }
        if(id)
        {
            let worksforlabour = await findOne(DailyWorkModel, { labourid: new mongoose.Types.ObjectId(id) });            
            return  {
                data: worksforlabour,
                error: "",
                message: "Work of labour fetched successfully individualy",
                status: 200,
              };
        }
        let worksforlabour = await getAll(DailyWorkModel,payload)
        return {
          data: worksforlabour,
          error: "",
          message: "Work of labour fetched successfully",
          status: 200,
        };
      } catch (err: any) {
        logger.error(`${this.req.ip} ${err.message}`);
        return {
          data: null,
          error: err.message ? err.message : err,
          message: "",
          status: 400,
        };
      }
    }
}
