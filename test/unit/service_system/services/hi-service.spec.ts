/// <reference path="../../../../src/typings/tsd.d.ts" />

import chai = require('chai');
import sinon = require('sinon');
import SinonSpy = Sinon.SinonSpy;
import hiService = require("../../../../src/systems/service_system/services/hi-service")

chai.use(require("sinon-chai"));

describe('hi-service Test cases', () => {

    var expect = chai.expect;


    describe("sayHi",()=>{

        var logSpy:SinonSpy;

        beforeEach(()=>{
            logSpy = sinon.spy(console,"log");
        });

        afterEach(()=>{
            logSpy.restore();
        });

        it("should resolve with hi",(done)=>{

            hiService.sayHi().then((result)=>{

                expect(result).to.equal("hi");
                expect(logSpy).to.have.been.calledWith("hi-service saying hi...");
                done();
            });
        });

    });
});