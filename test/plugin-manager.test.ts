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

    before(()=>{
        fs.mkdirSync(tempProjectDir);
        fs.writeFileSync(tempProjectDir+"/package.json",JSON.stringify({version:"0.0.1"}, null, '  ') + '\n');

        fs.mkdirSync(tempProjectDir+"/src/");
        fs.mkdirSync(tempProjectDir+"/src/lib");
        fs.mkdirSync(tempProjectDir+"/test");
        fs.mkdirSync(tempProjectDir+"/test/unit");

        fs.writeFileSync(tempProjectDir+"/src/index.js"," ");
        fs.writeFileSync(tempProjectDir+"/src/lib/lib.js"," ");

        fs.writeFileSync(tempProjectDir+"/test/test1.js"," ");
        fs.writeFileSync(tempProjectDir+"/test/test2.js"," ");
        fs.writeFileSync(tempProjectDir+"/test/unit/test3.js"," ");
        fs.writeFileSync(tempProjectDir+"/test/unit/test4.ts"," ");

    });

    after(()=>{

        fs.removeSync(tempProjectDir);

    });

    describe("initializePlugin",()=>{

        beforeEach(()=>{

            files = [];
            client = {};
            steal = {testFiles:["test/**/*.js"]};

            pm.initializePlugin(files,basePath,steal,client)
        });
        it("should add steal.js to top of the files array",()=>{
            expect(files[0].pattern).to.equal(tempProjectDir+"/node_modules/steal/steal.js");
            expect(files[0].included).to.equal(true);

        });

        it("should add adapter to top of the files array",()=>{

            expect(files[1].pattern).to.equal(path.resolve('./src/adapter.js'));
            expect(files[1].included).to.equal(true);
        });

        it("should add package.json to the files array",()=>{

            expect(files[2].pattern).to.equal(tempProjectDir+"/package.json");
            expect(files[2].included).to.equal(false);
            expect(files[2].watched).to.equal(true);
            expect(files[2].served).to.equal(true);
        });

        it("should add files in stealjs.testFiles to the files array",()=>{

            expect(client.steal.files.length).to.equal(3);
            expect(client.steal.files).to.eql(["test/test1.js",
                "test/test2.js",
                "test/unit/test3.js"]);
        });

    });
});