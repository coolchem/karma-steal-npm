
/// <reference path="./typings/tsd.d.ts" />

import reject = Promise.reject;
import resolve = Promise.resolve;

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

}