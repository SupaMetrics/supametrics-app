import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { UserPlus } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
}

export const Hero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="w-full py-6 border-b border-neutral-200 dark:border-neutral-900">
      <div className="mx-auto max-w-6xl px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg lg:text-xl text-neutral-300 mb-8">{subtitle}</p>
        </div>
        <Link href="/upgrade" className="hidden">
          <Button
            variant="glow"
            className="px-6 py-3 text-base font-medium flex items-center gap-2"
          >
            <UserPlus size={18} />
            Collaborate on a Pro Trial
          </Button>
        </Link>
      </div>
    </section>
  );
};
