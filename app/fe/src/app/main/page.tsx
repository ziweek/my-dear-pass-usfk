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
import Footer from "@/components/footer";

export default function MainPage(props: any) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [seletecDate, setSeletecDate] = useState(new Date());
  const [seletedDates, setSeletedDates] = useState<any>(undefined);
  const [isCalendarFolded, setIsCalendarFolded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("US");
  const [nearestDate, setNearestDate] = useState<any>();

  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["US"]));
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
    toast.info("Data is Updated to FY25 USFK Holiday Schedule v1 :)", {
      position: "bottom-center",
      theme: "colored",
    });
    setIsHydrated(true);
    getSelectedDatesArray();
    setIsCalendarFolded(true);
  }, []);

  useEffect(() => {
    getSelectedDatesArray();
  }, [selectedCategory]);

  async function getSelectedDatesArray() {
    var selectedDatesArray: any = await [];
    await dataset
      .filter((e) => e[selectedCategory as keyof typeof e] == "YES")
      .forEach(async (e) => {
        const targetDateElement = await e.DATE.split("-");
        const targetDate = await new Date(`
        20${targetDateElement[2]}/
        ${targetDateElement[1]}/
        ${targetDateElement[0]} 00:00:00`);
        await selectedDatesArray.push(targetDate);
      });
    await setSeletedDates(selectedDatesArray);

    const timeOffsetArray = await selectedDatesArray.map(
      (e: Date, i: number) => {
        const today = new Date();
        return e.getTime() - today.getTime();
      }
    );
    // console.log(timeOffsetArray.find((e: number) => e >= 0));
    // console.log(
    //   timeOffsetArray.indexOf(timeOffsetArray.find((e: number) => e >= 0))
    // );
    const indexOfNearestDate: number = await timeOffsetArray.indexOf(
      timeOffsetArray.find((e: number) => e >= 0)
    );
    console.log(
      dataset.filter((e) => e[selectedCategory as keyof typeof e] == "YES")[
        indexOfNearestDate
      ]
    );
    await setNearestDate(
      dataset.filter((e) => e[selectedCategory as keyof typeof e] == "YES")[
        indexOfNearestDate
      ]
    );
  }

  return (
    <>
      <div className="relative flex flex-row h-full overflow-y-auto w-screen items-start gap-8 justify-center select-none bg-stone-200">
        {/*  */}
        {!mobile && (
          <div className="h-screen w-[400px]">
            <div className="fixed top-0 h-screen flex flex-col items-center justify-center w-[400px]">
              <p className="font-light text-3xl">Dear My Pass</p>
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
        <div className="relative flex flex-col h-full overflow-y-auto items-center w-fit">
          {/* header */}
          <div className="flex flex-col h-fit w-full fixed top-0 z-10 max-w-[420px] bg-white space-y-2 shadow-lg border-b-1">
            <div className="h-[50px] w-screen flex flex-row items-center justify-between px-4 max-w-[420px] pt-4">
              <div className="flex flex-row items-center justify-center">
                {/* <Image
              src={"/icon/logo-icon.png"}
              width={100}
              height={100}
              alt="logo"
              className="w-[45px]"
            ></Image> */}
                <p className="font-light text-2xl">Dear My Pass</p>
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
            <div className="w-full h-fit px-4">
              <Card
                isPressable
                // onPress={async () => {
                //   const targetDateElement = await e.DATE.split("-");
                //   const targetDate = await new Date(`
                //         20${targetDateElement[2]}/
                //         ${targetDateElement[1]}/
                //         ${targetDateElement[0]} 00:00:00`);
                //   await setSeletecDate(targetDate);
                //   await setIsCalendarFolded(true);
                // }}
                // key={i}
                className="w-full h-[80px] bg-center bg-cover bg-blend-darken bg-black/40 rounded-xl text-start"
                style={{
                  backgroundImage: true
                    ? `url("../../image/deer-licking-deer.jpg")`
                    : "",
                }}
              >
                <div className="w-full h-full flex flex-col text-white justify-center select-none p-4">
                  <p className="font-bold text-sm text-right">
                    {`20${nearestDate?.DATE.split("-")[2]} / ${
                      nearestDate?.DATE.split("-")[1]
                    } / ${nearestDate?.DATE.split("-")[0]}`}
                    , {nearestDate?.DAY}
                  </p>
                  <p className="text-sm text-right">{nearestDate?.HOLIDAY}</p>
                  <p className="text-sm text-right">
                    {nearestDate?.DATE.split("-")[0] - new Date().getDate()}
                  </p>
                </div>
              </Card>
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
                        (e: Date) =>
                          e.toLocaleString() === date.toLocaleString()
                      ) ? (
                        <p>PASS</p>
                      ) : `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` ===
                        `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}` ? (
                        <p>Today</p>
                      ) : null
                    }
                    tileClassName={({ activeStartDate, date, view }) =>
                      seletedDates?.find(
                        (e: Date) =>
                          e.toLocaleString() === date.toLocaleString()
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
              <div className="flex flex-col items-center justify-center p-4">
                <IconUp fill="#000" width={15} height={15}></IconUp>
              </div>
            </button>
          </div>
          {/*  */}
          <div className="flex flex-col w-full space-y-2 h-full px-4 max-w-[420px] bg-white overflow-x-clip">
            {/* body */}
            <div className="h-[180px] w-full"></div>
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
                          <p className="font-light text-2xl">
                            {`20${e.DATE.split("-")[2]} / ${
                              e.DATE.split("-")[1]
                            }`}
                          </p>
                          <div className="flex flex-row space-x-2">
                            <div className="flex flex-row space-x-1">
                              <IconCheck width={15} fill="#17C964"></IconCheck>
                              <p className="font-bold text-sm">
                                {
                                  dataset
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
                    className="flex flex-row space-x-4 pl-8"
                  >
                    <IconCheck
                      width={30}
                      fill={`${
                        e[selectedCategory as keyof typeof e] == "YES"
                          ? "#17C964"
                          : "#00000000"
                      }`}
                    ></IconCheck>
                    <Card
                      isPressable
                      onPress={async () => {
                        const targetDateElement = await e.DATE.split("-");
                        const targetDate = await new Date(`
                          20${targetDateElement[2]}/
                          ${targetDateElement[1]}/
                          ${targetDateElement[0]} 00:00:00`);
                        await setSeletecDate(targetDate);
                        await setIsCalendarFolded(true);
                      }}
                      key={i}
                      className="w-full h-[80px] bg-center bg-cover bg-blend-darken bg-black/40 rounded-xl text-start"
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
                        <p className="text-sm">{e.HOLIDAY}</p>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
            <div className="pt-8">
              <Footer
                isFixed
                title={"Dear My Pass"}
                subtitle={"If any issue, let me know."}
              ></Footer>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
