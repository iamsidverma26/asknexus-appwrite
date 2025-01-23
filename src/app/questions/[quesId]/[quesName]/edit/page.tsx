import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues from "./EditQues";

interface PageProps {
  params: { quesId: string; quesName: string };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { quesId } = await params;

  const question = await databases.getDocument(db, questionCollection, quesId);

  return <EditQues question={question} />;
};

export default Page;
