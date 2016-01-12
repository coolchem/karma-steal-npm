/// <reference path="../../../../src/typings/tsd.d.ts" />

import chai = require('chai');
import sinon = require('sinon');
import SinonSpy = Sinon.SinonSpy;
import myAssistant = require("../../../../src/systems/service_system/assistants/my-assistant");
import myManager = require("../../../../src/systems/service_system/managers/my-manager");

chai.use(require("sinon-chai"));
require('sinon-as-promised');

describe('my-manager Test cases', () => {

    var expect = chai.expect;


    describe("sayHello",()=>{

        var sayHelloAndHiStub:any;

        beforeEach(()=>{
            sayHelloAndHiStub = sinon.stub(myAssistant,"sayHelloAndHi");
        });

        afterEach(()=>{
            sayHelloAndHiStub.restore();
        });

        it("should resolve with hello and hi",(done)=>{

            sayHelloAndHiStub.resolves("humm");

            myManager.sayHello().then((result)=>{

                expect(result).to.equal("humm");
                done();
            })

        });

        it("should reject with error, if assistant rejects with error",(done)=>{

            sayHelloAndHiStub.rejects(new Error("yay"));

            myManager.sayHello().then(null,(error)=>{

                expect(error).to.be.instanceOf(Error);
                expect(error.message).to.equal("yay");
                done();
            })
        });

    });
});