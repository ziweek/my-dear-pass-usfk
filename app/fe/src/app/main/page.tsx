"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  Divider,
  Accordion,
  AccordionItem,
  DatePicker,
  Input,
} from "@nextui-org/react";
import { useState, useMemo, useEffect } from "react";
import { IconCheck, IconInfo, IconUp } from "@/components/common/icon";
import { dataset } from "@/components/common/dataset";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Image from "next/image";
import { useIsMobile } from "@/hook/useMediaQuery";
import moment, { duration } from "moment";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { useTheme } from "next-themes";
import {
  DateValue,
  parseDate,
  getLocalTimeZone,
  CalendarDate,
  today,
} from "@internationalized/date";

import html2canvas from "html2canvas";

export default function MainPage(props: any) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCalendarFolded, setIsCalendarFolded] = useState(false);

  const { resolvedTheme } = useTheme();

  const [seletecDate, setSeletecDate] = useState(new Date());
  const [seletedDates, setSeletedDates] = useState<any>([]);
  const [nearestDate, setNearestDate] = useState<any>();

  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["KATUSA"]));
  const [selectedCategory, setSelectedCategory] = useState("KATUSA");
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const [workingDayCountSelectedDate, setWorkingDayCountSelectedDate] =
    useState<DateValue>(today(getLocalTimeZone()));
  // new CalendarDate(
  //   +new Date().getFullYear.toString(),
  //   +new Date().getMonth.toString(),
  //   +new Date().getDay.toString()
  // )
  const [weekCounterState, setWeekCounterState] = useState<number>(0);
  const [holdingLeaveCount, setHoldingLeaveCount] = useState<string>("0");
  const [holdingCompensationPassCount, setHoldingCompensationPassCount] =
    useState<string>("0");

  const { toasts } = useToasterStore();

  const [counterOfHowDeerLovesEasterEgg, setCounterOfHowDeerLovesEasterEgg] =
    useState(0);

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
    // AOS.init({
    //   disable: mobile ? false : false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    //   anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    //   once: true, // whether animation should happen only once - while scrolling down
    //   offset: 120, // offset (in px) from the original trigger point
    // });
    console.log(toast);
    toasts.forEach((t) => toast.dismiss(t.id));
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

  useEffect(() => {
    if (counterOfHowDeerLovesEasterEgg == 10) {
      toast.success(
        <div className="flex">
          <p className="font-bold text-sm">
            KATUSA FROG PEPE mode is activated.
          </p>
        </div>,
        {
          id: "pepe-mode",
          position: "top-center",
          icon: <></>,
          style: {
            backgroundColor: "#000000",
            color: "#ffffff",
            borderRadius: 50,
            padding: `15 20`,
          },
          duration: 1000,
        }
      );
    }
  }, [counterOfHowDeerLovesEasterEgg]);

  async function convertDateToObject() {
    var selectedDatesArray: any[] = []; // Initialize as an empty array
    var indexOfNearestDate: number = 0;

    const targetDates = dataset;
    // const targetDates = dataset.filter(
    //   (e) => e[selectedCategory as keyof typeof e] == "YES"
    // );

    for (let i = 0; i < targetDates.length; i++) {
      const e: any = targetDates[i];
      const targetDate = moment(e.DATE, "DD-MM-YY");
      if (
        moment.duration({ from: new Date(), to: targetDate }).asDays() >= -1
      ) {
        e.MOMENT = targetDate;
        selectedDatesArray.push(e);

        if (
          indexOfNearestDate == 0 &&
          e[selectedCategory as keyof typeof e] == "YES"
        ) {
          indexOfNearestDate = i;
          await setNearestDate(e);
        }
      }
    }
    return selectedDatesArray;
  }

  return (
    <>
      {isHydrated && (
        <>
          <div
            className={`${
              mobile || true
                ? "flex flex-col items-center"
                : "grid grid-cols-2 justify-items-center"
            } relative h-full overflow-y-auto w-screen select-none bg-stone-200 dark:bg-[#222222]`}
          >
            {/*  */}
            {/* {!mobile && (
              <div className="h-screen w-full flex flex-col items-center">
                <div className="fixed top-0 h-screen flex flex-col items-center justify-center w-[400px] space-y-2">
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
            )} */}
            {/*  */}
            <div className="container relative flex flex-col h-full overflow-y-auto items-center w-full max-w-[480px] min-w-[350px]">
              {/* header */}
              <div
                className={`${
                  mobile || true
                    ? "max-w-[480px] min-w-[350px] w-full"
                    : "w-1/2 right-0"
                } flex flex-col h-fit fixed top-0 z-10 bg-white space-y-2 shadow-lg dark:bg-[#3b3b3b]`}
              >
                <div className="h-[50px] w-full flex flex-row items-center justify-between px-4 pt-4">
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <Image
                      src={
                        counterOfHowDeerLovesEasterEgg >= 10
                          ? "/logo/logo-icon-pepe.png"
                          : "/logo/logo-icon.png"
                      }
                      width={100}
                      height={100}
                      alt="logo"
                      className="w-[40px] rounded-md"
                    ></Image>
                    <p className="font-light tracking-tight leading-none pr-2">
                      My Dear<br></br>Pass USFK
                    </p>
                    <p
                      className="font-bold w-fit py-1 px-3 rounded-md text-white text-md"
                      style={{
                        backgroundColor:
                          moment
                            .duration({
                              from: new Date(),
                              to: nearestDate.MOMENT as moment.Moment,
                            })
                            .asDays() >= 3
                            ? "black"
                            : "#f871a0",
                      }}
                      onClick={async () => {
                        await setSeletecDate(nearestDate.MOMENT);
                        await setIsCalendarFolded(true);
                        await setCounterOfHowDeerLovesEasterEgg(
                          counterOfHowDeerLovesEasterEgg + 1
                        );
                      }}
                    >
                      D-
                      {Math.ceil(
                        moment
                          .duration({
                            from: new Date().setHours(0, 0, 0),
                            to: nearestDate.MOMENT as moment.Moment,
                          })
                          .asDays()
                      )}
                      {/* {(nearestDate.MOMENT as moment.Moment)
                        .locale("ko")
                        .from(new Date().setHours(0, 0, 0))
                        .replace("in ", "")
                        .replace(" days", "")} */}
                    </p>
                  </div>
                  <Dropdown placement={"bottom-end"}>
                    <DropdownTrigger>
                      <Button
                        size={"md"}
                        variant="bordered"
                        className="border-1 border-black font-bold dark:border-white w-[100px]"
                      >
                        {selectedValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Static Actions"
                      selectionMode={"single"}
                      selectedKeys={selectedKeys}
                      disallowEmptySelection={true}
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
                <div
                  className="flex flex-row gap-2 px-4 pt-3 pb-1 w-full items-center"
                  onClick={() => {
                    toast(
                      (t) => (
                        <div className="flex flex-col gap-4 text-black dark:text-white py-2">
                          <div className="flex flex-row gap-2">
                            <IconInfo width={"25px"} fill="skyblue"></IconInfo>
                            <p className="font-bold">UPDATE_NOTE_20250927</p>
                          </div>
                          <p className="text-xs font-bold">
                            FY2025 USFK Holiday Schedule (Version 3) has been
                            updated
                          </p>
                          <li className="text-xs italic">
                            Add KOREAN_ARMED_FORCES_DAY
                          </li>
                          <li className="text-xs italic">
                            Change dark mode theme color
                          </li>
                        </div>
                      ),
                      { duration: 5000 }
                    );
                  }}
                >
                  <IconInfo width={"30px"} fill="skyblue"></IconInfo>
                  <p className="text-sm opacity-60 underline underline-offset-4 text-clip overflow-clip line-clamp-1 break-all h-fit">
                    [UPDATE_NOTE] FY2025 USFK Holiday Schedule (Version 3) has
                    been updated
                  </p>
                </div>
                {/*  */}
                {isCalendarFolded ||
                  (true && (
                    <Calendar
                      locale={"us"}
                      calendarType={"gregory"}
                      minDetail={"month"}
                      maxDetail={"month"}
                      showFixedNumberOfWeeks
                      className={"h-fit"}
                      view={"month"}
                      value={seletecDate}
                      onClickDay={(value) => {
                        setSeletecDate(value);
                      }}
                      tileContent={({ activeStartDate, date, view }) =>
                        seletedDates.find(
                          (e: any) =>
                            (e.MOMENT as moment.Moment).isSame(moment(date)) &&
                            e[selectedCategory as keyof typeof e] == "YES"
                        ) ? (
                          <p>PASS</p>
                        ) : moment(date).isSame(moment(), "day") ? (
                          <p>Today</p>
                        ) : null
                      }
                      tileClassName={({ activeStartDate, date, view }) =>
                        seletedDates.find(
                          (e: any) =>
                            (e.MOMENT as moment.Moment).isSame(moment(date)) &&
                            e[selectedCategory as keyof typeof e] == "YES"
                        )
                          ? counterOfHowDeerLovesEasterEgg >= 10
                            ? "holiday-pepe"
                            : "holiday"
                          : null
                      }
                    />
                  ))}
                {/*  */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onClickCapture={(e) => {
                    setIsCalendarFolded(!isCalendarFolded);
                  }}
                  className={`${isCalendarFolded ? "" : "rotate-180"} z-50`}
                >
                  <div className="flex flex-col items-center justify-center p-2">
                    <IconUp
                      fill={resolvedTheme == "light" ? "#000" : "#fff"}
                      width={17}
                      height={17}
                    ></IconUp>
                  </div>
                </button>
              </div>
              {/* body */}
              <div className="flex flex-col w-full space-y-2 h-full px-4 bg-white overflow-x-clip dark:bg-[#2b2b2b]">
                {/* body */}
                <div className="h-[120px] w-full"></div>
                {selectedCategory == "KATUSA" && (
                  <>
                    <div className="h-[30px]"></div>
                    <div className="flex flex-col space-y-2">
                      <p className="font-black text-lg">소소한 실험실</p>
                      <Accordion
                        variant={"bordered"}
                        className="rounded-lg w-full h-full"
                      >
                        <AccordionItem
                          key="1"
                          aria-label="전역까지 남은 근무 일수 계산기"
                          startContent={
                            <Image
                              className="h-[50px] w-[50px] rounded-full"
                              src="/logo/logo-icon.png"
                              width={100}
                              height={100}
                              alt="logo"
                            />
                          }
                          title={
                            <p className="text-sm">
                              전역까지 남은 근무 일수 계산기
                            </p>
                          }
                          subtitle={
                            <p className="text-xs">
                              험프리 사슴과 함께 전역까지 남은 근무일수를
                              알아보자
                            </p>
                          }
                          classNames={{
                            subtitle: "break-keep",
                          }}
                        >
                          <div className="flex flex-col w-full h-full py-1 space-y-8 items-center">
                            <BoardHorizontal
                              boardOptions={{
                                workingDayCountSelectedDateProps: moment(
                                  workingDayCountSelectedDate,
                                  "YYYY-MM-DD"
                                ),
                                //
                                numOfWeekendsToETS: weekCounterState,
                                // 전역까지 남은 일수
                                numOfDaysToETS:
                                  Math.ceil(
                                    moment
                                      .duration({
                                        from: moment(new Date(), "YYYY-MM-DD"),
                                        to: moment(
                                          workingDayCountSelectedDate,
                                          "YYYY-MM-DD"
                                        ),
                                      })
                                      .asDays()
                                  ) <= 0
                                    ? 0
                                    : Math.ceil(
                                        moment
                                          .duration({
                                            from: moment(
                                              new Date(),
                                              "YYYY-MM-DD"
                                            ),
                                            to: moment(
                                              workingDayCountSelectedDate,
                                              "YYYY-MM-DD"
                                            ),
                                          })
                                          .asDays()
                                      ),
                                // 전역까지 남은 휴가 일수
                                holdingLeaveCount: holdingLeaveCount,
                                holdingCompensationPassCount:
                                  holdingCompensationPassCount,
                                // 전역까지 남은 패스 일수
                                numOfPassToETS:
                                  seletedDates.filter(
                                    (e: any) =>
                                      e[selectedCategory as keyof typeof e] ==
                                        "YES" &&
                                      (
                                        e.MOMENT as moment.Moment
                                      ).isSameOrBefore(
                                        moment(
                                          workingDayCountSelectedDate,
                                          "YYYY-MM-DD"
                                        )
                                      )
                                  ).length + +holdingCompensationPassCount,
                                //
                                numOfWorkingDaysToETS:
                                  Math.ceil(
                                    moment
                                      .duration({
                                        from: moment(new Date(), "YYYY-MM-DD"),
                                        to: moment(
                                          workingDayCountSelectedDate,
                                          "YYYY-MM-DD"
                                        ),
                                      })
                                      .asDays()
                                  ) -
                                    weekCounterState -
                                    +holdingLeaveCount -
                                    +holdingCompensationPassCount -
                                    seletedDates.filter(
                                      (e: any) =>
                                        e[selectedCategory as keyof typeof e] ==
                                          "YES" &&
                                        (
                                          e.MOMENT as moment.Moment
                                        ).isSameOrBefore(
                                          moment(
                                            workingDayCountSelectedDate,
                                            "YYYY-MM-DD"
                                          )
                                        )
                                    ).length <=
                                  0
                                    ? 0
                                    : Math.ceil(
                                        moment
                                          .duration({
                                            from: moment(
                                              new Date(),
                                              "YYYY-MM-DD"
                                            ),
                                            to: moment(
                                              workingDayCountSelectedDate,
                                              "YYYY-MM-DD"
                                            ),
                                          })
                                          .asDays()
                                      ) -
                                      weekCounterState -
                                      +holdingLeaveCount -
                                      +holdingCompensationPassCount -
                                      seletedDates.filter(
                                        (e: any) =>
                                          e[
                                            selectedCategory as keyof typeof e
                                          ] == "YES" &&
                                          (
                                            e.MOMENT as moment.Moment
                                          ).isSameOrBefore(
                                            moment(
                                              workingDayCountSelectedDate,
                                              "YYYY-MM-DD"
                                            )
                                          )
                                      ).length,
                              }}
                            ></BoardHorizontal>
                            <DatePicker
                              labelPlacement={"outside"}
                              value={workingDayCountSelectedDate}
                              onChange={(v) => {
                                setWorkingDayCountSelectedDate(v);

                                let start = moment(new Date(), "YYYY-MM-DD"); //Pick any format
                                let end = moment(v, "YYYY-MM-DD").add(
                                  1,
                                  "days"
                                );
                                let weekendCounter = 0;

                                while (start <= end) {
                                  if (
                                    start.format("ddd") == "Sat" ||
                                    start.format("ddd") == "Sun"
                                  ) {
                                    weekendCounter++; //add 1 to your counter if its not a weekend day
                                  }
                                  start = moment(start, "YYYY-MM-DD").add(
                                    1,
                                    "days"
                                  ); //increment by one day
                                }
                                console.log(weekendCounter);
                                setWeekCounterState(weekendCounter);
                              }}
                              // fullWidth
                              minValue={today(getLocalTimeZone())}
                              size={"lg"}
                              label="나의 작고 소중한 전역일"
                              className="h-fit"
                              isRequired
                            />
                            <Input
                              isRequired={true}
                              labelPlacement={"outside"}
                              className="z-0 h-full pt-6"
                              size={"lg"}
                              label={"남은 휴가 일수"}
                              classNames={{ label: "text-sm" }}
                              type="number"
                              isInvalid={+holdingLeaveCount < 0}
                              value={holdingLeaveCount}
                              onValueChange={(v) => {
                                if (+v >= 0) {
                                  setHoldingLeaveCount(v);
                                }
                              }}
                            ></Input>
                            <Input
                              isRequired={false}
                              labelPlacement={"outside"}
                              className="z-0 h-full pt-6"
                              size={"lg"}
                              label={"컴팬 패스 일수"}
                              classNames={{ label: "text-sm" }}
                              type="number"
                              isInvalid={+holdingCompensationPassCount < 0}
                              value={holdingCompensationPassCount}
                              onValueChange={(v) => {
                                if (+v >= 0) {
                                  setHoldingCompensationPassCount(v);
                                }
                              }}
                            ></Input>
                            <div className="flex flex-col space-y-4 w-full items-center pb-2">
                              <Button
                                radius={"lg"}
                                variant={"faded"}
                                className="h-[60px] w-full bg-black text-white font-bold border-0"
                                fullWidth
                                size={"lg"}
                                onPress={() => {
                                  const target =
                                    document.getElementById("workingDayCount");
                                  if (!target) {
                                    return alert("저장에 실패");
                                  }
                                  html2canvas(target, {
                                    // width: 2480,
                                    //   height: 3508,
                                    scale: 3,
                                  }).then((canvas) => {
                                    const link = document.createElement("a");
                                    document.body.appendChild(link);
                                    link.href = canvas.toDataURL("image/png");
                                    link.download = "workingDayCount.png"; // 다운로드 이미지 파일 이름
                                    link.click();
                                    document.body.removeChild(link);
                                  });
                                }}
                              >
                                <p>이미지 저장하기</p>
                              </Button>
                              <Button
                                radius={"lg"}
                                variant={"faded"}
                                className="h-[60px] w-full bg-[#FEE500] text-[#000000] font-bold border-0"
                                fullWidth
                                size={"lg"}
                                isLoading={false}
                                // isDisabled
                                onPress={() => {
                                  const target =
                                    document.getElementById("workingDayCount");
                                  if (!target) {
                                    return alert("저장에 실패");
                                  }
                                  html2canvas(target, {
                                    // width: 2480,
                                    // height: 1200,
                                    scale: 3,
                                  }).then(async (canvas) => {
                                    var imgDataUrl =
                                      canvas.toDataURL("image/png");

                                    var blobBin = atob(
                                      imgDataUrl.split(",")[1]
                                    ); // base64 데이터 디코딩
                                    var array = [];
                                    for (var i = 0; i < blobBin.length; i++) {
                                      array.push(blobBin.charCodeAt(i));
                                    }
                                    var file = await new File(
                                      [new Uint8Array(array)],
                                      "workingDayCount.png",
                                      { type: "image/png" }
                                    );
                                    await navigator
                                      .share?.({
                                        title: `전역까지 남은 근무일수 계산하기`,
                                        text: `나의 전역까지 실제 근무하는 날은 얼마나 될까? my-dear-pass-usfk from "https://my-dear-pass-usfk.vercel.app/"`,
                                        files: [file],
                                      })
                                      .catch(console.error);
                                  });
                                  // Optionally virbrate slightly.
                                  navigator.vibrate?.([30, 20, 10]);
                                }}
                              >
                                <p>이미지 공유하기</p>
                              </Button>
                            </div>
                          </div>
                        </AccordionItem>
                        <AccordionItem
                          key="2"
                          aria-label="CMAS 계산기"
                          startContent={
                            <Image
                              className="h-[50px] w-[50px] rounded-full"
                              src="/image/pepe-math.jpg"
                              width={100}
                              height={100}
                              alt="logo"
                            />
                          }
                          title={
                            <p className="text-sm">
                              CMAS 포인트 계산기 & 장바구니
                            </p>
                          }
                          subtitle={
                            <p className="text-xs">
                              카투사 페페와 함께 CMAS 포인트를 계산하고
                              쇼핑해보자.
                            </p>
                          }
                          classNames={{
                            subtitle: "break-keep",
                          }}
                        >
                          <div className="flex flex-col w-full h-full py-1 space-y-8 items-center">
                            <p className="py-4 opacity-50">Coming soon</p>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </>
                )}
                {seletedDates.map((e: any, i: number) => {
                  return (
                    <div key={i} className="w-full h-fit space-y-4">
                      {e ===
                        seletedDates.filter(
                          (j: any) =>
                            (j.MOMENT as moment.Moment).format("YY") ==
                              (e.MOMENT as moment.Moment).format("YY") &&
                            (j.MOMENT as moment.Moment).format("MMM") ==
                              (e.MOMENT as moment.Moment).format("MMM")
                        )[0] && (
                        <div className="pt-8">
                          <div className="flex flex-row w-full justify-between items-end">
                            <p className="font-light text-xl">
                              {`
                              ${(e.MOMENT as moment.Moment).format("MMM")} / ${(
                                e.MOMENT as moment.Moment
                              ).format("YY")}`}
                            </p>
                          </div>
                          <Divider className="bg-[#2b2b2b]/50 dark:bg-white/50"></Divider>
                        </div>
                      )}
                      <div
                        // data-aos={mobile ? undefined : "fade-left"}
                        className="flex flex-row space-x-4 pl-4"
                      >
                        <IconCheck
                          width={30}
                          fill={`${
                            e[selectedCategory as keyof typeof e] == "YES"
                              ? moment
                                  .duration({
                                    from: new Date(),
                                    to: e.MOMENT as moment.Moment,
                                  })
                                  .asDays() <= 3
                                ? "#FDD0DF"
                                : "#A2E9C1"
                              : "#00000000"
                          }`}
                        ></IconCheck>
                        <div
                          onClick={async () => {
                            await setSeletecDate(e.MOMENT);
                            await setIsCalendarFolded(true);
                          }}
                          key={i}
                          className={`${
                            (e.MOMENT as moment.Moment).isSame(
                              moment(seletecDate)
                            )
                              ? "border-dashed"
                              : ""
                          } w-full bg-center bg-cover bg-blend-darken bg-[#2b2b2b] text-start`}
                          style={{
                            backgroundColor:
                              e[selectedCategory as keyof typeof e] == "YES"
                                ? moment
                                    .duration({
                                      from: new Date(),
                                      to: e.MOMENT as moment.Moment,
                                    })
                                    .asDays() <= 3
                                  ? "#FDD0DF"
                                  : "#A2E9C1"
                                : "#E4E4E7",
                            boxShadow: `inset 0 0 0 ${
                              (e.MOMENT as moment.Moment).isSame(
                                moment(seletecDate)
                              )
                                ? "3px #F871A0"
                                : "1px #000000"
                            } `,
                            backgroundImage:
                              counterOfHowDeerLovesEasterEgg >= 10 &&
                              e[selectedCategory as keyof typeof e] == "NO"
                                ? `url("../../logo/logo-icon-pepe.png")`
                                : "",
                            backgroundPositionX: 5 + 5 * i,
                          }}
                        >
                          <div className="w-full h-full flex flex-col text-black justify-center select-none px-4 py-3">
                            <p className="font-bold text-sm">
                              {(e.MOMENT as moment.Moment).format(
                                "DD / MMM / YY"
                              )}
                              , {e.DAY}
                            </p>
                            <p className="text-xs line-clamp-1">{e.HOLIDAY}</p>
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
        </>
      )}
      <Toaster
        toastOptions={{
          position: "top-center",
          style: {
            maxWidth: 350,
            backgroundColor: resolvedTheme == "light" ? "#ffffff" : "#2b2b2b",
          },
        }}
      ></Toaster>
    </>
  );
}

function BoardHorizontal(props: any) {
  return (
    <div
      id="workingDayCount"
      className="relative w-[350px] aspect-[7/5] flex flex-col justify-center items-center h-[250px] z-0 select-none"
    >
      <div className="relative flex flex-col w-[250px] gap-1 items-center z-10 text-black h-fit">
        <div className="flex flex-row w-full justify-between text-xl font-black items-center pb-2">
          <p className="w-fit">전역일</p>
          <p className="w-fit">
            {(
              props.boardOptions
                .workingDayCountSelectedDateProps as moment.Moment
            ).format("YYYY년 MM월 DD일")}
          </p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p className="w-full">전역까지 남은 일수:</p>
          <p className="w-fit">{props.boardOptions.numOfDaysToETS}</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p className="w-full">전역까지 남은 주말 일수:</p>
          <p className="w-fit">-{props.boardOptions.numOfWeekendsToETS}</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p className="w-full">전역까지 남은 휴가 일수:</p>
          <p className="w-fit">-{props.boardOptions.holdingLeaveCount}</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p className="w-full">전역까지 남은 패스 일수:</p>
          <p className="w-fit">-{props.boardOptions.numOfPassToETS}</p>
        </div>
        <Divider className="bg-black"></Divider>
        <div className="flex flex-row w-full justify-between font-bold">
          <p className="w-full">전역까지 남은 근무 일수:</p>
          <p className="w-fit">{props.boardOptions.numOfWorkingDaysToETS}</p>
        </div>
      </div>
      <div
        className="absolute w-[200%] scale-50 z-0 aspect-[7/5] bg-contain flex flex-col justify-center items-center border-2 drop-shadow-sm"
        style={{
          backgroundImage: `url(/image/award-template-1.png)`,
        }}
      ></div>
    </div>
  );
}
