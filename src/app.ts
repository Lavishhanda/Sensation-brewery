import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import "isomorphic-fetch";
import {partArr} from "./parts";
import {partsData} from "./parts";
//import { parse } from "path";


//#region decodeVIN data
interface decodeVIN {
  Value: String;
  ValueId: String;
  Variable: String;
  VariableId: Number;
}

let VINResponse: decodeVIN[];

export const getVIN = async () => {
  try {
    const apiUrl =
      "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/5UXWX7C5*BA?format=json";
    const reporesponse = await fetch(apiUrl);
    const getresponse = await reporesponse.json();
    //console.log("printing data");
    //console.log(getresponse);
    VINResponse = getresponse.Results;
    //console.log("type of " + VINResponse.length);
    return VINResponse;
  } catch (err) {
    console.log(err);
  }
};
//getVIN();
//#endregion decodeVIN data

//#region get makes and model data
interface makeModel {
  Make_ID: String;
  Make_Name: String;
  Model_ID: String;
  Model_Name: String;
}

let makeModelArray: Array<makeModel>[][] = [];
let tempMakeModelArray: Array<makeModel>[] = [];

// let makeModelArray: Array<any>= [];
// let tempMakeModelArray: Array<any> = [];

export const getMakesAndModels = async (make: any, yearFrom: any, yearTo: any) => {
  yearFrom = parseInt(yearFrom);
  yearTo = parseInt(yearTo);

  try {
    while (yearFrom <= yearTo ) {
      const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${make}/modelyear/${yearFrom}?format=json`;
      const reporesponse = await fetch(apiUrl);
      const getresponse = await reporesponse.json();
      console.log("printing data");
      //console.log(getresponse);
      tempMakeModelArray = getresponse.Results;
      //   console.log(tempMakeModelArray);
      makeModelArray = [...makeModelArray, tempMakeModelArray];
      yearFrom++;
      tempMakeModelArray = [];
    }
    //console.log("type of " + VINResponse.length);
    console.log("returning full arr");
    console.log(makeModelArray);
    return makeModelArray;
  } catch (err) {
    console.log(err);
  }
};
//#endregion get makes and model data

//#region get parts for model 3 data
let det : partsData[] = [];
export let pardetail = (make : String, model : String) : Array<partsData> => {
    make = String(make).toLowerCase();
    model = String(model).toLowerCase();
    partArr.forEach((element)=>{
        // console.log("manu " + element.Manufacturer);
        // console.log("model " + element.Model);
        // console.log("model Param " + model);
        // console.log(make == element.Manufacturer);
        // console.log(model == element.Model);
        if(element.Manufacturer == make && element.Model == model){
            det.push(element);
        }
    })
    return det;
}
//#endregion get parts for model 3 data ends

const app: Application = express();

// Decode VIN
app.get("/getVIN", (req: Request, res: Response) => {
  //console.log("Inside get");
  getVIN();
  res.send(VINResponse);
  //console.log("data sent");
});
// Decode VIN ends


// get makes and model data
app.get("/getMakesAndModels", (req: Request, res: Response) => {
  //console.log("query printing");
  console.log(req.query);
  const make: any = req.query.make;
  const yearfrom: any = req.query.yearfrom;
  const yearto: any = req.query.yearto;
  getMakesAndModels(make, yearfrom, yearto);
  res.send(makeModelArray);
  makeModelArray.length = 0;
});
// get makes and model data ends


// get part details start
app.get("/partdetails", (req: Request, res: Response) => {
    //console.log(req.query);
    const make: String = String(req.query.make);
    const model: String = String(req.query.model); 
    pardetail(make,model);
    res.send(det);
    det.length = 0; 
  });
// get part details end


app.listen(5000, () => console.log("Server running"));

