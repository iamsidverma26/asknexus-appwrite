import {IndexType, Permission } from "node-appwrite"
import {db , answerCollection} from "../name"
import {databases} from "./config"

export default async function createAnswerCollection(){
    await databases.createCollection(db,answerCollection,answerCollection,[
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
        Permission.read("any"),
    ])
    console.log("answers collection created");
    
    await Promise.all([
        databases.createStringAttribute(db,answerCollection,"content" , 10000 , true),
        databases.createStringAttribute(db,answerCollection,"questionId" , 100 , true),
        databases.createStringAttribute(db,answerCollection,"authorId" , 50 , true),
    ])

    console.log("answers attributes created")
}