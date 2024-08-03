"use client";

import { Button } from "@nextui-org/react";
import { IconGithub, IconLinkedIn } from "./common/icon";

export default function Footer(props: any) {
  return (
    <section
      className={`bottom-0 z-50 min-h-[60px] w-full pb-6 ${
        props.isFixed ? "" : ""
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1200px] select-none flex-col items-center justify-center gap-1">
        <div className="flex h-full select-none flex-col items-center justify-center gap-1 leading-none">
          <p className="text-sm font-bold">{props.title}</p>
          <p className="text-tiny">{props.subtitle}</p>
        </div>
        <div className="flex h-full flex-row gap-1">
          <Button
            isIconOnly
            color={"default"}
            variant={"light"}
            size={"sm"}
            onPress={() => {
              window.open("https://github.com/ziweek");
            }}
          >
            <IconGithub fill="#000" width={"20px"}></IconGithub>
          </Button>
          <Button
            isIconOnly
            variant={"light"}
            color={"default"}
            size={"sm"}
            onPress={() => {
              window.open("https://www.linkedin.com/in/jiuk-kim-42248325a/");
            }}
          >
            <IconLinkedIn fill="#000" width={"20px"}></IconLinkedIn>
          </Button>
        </div>
      </div>
    </section>
  );
}
