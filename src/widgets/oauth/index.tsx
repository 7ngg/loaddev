import { SignIn } from "@/lib/auth";
import Image from "next/image";
import React from "react";

const providers = [
  { icon: "./github-logo.svg", provider: "GitHub" },
  { icon: "./google-logo.svg", provider: "Google" },
  { icon: "./discord-logo.svg", provider: "Discord" },
];

export default function OAuth() {
  return (
    <div className="flex gap-4 justify-center">
      {providers.map((item, index) => (
        <button
          key={index}
          onClick={async () => await SignIn(item.provider.toLowerCase())}
          aria-label={`Sign in with ${item.provider}`}
          className="flex items-center justify-center rounded cursor-pointer
          bg-transparent text-white font-semibold hover:text-black"
        >
          <Image
            src={item.icon}
            alt={item.provider}
            width={30}
            height={30}
            priority
          />
        </button>
      ))}
    </div>
  );
}
