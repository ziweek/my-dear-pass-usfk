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
import { useState, useMemo, useEffect } from "react";
import { IconGithub, IconUp } from "@/components/common/icon";
import { dataset } from "@/components/common/dataset";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

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
    AOS.init({
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      anchorPlacement: "center-bottom", // defines which position of the element regarding to window should trigger the animation
      once: true, // whether animation should happen only once - while scrolling down
    });
    toast.info("FY25 USFK Holiday v1, is Updated..!!", {
      position: "bottom-center",
      theme: "colored",
    });
  }, []);

  useEffect(() => {
    const tt = getDate();
    setSeletedDates(tt);
  }, [selectedCategory]);

  function getDate(): Date[] {
    var dateArray: any = [];
    console.log(selectedCategory);
    dataset
      .filter((e) => e[selectedCategory as keyof typeof e] == "YES")
      .forEach((e) => {
        const targetDateElement = e.DATE.split("-");
        const targetDate = new Date(`
        20${targetDateElement[2]}-
        ${targetDateElement[1]}-
        ${targetDateElement[0]}`);
        dateArray.push(targetDate);
      });
    // console.log(dateArray);
    return dateArray;
  }

  return (
    <>
      <div className="flex flex-col h-screen overflow-y-auto max-w-[400px] w-full mx-auto">
        {/* header */}
        <div className="flex flex-col h-fit w-full fixed top-0 z-10 max-w-[400px]">
          <div className="h-[50px] w-screen flex flex-row items-center justify-between px-4 bg-white max-w-[400px]">
            <div className="flex flex-row items-center justify-center">
              {/* <Image
              src={"/icon/logo-icon.png"}
              width={100}
              height={100}
              alt="logo"
              className="w-[45px]"
            ></Image> */}
              <p className="font-bold">Dear 4day</p>
            </div>
            <Dropdown placement={"bottom-end"}>
              <DropdownTrigger>
                <Button
                  size={"sm"}
                  variant="bordered"
                  className="border-1 border-black w-fit font-bold"
                >
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                selectionMode={"single"}
                selectedKeys={selectedKeys}
                disallowEmptySelection={false}
                onSelectionChange={async (key: any) => {
                  await setSelectedKeys(key);
                  await setSelectedCategory(key.currentKey);
                  // const tt = await getDate();
                  // await setSeletedDates(tt);
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
          <div className="w-full h-fit flex flex-col items-center bg-white space-y-2 border-b-1 shadow-md sticky top-1 max-w-[480px]">
            {isCalendarFolded && (
              <>
                {isHydrated && (
                  <Calendar
                    locale={"us"}
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
                        <p className="text-xs">Holiday</p>
                      ) : new Date().getTime() === date.getTime() ? (
                        <p className="text-xs">Today</p>
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
            <Button
              size={"sm"}
              isIconOnly
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
        {/*  */}
        <div className="grid w-full space-y-2 h-full pb-8 px-4 overflow-y-scroll">
          {/* body */}
          <div className="h-[80px] w-full"></div>
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
                <div className="flex flex-row space-x-4 pl-8">
                  <IconGithub width={30}></IconGithub>
                  <Card
                    key={i}
                    className="w-full h-[80px] bg-center bg-cover bg-blend-darken bg-black/30"
                    style={{
                      backgroundImage:
                        e[selectedCategory as keyof typeof e] == "YES"
                          ? `url("../../image/deer-licking-deer.jpg")`
                          : "",
                    }}
                  >
                    <div className="w-full h-full flex flex-col text-white justify-center select-none p-4">
                      <p className="font-bold text-sm">
                        {e.DATE}, {e.DAY}
                      </p>
                      <p className="text-sm">{e.HOLIDAY}</p>
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </>
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