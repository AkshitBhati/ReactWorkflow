import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema({
    id: String,
    data: Object,      
    position: Object,  
    height: Number,
    width: Number,
    uniqueid:String
});

const edgeSchema = new mongoose.Schema({
    id: String,
    source:String,
    sourceHandle: {
        type: String,
        default: null
    },
    target:String,
    targetHandle: {
        type: String,
        default: null
    },
    uniqueid:String
});



const workflowSchema = mongoose.Schema({
   nodes:[nodeSchema],
   edges:[edgeSchema],
   userid:String,
   

}, {timestamps:true})

const Workflow = mongoose.model("Workflow", workflowSchema)

export default Workflow