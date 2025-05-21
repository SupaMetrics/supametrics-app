"use client";

import { useState } from "react";
import Link from "next/link";
import LinkButton from "./link-button";
import { ModeToggle } from "./mode-toggle";
import { Icons } from "./icons";

const navItems = [
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <Icons
          type={open ? "times" : "menu"}
          width="29px"
          height="29px"
          color="#6B7280"
          className="rounded-full p-1 border border-neutral-200 dark:border-neutral-800"
        />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-black p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold">Menu</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <Icons color="#6b7280" className="rounded-full p-1 border border-neutral-200 dark:border-neutral-800" type="times" width="29px" height="29px" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-neutral-800 dark:text-neutral-200">
            {navItems.map((item, idx) => (
              <Link key={idx} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3 text-center">
              <LinkButton href="/login">Login</LinkButton>
              <LinkButton variant="outline" href="/register">
                Signup
              </LinkButton>
              <ModeToggle />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};
