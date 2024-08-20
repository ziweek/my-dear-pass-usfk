"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  Divider,
  Card,
  Tooltip,
} from "@nextui-org/react";
import { useState, useMemo, useEffect } from "react";
import { IconCheck, IconNo, IconUp } from "@/components/common/icon";
import { dataset } from "@/components/common/dataset";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useIsMobile } from "@/hook/useMediaQuery";
// import Footer from "@/components/footer";

export default function MainPage(props: any) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCalendarFolded, setIsCalendarFolded] = useState(false);

  const [seletecDate, setSeletecDate] = useState(new Date());
  const [seletedDates, setSeletedDates] = useState<any>(undefined);
  const [nearestDate, setNearestDate] = useState<any>();

  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["KATUSA"]));
  const [selectedCategory, setSelectedCategory] = useState("US");
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const isMobile = useIsMobile();
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const checkResize = () => {
      if (isMobile) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    checkResize();
  }, [isMobile]);

  useEffect(() => {
    AOS.init({
      disable: mobile ? true : false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
      once: true, // whether animation should happen only once - while scrolling down
      offset: 120, // offset (in px) from the original trigger point
    });
    // toast.info("Data is Updated to FY25 USFK Holiday Schedule v1 :)", {
    //   position: "bottom-center",
    //   theme: "colored",
    // });
    const data = async () => {
      const selectedDatesArray = await convertDateToObject();
      await setSeletedDates(selectedDatesArray);
      await setIsHydrated(true);
      await setIsCalendarFolded(true);
    };
    data();
  }, []);

  useEffect(() => {
    const data = async () => {
      const selectedDatesArray = await convertDateToObject();
      await setSeletedDates(selectedDatesArray);
    };
    data();
  }, [selectedCategory]);

  async function convertDateToObject() {
    var selectedDatesArray: any[] = []; // Initialize as an empty array
    var indexOfNearestDate: number = 0;

    const targetDates = dataset.filter(
      (e) => e[selectedCategory as keyof typeof e] == "YES"
    );

    for (let i = 0; i < targetDates.length; i++) {
      const e: any = targetDates[i];
      const targetDateElement = e.DATE.split("-");
      const targetDate = new Date(`
          20${targetDateElement[2]}/
          ${targetDateElement[1]}/
          ${targetDateElement[0]} 00:00:00`);

      if (targetDate.getTime() >= new Date().getTime()) {
        e.DateObject = targetDate;
        if (i < 26) {
          alert(e.DATE);
        }
        selectedDatesArray.push(e);
        if (indexOfNearestDate == 0) {
          await setNearestDate(e);
          indexOfNearestDate = i;
        }
      }
    }
    return selectedDatesArray;
  }

  return (
    <>
      <div className="relative flex flex-row h-full overflow-y-auto w-screen items-start gap-8 justify-center select-none bg-stone-200">
        {/*  */}
        {!mobile && (
          <div className="h-screen w-[400px]">
            <div className="fixed top-0 h-screen flex flex-col items-center justify-center w-[400px]">
              <p className="font-light text-2xl">My Dear Pass USFK</p>
              <p className="italic">I wish you all have sweet pass :)</p>
              <Image
                src={"/image/deer-licking-deer.jpg"}
                width={100}
                height={100}
                alt="logo"
                className="w-[350px] h-[270px] rounded-2xl"
              ></Image>
            </div>
          </div>
        )}
        {/*  */}
        <div className="relative flex flex-col h-full overflow-y-auto items-center w-full">
          {/* header */}
          <div className="flex flex-col h-fit w-full fixed top-0 z-10 max-w-[420px] bg-white space-y-2 shadow-lg border-b-1">
            <div className="h-[50px] w-screen flex flex-row items-center justify-between px-4 max-w-[420px] pt-4">
              <div className="flex flex-row items-center justify-center space-x-2">
                {/* <Image
              src={"/icon/logo-icon.png"}
              width={100}
              height={100}
              alt="logo"
              className="w-[45px]"
            ></Image> */}
                <p className="font-light text-2xl tracking-tight">
                  My Dear Pass
                </p>
                <p
                  className="text-sm font-bold w-fit p-1 bg-black rounded-md text-white"
                  onClick={async () => {
                    const targetDateElement = await nearestDate?.DATE.split(
                      "-"
                    );
                    const targetDate = await new Date(`
                        20${targetDateElement[2]}/
                        ${targetDateElement[1]}/
                        ${targetDateElement[0]} 00:00:00`);
                    await setSeletecDate(targetDate);
                    await setIsCalendarFolded(true);
                  }}
                >
                  D-
                  {Math.round(
                    (nearestDate?.DateObject.getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </p>
              </div>
              <Dropdown placement={"bottom-end"}>
                <DropdownTrigger>
                  {/* <Tooltip
                    content={
                      <p className="font-bole text-md p-1">Select your Group</p>
                    }
                    showArrow={true}
                    isOpen={true}
                    color={"primary"}
                    placement={"bottom-end"}
                  > */}
                  <Button
                    size={"sm"}
                    variant="bordered"
                    className="border-1 border-black w-fit font-bold"
                  >
                    {selectedValue}
                  </Button>
                  {/* </Tooltip> */}
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  selectionMode={"single"}
                  selectedKeys={selectedKeys}
                  disallowEmptySelection={false}
                  onSelectionChange={async (key: any) => {
                    await setSelectedKeys(key);
                    await setSelectedCategory(key.currentKey);
                  }}
                >
                  <DropdownSection title="Military" showDivider>
                    <DropdownItem key="US">US</DropdownItem>
                    <DropdownItem key="ROK">ROK</DropdownItem>
                    <DropdownItem key="KATUSA">KATUSA</DropdownItem>
                  </DropdownSection>
                  <DropdownSection title="Civilian" showDivider>
                    <DropdownItem key="DOD(US)">DOD(US)</DropdownItem>
                    <DropdownItem key="USFK(LN)">USFK(LN)</DropdownItem>
                    <DropdownItem key="CFC(KN)">CFC(KN)</DropdownItem>
                  </DropdownSection>
                  <DropdownSection title="DODEA">
                    <DropdownItem key="DODEA(US)">DODEA(US)</DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
            {/*  */}
            {isCalendarFolded && (
              <>
                {isHydrated && (
                  <Calendar
                    locale={"us"}
                    calendarType={"gregory"}
                    minDetail={"month"}
                    maxDetail={"month"}
                    showFixedNumberOfWeeks
                    className={"h-fit"}
                    view={"month"}
                    value={seletecDate}
                    // onClickDay={(value) => {
                    //   setSeletecDate(value);
                    // }}
                    tileContent={({ activeStartDate, date, view }) =>
                      seletedDates?.find(
                        (e: any) => e.DateObject.getTime() === date.getTime()
                      ) ? (
                        <p>PASS</p>
                      ) : `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` ===
                        `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}` ? (
                        <p>Today</p>
                      ) : null
                    }
                    tileClassName={({ activeStartDate, date, view }) =>
                      seletedDates?.find(
                        (e: any) => e.DateObject.getTime() === date.getTime()
                      )
                        ? "holiday"
                        : null
                    }
                  />
                )}
              </>
            )}
            {/*  */}
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              onClickCapture={(e) => {
                setIsCalendarFolded(!isCalendarFolded);
              }}
              className={`${
                isCalendarFolded ? "" : "rotate-180"
              } z-50 hover:bg-white foucs:bg-white`}
            >
              <div className="flex flex-col items-center justify-center p-2">
                <IconUp fill="#000" width={17} height={17}></IconUp>
              </div>
            </button>
          </div>
          {/*  */}
          <div className="flex flex-col w-full space-y-2 h-full px-4 max-w-[420px] bg-white overflow-x-clip">
            {/* body */}
            <div className="h-[100px] w-full"></div>
            {seletedDates?.map((e: any, i: number) => {
              return <p key={i}>{e.DATE}</p>;
            })}
            {seletedDates?.map((e: any, i: number) => {
              return (
                <div key={i} className="w-full h-fit space-y-4">
                  {e ===
                    seletedDates.filter(
                      (j: any) => j.DATE.split("-")[1] == e.DATE.split("-")[1]
                    )[0] && (
                    <div className="pt-8">
                      <div className="flex flex-row w-full justify-between items-end">
                        <p className="font-light text-2xl">
                          {`
                              ${e.DATE.split("-")[1]} / ${
                            e.DATE.split("-")[2]
                          }`}
                        </p>
                        <div className="flex flex-row space-x-2">
                          <div className="flex flex-row space-x-1">
                            <IconCheck width={15} fill="#17C964"></IconCheck>
                            <p className="font-bold text-sm">
                              {
                                dataset
                                  .filter((e: any, i: number) => {
                                    const targetDateElement = e.DATE.split("-");
                                    const targetDate = new Date(`
                                        20${targetDateElement[2]}/
                                        ${targetDateElement[1]}/
                                        ${targetDateElement[0]} 00:00:00`);
                                    const today = new Date();
                                    return (
                                      targetDate.getTime() >= today.getTime()
                                    );
                                  })
                                  .filter(
                                    (j) =>
                                      j.DATE.split("-")[1] ==
                                      e.DATE.split("-")[1]
                                  )
                                  .filter(
                                    (e) =>
                                      e[selectedCategory as keyof typeof e] ==
                                      "YES"
                                  ).length
                              }
                            </p>
                          </div>
                          <div className="flex flex-row space-x-1">
                            <IconNo width={15} fill="#f31260"></IconNo>
                            <p className="font-bold text-sm">
                              {
                                dataset
                                  .filter((e: any, i: number) => {
                                    const targetDateElement = e.DATE.split("-");
                                    const targetDate = new Date(`
                                        20${targetDateElement[2]}/
                                        ${targetDateElement[1]}/
                                        ${targetDateElement[0]} 00:00:00`);
                                    const today = new Date();
                                    return (
                                      targetDate.getTime() >= today.getTime()
                                    );
                                  })
                                  .filter(
                                    (j) =>
                                      j.DATE.split("-")[1] ==
                                      e.DATE.split("-")[1]
                                  )
                                  .filter(
                                    (e) =>
                                      e[selectedCategory as keyof typeof e] ==
                                      "NO"
                                  ).length
                              }{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Divider className="bg-black/50"></Divider>
                    </div>
                  )}
                  <div
                    data-aos={mobile ? undefined : "fade-left"}
                    className="flex flex-row space-x-4 pl-4"
                  >
                    <IconCheck
                      width={30}
                      fill={`${
                        e[selectedCategory as keyof typeof e] == "YES"
                          ? "#17C964"
                          : "#00000000"
                      }`}
                    ></IconCheck>
                    <div
                      // isPressable
                      onClick={async () => {
                        const targetDateElement = await e.DATE.split("-");
                        const targetDate = await new Date(`
                          20${targetDateElement[2]}/
                          ${targetDateElement[1]}/
                          ${targetDateElement[0]} 00:00:00`);
                        await setSeletecDate(targetDate);
                        await setIsCalendarFolded(true);
                      }}
                      key={i}
                      className="w-full h-[70px] bg-center bg-cover bg-blend-darken bg-black/40 rounded-xl text-start"
                      style={{
                        backgroundImage:
                          e[selectedCategory as keyof typeof e] == "YES"
                            ? `url("../../image/deer-licking-deer.jpg")`
                            : "",
                      }}
                    >
                      <div className="w-full h-full flex flex-col text-white justify-center select-none p-4">
                        <p className="font-bold text-sm">
                          {`20${e.DATE.split("-")[2]} / ${
                            e.DATE.split("-")[1]
                          } / ${e.DATE.split("-")[0]}`}
                          , {e.DAY}
                        </p>
                        <p className="text-sm line-clamp-1">{e.HOLIDAY}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="pt-8">
              {/* <Footer
                isFixed
                title={"My Dear Pass USFK"}
                subtitle={"If any issue, let me know."}
              ></Footer> */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
