/// <reference path="../../../../src/typings/tsd.d.ts" />

import chai = require('chai');
import sinon = require('sinon');
import SinonSpy = Sinon.SinonSpy;
import helloService = require("../../../../src/systems/service_system/services/hello-service")

chai.use(require("sinon-chai"));

describe('hello-service Test cases', () => {

    var expect = chai.expect;


    describe("sayHello",()=>{

        var logSpy:SinonSpy;

        beforeEach(()=>{
            logSpy = sinon.spy(console,"log");
        });

        afterEach(()=>{
            logSpy.restore();
        });

        it("should return hello",()=>{

            var result:string = helloService.sayHello();
            expect(result).to.equal("hello");
            expect(logSpy).to.have.been.calledWith("hello-service saying hello...");
        });

    });
});