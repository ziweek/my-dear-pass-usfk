"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  Calendar,
  Card,
  Divider,
} from "@nextui-org/react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import Image from "next/image";
import { useState, useMemo } from "react";
import { IconUp } from "@/components/common/icon";
import { dataset } from "@/components/common/dataset";

const aa = new CalendarDate(2024, 8, 7);

export default function MainPage(props: any) {
  const [isCalendarFolded, setIsCalendarFolded] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["US"]));
  const [selectedCategory, setSelectedCategory] = useState("US");

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <div
      className="h-full min-h-screen w-screen flex overflow-y-auto mx-auto bg-[#ededed] items-center flex-col select-none"
      // style={{ gridTemplateRows: "auto 1fr auto" }}
    >
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
        <div className="w-full h-fit flex flex-col items-center bg-white space-y-2 border-b-1 shadow-md pb-1 sticky top-1 max-w-[480px]">
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
              <div className="w-full flex h-fit flex-row justify-end px-4 items-center space-x-2">
                <p className="opacity-50 text-xs italic">
                  Subscribe this Calendar by
                </p>
                <Button
                  // radius={"full"}
                  variant={"flat"}
                  color={"primary"}
                  className="bg-white border-black"
                  isIconOnly
                  startContent={
                    <div className="flex flex-col items-center justify-center overflow-clip w-[50px] h-full">
                      <Image
                        src={"/icon/gcal.png"}
                        width={100}
                        height={100}
                        alt="gcal-logo"
                        className="w-[50px]"
                      ></Image>
                    </div>
                  }
                ></Button>
              </div>
              <Calendar
                aria-label="Date (Read Only)"
                value={today(getLocalTimeZone())}
                isReadOnly
                calendarWidth={"100%"}
                // focusedValue={aa}
                classNames={{
                  base: "rounded-none h-fit bg-white shadow-none",
                  headerWrapper: "w-full",
                  gridHeader: "w-full",
                  gridHeaderRow: "justify-between items-center w-full",
                  gridWrapper: "rounded-none w-full h-full",
                  grid: "w-full h-full",
                  gridBody:
                    "w-full h-full flex flex-col justify-evenly bg-white",
                  gridBodyRow: "justify-around h-full",
                  content: "w-full h-full",
                }}
                showShadow={false}
                className="w-full flex flex-col h-[320px]"
                lang={"en"}
              />
            </>
          )}
          <Button
            size={"sm"}
            onPress={() => {
              setIsCalendarFolded(!isCalendarFolded);
            }}
            variant={"light"}
            className={`${isCalendarFolded ? "" : "rotate-180"}`}
          >
            <div className="flex flex-col items-center justify-center">
              <IconUp fill="#000" width={15} height={15}></IconUp>
            </div>
          </Button>
        </div>
      </div>
      {/* body */}
      <div className="h-full w-full flex flex-col items-center justify-start overflow-hidden z-0 pt-48 max-w-[480px] bg-white">
        <div className="h-full w-full space-y-4 p-4 pb-8">
          {/* Footer */}
          {/* <Footer
            isFixed
            title={"So-When-is-4day"}
            subtitle={"If any issues, let us know."}
          ></Footer> */}
          {/* <div className="h-full w-full space-y-4 p-4 overflow-y-auto pb-8"> */}
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
                                    e[selectedCategory as keyof typeof e] ==
                                    "YES"
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
                                    e[selectedCategory as keyof typeof e] ==
                                    "NO"
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
                  className="w-full h-[150px] bg-center bg-cover bg-blend-darken bg-black/30 rounded-none"
                  style={{
                    backgroundImage:
                      e[selectedCategory as keyof typeof e] == "YES"
                        ? `url("../../image/deer-licking-deer.jpg")`
                        : "",
                  }}
                >
                  <div className="w-full h-full flex flex-col p-4 text-white justify-between select-none">
                    <div className="w-full h-fit flex flex-col text-white justify-between">
                      <p className="text-lg font-bold">
                        {e.DATE}, {e.DAY}
                      </p>
                      <p className="text-md">{e.HOLIDAY}</p>
                    </div>
                    <div>
                      <p className="font-bold w-full text-right text-sm">
                        {selectedCategory}
                      </p>
                      <p className="text-3xl font-bold w-full text-right">
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
    </div>
  );
}
