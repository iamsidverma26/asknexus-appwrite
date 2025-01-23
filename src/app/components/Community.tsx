import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

export default function Community() {
  return (
    <NeonGradientCard className="max-w-lg items-center justify-center text-center">
      <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        Join
      </span>
      <p>
        "Sign up" to become a part of our dynamic community. Gain access to a
        vast pool of knowledge, connect with experts, and share your insights.
        Whether you're here to ask questions or provide answers, joining us will
        enhance your learning experience and help you stay updated with the
        latest discussions. Join now and start making meaningful contributions
        today!
      </p>
    </NeonGradientCard>
  );
}
