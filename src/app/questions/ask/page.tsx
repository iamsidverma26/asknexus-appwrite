import Footer from "@/app/components/Footer";
import QuestionForm from "@/components/QuestionForm";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconWorldQuestion } from "@tabler/icons-react";

const Page = () => {
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
    <div>
      <div className="flex flex-col ml-10">
        <FloatingNav navItems={navItems} />
        <h1 className="text-3xl ml-10 mt-28">Ask the Question</h1>
        <div className="flex items-start mt-7 p-2 mb-10">
          <div className="w-3/4 h-auto p-6 rounded-lg">
            <QuestionForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
