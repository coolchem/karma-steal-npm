
/// <reference path="../../../typings/tsd.d.ts" />

import myAssistant = require("../assistants/my-assistant");
import reject = Promise.reject;
import resolve = Promise.resolve;

export function sayHello():Promise<string>
{
    return new Promise((resolve,reject)=>{

        myAssistant.sayHelloAndHi().then((result)=>{

            resolve(result);

        },(error)=>{

            reject(error);
        })
    });
}