"use client";

import { Button, Calendar, Card } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import Image from "next/image";

export default function MainPage(props: any) {
  return (
    <div
      className="h-screen w-screen grid justify-items-stretch"
      style={{ gridTemplateRows: "auto 1fr auto" }}
    >
      {/* Header */}
      <div className="h-[60px] w-screen flex flex-row items-center justify-between px-4 bg-white">
        <p>logo</p>
        <p>team</p>
      </div>
      {/* Content */}
      <div className="h-full w-full flex flex-col items-center justify-start overflow-hidden">
        {/* bottom box */}
        <Calendar
          aria-label="Date (Read Only)"
          value={today(getLocalTimeZone())}
          isReadOnly
          calendarWidth={"100%"}
          classNames={{
            base: "rounded-none h-fit",
            headerWrapper: "w-full",
            gridHeader: "w-full",
            gridHeaderRow: "justify-between",
            gridWrapper: "rounded-none w-full h-full",
            grid: "w-full h-full",
            gridBody: "w-full h-full flex flex-col justify-around",
            gridBodyRow: "justify-evenly h-full",
            content: "w-full h-full",
          }}
          className="h-1/3 w-full min-h-[320px] flex flex-col"
          lang={"en"}
        />
        <div className="h-full w-full space-y-4 p-4 overflow-y-auto">
          {[1, 2, 3, 4, 5, 6, 7].map((e, i) => {
            return (
              <Card
                key={i}
                className="w-full h-[120px] bg-[url('../../public/image/deer-licking-deer.jpg')] bg-center bg-cover bg-blend-darken bg-black/30"
              >
                <div className="w-full h-full"></div>
                {e}
              </Card>
            );
          })}
        </div>
      </div>
      {/* Footer */}
      <div className="h-[80px] w-screen border-t-1 flex flex-col justify-center items-center p-4 drop-shadow-md">
        <Button
          fullWidth
          radius={"full"}
          variant={"bordered"}
          className="h-[60px] bg-white font-bold border-1 border-black"
          size={"lg"}
          startContent={
            <Image
              src={"/icon/gcal.png"}
              width={100}
              height={100}
              alt="gcal-logo"
              className="w-[45px]"
            ></Image>
          }
        >
          구글 캘린더로 구독하기
        </Button>
      </div>
    </div>
  );
}
