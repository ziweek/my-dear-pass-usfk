"use client";

import { Button } from "@nextui-org/react";
import { IconGithub, IconLinkedIn } from "./common/icon";
import { useTheme } from "next-themes";

export default function Footer(props: any) {
  const {systemTheme} = useTheme()
  return (
    <section
      className={`bottom-0 z-50 min-h-[60px] w-full pb-8 ${
        props.isFixed ? "" : ""
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1200px] select-none flex-col items-center justify-center gap-2">
        <div className="flex h-full select-none flex-col items-center justify-center gap-1 leading-none">
          <p className="text-md font-light">{props.title}</p>
          <p className="text-sm">{props.subtitle}</p>
        </div>
        <div className="flex h-full flex-row gap-2">
          <Button
            isIconOnly
            color={"default"}
            variant={"light"}
            size={"sm"}
            onPress={() => {
              window.open("https://github.com/ziweek");
            }}
          >
            <IconGithub fill={systemTheme == "dark" ? "#ffffff" : "#000000"} width={"25px"}></IconGithub>
          </Button>
          <Button
            isIconOnly
            variant={"light"}
            color={"default"}
            size={"sm"}
            onPress={() => {
              window.open("https://www.linkedin.com/in/ziweek/");
            }}
          >
            <IconLinkedIn fill={systemTheme == "dark" ? "#ffffff" : "#000000"} width={"25px"}></IconLinkedIn>
          </Button>
        </div>
      </div>
    </section>
  );
}
