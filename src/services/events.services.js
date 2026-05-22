
import EventModel from "../models/Events.models.js";
const insertEvent = async (newEvent) => {

     return await EventModel.create ( newEvent );
}


export {
insertEvent
    
}