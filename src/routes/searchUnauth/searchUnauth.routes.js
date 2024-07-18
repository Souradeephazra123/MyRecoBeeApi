import express from 'express'
import { httpGetSearhResult } from './searchUnauth.controller.js';

const searchUnauthRouter=express.Router();


searchUnauthRouter.get("/:key",httpGetSearhResult);



export {searchUnauthRouter}