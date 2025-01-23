import Pagination from "@/components/Pagination";
import { MarkdownPreview } from "@/components/RTE";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { answerCollection, db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import slugify from "@/utils/slugify";
import { IconHome, IconWorldQuestion } from "@tabler/icons-react";
import Link from "next/link";
import { Query } from "node-appwrite";
import React from "react";

const Page = async ({
  params: rawParams,
  searchParams: rawSearchParams,
}: {
  params: { userId: string; userSlug: string };
  searchParams: { page?: string };
}) => {
  const params = await rawParams;
  const searchParams = await rawSearchParams;
  const { userId, userSlug } = params;
  const page = searchParams.page || "1";

  const queries = [
    Query.equal("authorId", userId),
    Query.orderDesc("$createdAt"),
    Query.limit(25),
    Query.offset((parseInt(page) - 1) * 25),
  ];

  const answers = await databases.listDocuments(db, answerCollection, queries);

  answers.documents = await Promise.all(
    answers.documents.map(async (ans) => {
      const question = await databases.getDocument(
        db,
        questionCollection,
        ans.questionId,
        [Query.select(["title"])]
      );
      return { ...ans, question };
    })
  );
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Questions",
      link: "/questions",
      icon: (
        <IconWorldQuestion className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  return (
    <div className="px-4">
      <FloatingNav navItems={navItems} />
      <div className="mb-4">
        <p>{answers.total} answers</p>
      </div>
      <div className="mb-4 max-w-3xl space-y-6">
        {answers.documents.map((ans) => (
          <div key={ans.$id}>
            <div className="max-h-40 overflow-auto">
              <MarkdownPreview
                source={ans.content}
                className="rounded-lg p-4"
              />
            </div>
            <Link
              href={`/questions/${ans.questionId}/${slugify(
                ans.question.title
              )}`}
              className="mt-3 inline-block shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600"
            >
              Question
            </Link>
          </div>
        ))}
      </div>
      <Pagination total={answers.total} limit={25} />
    </div>
  );
};

export default Page;
