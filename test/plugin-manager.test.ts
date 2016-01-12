/// <reference path="../src/typings/tsd.d.ts" />

import chai = require('chai');
import pm = require("../src/plugin-manager");
import path = require("path");
import fs = require("fs-extra");
import {exec} from "child_process";


describe('plugin-manager Integration Test cases', () => {

    var expect = chai.expect;

    var tempProjectDir:string = path.resolve("./test/testProject");

    var files:Array<{pattern:string,
        included:boolean,
        served:boolean,
        watched:boolean}>= [];
    var steal:any = {testFiles:"test/**/*"};
    var basePath:string = tempProjectDir;
    var client:any = {};

    before((done)=>{
        fs.mkdirSync(tempProjectDir);
        fs.writeFileSync(tempProjectDir+"/package.json",JSON.stringify({version:"0.0.1"}, null, '  ') + '\n');

        fs.mkdirSync(tempProjectDir+"/test");
        fs.mkdirSync(tempProjectDir+"/test/unit");


        fs.writeFileSync(tempProjectDir+"/test/unit/test3.js"," ");

        fs.writeFileSync(tempProjectDir+"/test/test1.js"," ");
        fs.writeFileSync(tempProjectDir+"/test/test2.js"," ");
        fs.writeFileSync(tempProjectDir+"/test/unit/test3.js"," ");

    });

    after(()=>{

        fs.removeSync(tempProjectDir);

    });

    describe("initializePlugin",()=>{

        beforeEach(()=>{

            files = [];
            client = {};

            pm.initializePlugin(files,basePath,steal,client)
        });
        it("should add steal.js to top of the files array",(done)=>{
            expect(files[0].pattern).to.equal(tempProjectDir+"node_modules/steal/steal.js");
            expect(files[0].included).to.equal(true);

        });

        it("should add adapter to top of the files array",()=>{

            expect(files[1].pattern).to.equal(path.resolve('./src/adapter.js'));
            expect(files[1].included).to.equal(true);
        });

        it("should add package.json to the files array",(done)=>{

            expect(files[2].pattern).to.equal(tempProjectDir+"/package.json");
            expect(files[2].included).to.equal(false);
        });

        it("should add all js files in node_modules to the files array",(done)=>{

            expect(files[3].pattern).to.equal(tempProjectDir+"node_modules/**/*.js");
            expect(files[3].included).to.equal(false);
            expect(files[3].watched).to.equal(true);
            expect(files[3].served).to.equal(true);

        });

        it("should add all package.json files in node_modules to the files array",(done)=>{

            expect(files[4].pattern).to.equal(tempProjectDir+"node_modules/**/package.json");
            expect(files[4].included).to.equal(false);
            expect(files[4].watched).to.equal(true);
            expect(files[4].served).to.equal(true);

        });

        it("should add files in stealjs.testFiles to the files array",(done)=>{

            expect(client.steal.testFiles.length).to.equal(3);
            expect(client.steal.testFiles).to.equal([tempProjectDir+"/test/test1.js",
                tempProjectDir+"/test/test2.js",
                tempProjectDir+"/test/unit/test3.js"]);
        });

    });
});