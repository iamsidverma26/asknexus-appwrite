import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues from "./EditQues";

const Page = async ({
  params,
}: {
  params: { quesId: string; quesName: string };
}) => {
  const resolvedParams = await params;
  const { quesId } = resolvedParams;
  const question = await databases.getDocument(db, questionCollection, quesId);

  return <EditQues question={question} />;
};

export default Page;
