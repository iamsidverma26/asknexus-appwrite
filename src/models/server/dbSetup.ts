import { db} from "../name"
import createAnswerCollection from "./answer.collection"
import createCommentCollection from "./comment.collection"
import createQuestionCollection from "./question.collection"
import createVoteCollection from "./vote.collection"
import { databases } from "./config"


export default async function getOrCreateDB(){
    try {
        await databases.get(db)
        console.log("db connected");
    } catch (error) {
        try {
            await databases.create(db,db)
            console.log("databases created")
            await Promise.all([
                createQuestionCollection() ,
                createAnswerCollection() ,
                createCommentCollection() ,
                createVoteCollection() ,
            ])

            console.log("collections created");
            console.log("database connected");
        } catch (error) {
            console.error("Error creating db" , error)
        }
    }

    return databases
}