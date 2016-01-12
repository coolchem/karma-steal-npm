

import {actionControl,Action,Event} from "./systems/index"


//subscribing to an event

actionControl.subscribe(Event.HI_HELLO,(result:string)=>{

   console.log("Event Received:\n"+result);
});

//performing an action
actionControl.perform(Action.SAY_HI_AND_HELLO).then((result:string)=>{
    console.log("Action Performed:\n"+result);
    console.log(result);

    process.exit(0);
});



