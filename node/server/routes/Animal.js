import express from 'express'
import fs from 'fs'
const router = express.Router();
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import axios from 'axios';

/* GET home page. */
router.get('/', async function (req, res, next) {
  console.log("req", req.query)
  try {
    // https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=10&$skip=0
    //https://data.coa.gov.tw/api/v1/AnimalRecognition/
    const {data:raw_data} = await axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL', {
      params: req.query
    })
    res.status(200).send(raw_data)
  } catch (error) {
    next(error)
  }
});

// module.exports = router;
export default router;