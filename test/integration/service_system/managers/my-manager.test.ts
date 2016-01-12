/// <reference path="../../../../src/typings/tsd.d.ts" />

import chai = require('chai');
import myAssistant = require("../../../../src/systems/service_system/assistants/my-assistant");
import myManager = require("../../../../src/systems/service_system/managers/my-manager");

describe('my-manager Integration Test cases', () => {

    var expect = chai.expect;


    describe("sayHello",()=>{

        it("should resolve with hello and hi",(done)=>{

            myManager.sayHello().then((result)=>{

                expect(result).to.equal("hello hi");
                done();
            })

        });

    });
});