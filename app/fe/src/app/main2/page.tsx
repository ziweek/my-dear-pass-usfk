"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  Divider,
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
  const [seletedDates, setSeletedDates] = useState<Date[]>([]);
  const [isCalendarFolded, setIsCalendarFolded] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["US"]));
  const [selectedCategory, setSelectedCategory] = useState("US");

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const isMobile = useIsMobile();
  const [mobile, setMobile] = useState<boolean>(false);

  const checkResize = () => {
    if (isMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };
  useEffect(() => {
    checkResize();
  }, [isMobile]);

  useEffect(() => {
    const tt = getDate();
    setSeletedDates(tt);
    setIsHydrated(true);
    AOS.init({
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
      once: true, // whether animation should happen only once - while scrolling down
    });
    toast.info("Updated FY25 USFK Holiday Schedule v1 :)", {
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
    console.log(dateArray);
    return dateArray;
  }

  return (
    <>
      <div className="relative flex flex-row h-full overflow-y-auto w-screen items-start gap-8 justify-center select-none bg-stone-200">
        {!mobile && (
          <div className="h-screen w-[400px]">
            <div className="fixed top-0 h-screen flex flex-col items-center justify-center w-[400px]">
              <p className="italic font-bold text-3xl">My Dear Pass</p>
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
        <div className="relative flex flex-col h-full overflow-y-auto items-center border-1">
          {/* header */}
          <div className="flex flex-col h-fit w-full fixed top-0 z-10 max-w-[400px] bg-white">
            <div className="h-[50px] w-screen flex flex-row items-center justify-between px-4 max-w-[400px] pt-4">
              <div className="flex flex-row items-center justify-center">
                {/* <Image
              src={"/icon/logo-icon.png"}
              width={100}
              height={100}
              alt="logo"
              className="w-[45px]"
            ></Image> */}
                <p className="font-bold">My Dear Pass</p>
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
            <div className="w-full h-fit flex flex-col items-center space-y-2 border-b-1 shadow-lg max-w-[480px] rounded-b-2xl bg-white border-stone-200">
              {isCalendarFolded && (
                <>
                  {isHydrated && (
                    <Calendar
                      locale={"us"}
                      minDetail={"month"}
                      maxDetail={"month"}
                      showFixedNumberOfWeeks
                      className={"h-fit"}
                      calendarType={"gregory"}
                      view={"month"}
                      value={new Date()}
                      tileContent={({ activeStartDate, date, view }) =>
                        // view === "month" &&
                        seletedDates.filter(
                          (e) => e.getTime() == date.getTime()
                        ).length != 0 || true ? (
                          <p>PASS</p>
                        ) : null
                      }
                      tileClassName={({ activeStartDate, date, view }) =>
                        // view === "month" &&
                        seletedDates.filter(
                          (e) => e.getTime() == date.getTime()
                        ).length != 0
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
          <div className="flex flex-col w-full space-y-2 h-full pb-4 px-4 max-w-[400px] bg-white overflow-x-clip">
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
                          <p className="font-bold text-xl">
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
                    data-aos="fade-left"
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
                    <div
                      key={i}
                      className="w-full h-[80px] bg-center bg-cover bg-blend-darken bg-black/40 rounded-xl"
                      style={{
                        backgroundImage:
                          e[selectedCategory as keyof typeof e] == "YES"
                            ? `url("../../image/deer-licking-deer.jpg")`
                            : "",
                      }}
                    >
                      <div className="w-full h-full flex flex-col text-white justify-center select-none p-4">
                        <p className="font-bold text-sm">
                          {`${e.DATE.split("-")[2]} / ${
                            e.DATE.split("-")[1]
                          } / ${e.DATE.split("-")[0]}`}
                          , {e.DAY}
                        </p>
                        <p className="text-sm">{e.HOLIDAY}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="pt-8">
              <Footer
                isFixed
                title={"My Dear Pass"}
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
