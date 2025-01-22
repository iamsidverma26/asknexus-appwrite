import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function POST(request:NextRequest){
    try {
        const {votedById , typeId , voteStatus , type} = await request.json()

        const response = await databases.listDocuments(
            db, voteCollection,[
                Query.equal("type",type),
                Query.equal("typeId",typeId),
                Query.equal("votedById" , votedById),
            ] 
        )

        if(response.documents.length > 0){
            await databases.deleteDocument(db,voteCollection,response.documents[0].$id)

            const QuestionOrAnswer = await databases.getDocument(
                db ,
                type === "question" ? questionCollection :answerCollection,
                typeId
            )

            const authorPrefs = await users.getPrefs<UserPrefs>(QuestionOrAnswer.authorId)

            await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId , {
                reputation : response.documents[0].voteStatus === "upvoted"? Number(authorPrefs.reputation) - 1: Number(authorPrefs.reputation) + 1
            })

        }

        if(response.documents[0]?.voteStatus !== voteStatus){
            const doc = await databases.createDocument(db , voteCollection,ID.unique(),{
                type,
                typeId,
                voteStatus,
                votedById
            } )

            const QuestionOrAnswer = await databases.getDocument(
                db ,
                type === "question" ? questionCollection :answerCollection,
                typeId
            )

            const authorPrefs = await users.getPrefs<UserPrefs>(QuestionOrAnswer.authorId)

            if(response.documents[0]){
                await users.updatePrefs<UserPrefs>
                (QuestionOrAnswer.authorId , {
                    reputation: response.documents[0].voteStatus === "upvoted" ? Number(authorPrefs.reputation) -1 : Number(authorPrefs.reputation) + 1

                })
            }else{
                await users.updatePrefs<UserPrefs>
                (QuestionOrAnswer.authorId, {
                    reputation : voteStatus === "upvoted" ? Number(authorPrefs.reputation) + 1 : Number(authorPrefs.reputation) + 1 
                })
            }

        }

        const [upvotes , downvotes] = await Promise.all([
            databases.listDocuments(db,voteCollection,[
                Query.equal("type",type),
                Query.equal("typeId",typeId),
                Query.equal("voteStatus","upVoted"),
                Query.equal("votedById",votedById),
                Query.limit(1),
            ]),
            databases.listDocuments(db,voteCollection,[
                Query.equal("type",type),
                Query.equal("typeId",typeId),
                Query.equal("voteStatus","downvoted"),
                Query.equal("votedById",votedById),
                Query.limit(1),
            ])
        ])
        
        return NextResponse.json(
            {
                data:{
                    document:null , 
                    voteResult: upvotes.total = downvotes.total
                },
                message:"vote Handled"
            }
            ,{
                status:200
            }
        )

    } catch (error:any) {
        return NextResponse.json(
        {
            error : error?.message || "Error in Voting"
        },
        {
        status:error?.status || error?.code || 500
        }
    )
    }
}