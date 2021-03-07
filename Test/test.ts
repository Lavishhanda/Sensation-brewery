import { pardetail } from "../src/app";
import chai from "chai";
import {expect} from "chai";
import chaiHttp from "chai-http";
import { doesNotMatch } from "assert";

chai.use(chaiHttp);

//#region Request One
describe('getVIN request', () => {
    it('should return response on call', () => {
      chai.request("localhost:5000").get('/getVIN')
        .then(res => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.an("array");
        })
    })
  })
//#endregion

//#region Request Two
describe('get Car data request', () => {
    it('should return response on call', () => {
      chai.request("localhost:5000").get('/getMakesAndModels/make=Tesla&yearfrom=2015&yearto=2020')
        .then(res => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.an("array");
        //   chai.expect()
        })
    })
  })
//#endregion

//#region Request Three
describe('Get model3 data', 
  () => { 
    it('should return true', () => { 
      const result = pardetail("tesla","model3");
      expect(result.length).to.equal(2); 
  }); 
});
//#endregion
