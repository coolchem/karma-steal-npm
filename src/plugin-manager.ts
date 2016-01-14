
/// <reference path="./typings/tsd.d.ts" />

import reject = Promise.reject;
import resolve = Promise.resolve;
import path = require("path");
import fs = require("fs-extra")

import glob = require("glob");

function flatten(structure) {
    return [].concat.apply([], structure);
}

function expandGlob(file, cwd) {
    return glob.sync(file.pattern || file, {cwd: cwd});
}

function createPattern (path) {
    return {pattern: path, included: true, served: true, watched: false}
}

function createAsyncPattern (path) {
    return {pattern: path, included: false, served: true, watched: true}
}

export function initializePlugin(files:Array<{pattern:string,
    included:boolean,
    served:boolean,
    watched:boolean}>,basePath:string, steal:any, client:any):void
{

    if(!steal)
        steal = {};

    if(!client.steal)
        client.steal = {};

    if(!steal.testFiles)
        steal.testFiles = [];

    if(!steal.files)
        steal.files = [];

    var packagePath:string = path.normalize(basePath);

    steal.files.forEach((path)=>{

        files.unshift(createAsyncPattern(packagePath + "/" + path));
    });


    var pkg = require(packagePath + '/package.json');

    if(pkg.dependencies)
    {
        for ( var module in pkg.dependencies)
        {
            files.unshift(createAsyncPattern(packagePath + '/node_modules/' + module +'/**/*.js'));
            files.unshift(createAsyncPattern(packagePath + '/node_modules/' + module +'/**/package.json'));
        }
    }

    if(pkg.devDependencies)
    {
        for ( var module in pkg.devDependencies)
        {
            files.unshift(createAsyncPattern(packagePath + '/node_modules/' + module +'/**/*.js'));
            files.unshift(createAsyncPattern(packagePath + '/node_modules/' + module +'/**/package.json'));
        }
    }

    files.unshift(createAsyncPattern(packagePath + '/package.json'));
    files.unshift(createPattern(__dirname + '/adapter.js'));
    files.unshift(createPattern(packagePath + '/node_modules/steal/steal.js'));


    client.steal.files = flatten(steal.testFiles.map(function(file){
        files.push(createAsyncPattern(packagePath + "/" + (file.pattern || file)));
        return expandGlob(file, basePath);
    }));

}