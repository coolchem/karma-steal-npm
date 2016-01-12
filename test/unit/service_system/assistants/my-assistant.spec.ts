/// <reference path="../../../../src/typings/tsd.d.ts" />

import chai = require('chai');
import sinon = require('sinon');
import SinonSpy = Sinon.SinonSpy;
import helloService = require("../../../../src/systems/service_system/services/hello-service");
import hiService = require("../../../../src/systems/service_system/services/hi-service");
import myAssistant = require("../../../../src/systems/service_system/assistants/my-assistant");

chai.use(require("sinon-chai"));
require('sinon-as-promised');

describe('my-assistant Test cases', () => {

    var expect = chai.expect;


    describe("sayHelloAndHi",()=>{

        var sayHiStub:any;
        var sayHelloStub:any;

        beforeEach(()=>{
            sayHelloStub = sinon.stub(helloService,"sayHello");
            sayHiStub = sinon.stub(hiService,"sayHi");
        });

        afterEach(()=>{
            sayHelloStub.restore();
            sayHiStub.restore();
        });

        it("should resolve with hello and hi",(done)=>{

            sayHelloStub.returns("helloStub");
            sayHiStub.resolves("hiStub");

            myAssistant.sayHelloAndHi().then((result)=>{

                expect(result).to.equal("helloStub hiStub");
                done();
            })

        });

        it("should reject with error, if hi service rejected with error",(done)=>{

            sayHelloStub.returns("helloStub");
            sayHiStub.rejects(new Error("yay"));

            myAssistant.sayHelloAndHi().then(null,(error)=>{

                expect(error).to.be.instanceOf(Error);
                expect(error.message).to.equal("yay");
                done();
            })
        });

    });
});