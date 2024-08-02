"use client";

import { Button, Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function MainPage(props: any) {
  return (
    <div className="bg-yellow-100 h-screen w-screen flex flex-col justify-between">
      {/* Header */}
      <div className="h-[80px] w-screen bg-slate-300"></div>
      {/* Content */}
      <div className="h-full w-full flex flex-col items-center justify-evenly">
        {/* top box */}
        <div className="h-full w-full bg-orange-200 flex flex-col items-center justify-center">
          <div className="h-[150px] w-[200px] bg-black/75 rounded-lg"></div>
        </div>
        {/* bottom box */}
        <div className="h-full w-full bg-orange-200 flex flex-col items-center justify-center">
          <Calendar
            aria-label="Date (Read Only)"
            value={today(getLocalTimeZone())}
            isReadOnly
            calendarWidth={"100%"}
            classNames={{
              base: "rounded-none",
              gridWrapper: "rounded-none w-full h-full",
              grid: "w-full h-full",
              gridBody: "w-full h-full flex flex-col justify-around",
              gridBodyRow: "justify-evenly h-full",
              content: "w-full h-full",
            }}
            className="h-full w-full"
          />
        </div>
      </div>
      {/* Footer */}
      <div className="h-[80px] w-screen bg-slate-300 flex flex-col justify-center items-center p-4">
        <Button
          fullWidth
          radius={"none"}
          variant={"shadow"}
          className="h-[60px] bg-white border-black border-1 font-bold text-lg"
          size={"lg"}
        >
          구글 캘린더 구독하기
        </Button>
      </div>
    </div>
  );
}
