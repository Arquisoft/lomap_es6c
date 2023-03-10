import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import { storeMarker } from './database/database';

const api:Router = express.Router()

export interface Marker {
    lat: number;
    lng: number;
    comment: string;
}

api.post(
  "/markers/add",[
    check('lat').isNumeric(),
    check('lng').isNumeric(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let latReq = req.body.lat;
    let lngReq = req.body.lng;
    let comment = req.body.comment;
    let marker: Marker = {lat:latReq ,lng:lngReq, comment}
    storeMarker(marker);
    return res.sendStatus(200);
  }
);

export default api;