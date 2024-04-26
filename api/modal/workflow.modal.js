import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema({
    id: String,
    data: Object,      
    position: Object,  
    height: Number,
    width: Number
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
    }
});



const workflowSchema = mongoose.Schema({
   nodes:[nodeSchema],
   edges:[edgeSchema],
   userid:String

}, {timestamps:true})

const Workflow = mongoose.model("Workflow", workflowSchema)

export default Workflow