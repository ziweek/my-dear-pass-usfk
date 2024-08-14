"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  Card,
  Divider,
} from "@nextui-org/react";
import {
  today,
  getLocalTimeZone,
  CalendarDate,
  DateValue,
} from "@internationalized/date";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { IconUp } from "@/components/common/icon";
import { dataset } from "@/components/common/dataset";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function MainPage(props: any) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [seletedDates, setSeletedDates] = useState<Date[]>([]);
  const [isCalendarFolded, setIsCalendarFolded] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["US"]));
  const [selectedCategory, setSelectedCategory] = useState("US");

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  useEffect(() => {
    setIsHydrated(true);
    const tt = getDate();
    setSeletedDates(tt);
  }, []);

  function getDate(): Date[] {
    var dateArray: any = [];
    dataset.forEach((e) => {
      const targetDateElement = e.DATE.split("-");
      const targetDate = new Date(`
        20${targetDateElement[2]}-
        ${targetDateElement[1]}-
        ${targetDateElement[0]}`);
      dateArray.push(targetDate);
    });
    console.log(dateArray);
    return dateArray;
  }

  return (
    <div className="flex flex-col h-screen overflow-y-auto max-w-[400px] w-full mx-auto">
      {/* header */}
      <div className="flex flex-col h-fit w-full fixed top-0 z-10 max-w-[480px]">
        <div className="h-[60px] w-screen flex flex-row items-center justify-between px-4 bg-white max-w-[480px]">
          <div className="flex flex-row items-center justify-center">
            <Image
              src={"/icon/logo-icon.png"}
              width={100}
              height={100}
              alt="logo"
              className="w-[45px]"
            ></Image>
            <p className="font-bold">So When is 4day</p>
          </div>
          {/* <p>team</p> */}
        </div>
        <div className="w-full h-fit flex flex-col items-center bg-white space-y-2 border-b-1 shadow-md sticky top-1 max-w-[480px]">
          <div className="w-full flex h-fit flex-row justify-between px-4 space-x-4">
            <Dropdown placement={"bottom"}>
              <DropdownTrigger>
                <Button
                  fullWidth
                  variant="bordered"
                  className="border-1 border-black w-full h-[50px] font-bold text-lg"
                >
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                selectionMode={"single"}
                selectedKeys={selectedKeys}
                disallowEmptySelection={false}
                // onSelectionChange={setSelectedKeys}
                onSelectionChange={(key: any) => {
                  setSelectedKeys(key);
                  setSelectedCategory(key.currentKey);
                }}
              >
                <DropdownSection title="Military" showDivider>
                  <DropdownItem key="US">US</DropdownItem>
                  <DropdownItem key="ROK">ROK</DropdownItem>
                  <DropdownItem key="KATUSA">KATUSA</DropdownItem>
                </DropdownSection>
                <DropdownSection title="Civilian" showDivider>
                  <DropdownItem key="DOD (US)">DOD (US)</DropdownItem>
                  <DropdownItem key="USFK (LN)">USFK (LN)</DropdownItem>
                  <DropdownItem key="CFC (KN)">CFC (KN)</DropdownItem>
                </DropdownSection>
                <DropdownSection title="DODEA">
                  <DropdownItem key="DODEA (US)">DODEA (US)</DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
          {isCalendarFolded && (
            <>
              {isHydrated && (
                <Calendar
                  locale={"ko"}
                  minDetail={"month"}
                  showFixedNumberOfWeeks
                  className={"h-fit"}
                  calendarType={"gregory"}
                  value={new Date()}
                  // defaultValue={new Date()}
                  // defaultView={"year"}
                  tileContent={({ activeStartDate, date, view }) =>
                    view === "month" &&
                    seletedDates.filter((e) => e.getTime() == date.getTime())
                      .length != 0 ? (
                      <p>휴일</p>
                    ) : new Date().getTime() === date.getTime() ? (
                      <p>오늘</p>
                    ) : null
                  }
                  tileClassName={({ activeStartDate, date, view }) =>
                    view === "month" &&
                    seletedDates.filter((e) => e.getTime() == date.getTime())
                      .length != 0
                      ? "holiday"
                      : null
                  }
                />
              )}
            </>
          )}
          <div className="w-full h-fit">
            <Button
              fullWidth
              size={"sm"}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onPress={(e) => {
                setIsCalendarFolded(!isCalendarFolded);
              }}
              variant={"light"}
              className={`${isCalendarFolded ? "" : "rotate-180"} z-50`}
            >
              <div className="flex flex-col items-center justify-center">
                <IconUp fill="#000" width={15} height={15}></IconUp>
              </div>
            </Button>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="grid w-full space-y-2 h-full p-4 overflow-y-scroll">
        {/* body */}
        <div className="h-[150px] w-full"></div>
        {dataset.map((e, i: number) => {
          return (
            <div key={i} className="w-full h-fit space-y-4">
              {e.HOLIDAY ==
                dataset.filter(
                  (j) => j.DATE.split("-")[1] == e.DATE.split("-")[1]
                )[0].HOLIDAY &&
                e.DATE ==
                  dataset.filter(
                    (j) => j.DATE.split("-")[1] == e.DATE.split("-")[1]
                  )[0].DATE && (
                  <div className="pt-8">
                    <div className="flex flex-row w-full justify-between items-end">
                      <p className="font-bold text-3xl">
                        {e.DATE.split("-")[1]}
                      </p>
                      <div className="flex flex-row space-x-2">
                        <p className="">
                          {
                            dataset
                              .filter(
                                (j) =>
                                  j.DATE.split("-")[1] == e.DATE.split("-")[1]
                              )
                              .filter(
                                (e) =>
                                  e[selectedCategory as keyof typeof e] == "YES"
                              ).length
                          }{" "}
                          Yes
                        </p>
                        <p className="">
                          {
                            dataset
                              .filter(
                                (j) =>
                                  j.DATE.split("-")[1] == e.DATE.split("-")[1]
                              )
                              .filter(
                                (e) =>
                                  e[selectedCategory as keyof typeof e] == "NO"
                              ).length
                          }{" "}
                          No
                        </p>
                      </div>
                    </div>
                    <Divider className="bg-black/50"></Divider>
                  </div>
                )}
              <Card
                key={i}
                className="w-full h-[120px] bg-center bg-cover bg-blend-darken bg-black/30 rounded-none"
                style={{
                  backgroundImage:
                    e[selectedCategory as keyof typeof e] == "YES"
                      ? `url("../../image/deer-licking-deer.jpg")`
                      : "",
                }}
              >
                <div className="w-full h-full flex flex-col p-4 text-white justify-between select-none">
                  <div className="w-full h-full flex flex-col text-white justify-between">
                    <p className="font-bold">
                      {e.DATE}, {e.DAY}
                    </p>
                    <p className="text-md">{e.HOLIDAY}</p>
                    <p className="text-lg font-bold w-full text-right">
                      {e[selectedCategory as keyof typeof e]}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// {/* {seletedDates.map((e, i) => {
//   return (
//     <Card
//       key={i}
//       className="w-full h-[50px] flex flex-col items-center justify-center"
//     >
//       <p>{e.toDateString()}</p>
//     </Card>
//   );
// })} */}
