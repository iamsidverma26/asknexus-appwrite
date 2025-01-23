"use client";
import Footer from "@/app/components/Footer";
import QuestionForm from "@/components/QuestionForm";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";
import { IconHome, IconMessage, IconWorldQuestion } from "@tabler/icons-react";

const Page = () => {
  const { user } = useAuthStore();
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

  if (user)
    navItems.push({
      name: "Profile",
      link: `/users/${user.$id}/${slugify(user.name)}`,
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    });
  return (
    <div>
      <div className="flex flex-col lg:[ml-10]">
        <FloatingNav navItems={navItems} />
        <h1 className="text-3xl ml-5 mt-28">Ask the Question</h1>
        <div className="flex items-start lg:[mt-7] p-2 mb-10">
          <div className="w-full h-auto p-6 rounded-lg">
            <QuestionForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
