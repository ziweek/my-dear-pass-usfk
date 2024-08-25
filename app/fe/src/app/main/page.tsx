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
import { IconCheck, IconUp } from "@/components/common/icon";
import { dataset } from "@/components/common/dataset";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Image from "next/image";
import { useIsMobile } from "@/hook/useMediaQuery";
import moment from "moment";
// import Footer from "@/components/footer";

export default function MainPage(props: any) {
	const [isHydrated, setIsHydrated] = useState(false);
	const [isCalendarFolded, setIsCalendarFolded] = useState(false);

	const [seletecDate, setSeletecDate] = useState(new Date());
	const [seletedDates, setSeletedDates] = useState<any>([]);
	const [nearestDate, setNearestDate] = useState<any>();

	const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["KATUSA"]));
	const [selectedCategory, setSelectedCategory] = useState("KATUSA");
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
    // AOS.init({
    //   disable: mobile ? false : false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    //   anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    //   once: true, // whether animation should happen only once - while scrolling down
    //   offset: 120, // offset (in px) from the original trigger point
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

		const targetDates = dataset;
		// const targetDates = dataset.filter(
		//   (e) => e[selectedCategory as keyof typeof e] == "YES"
		// );

		for (let i = 0; i < targetDates.length; i++) {
			const e: any = targetDates[i];
			const targetDate = moment(e.DATE, "DD-MM-YY");
			if (moment.duration({ from: new Date(), to: targetDate }).asDays() >= 0) {
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
            <div className="relative flex flex-col h-full overflow-y-auto items-center w-fit">
              {/* header */}
              <div className="flex flex-col h-fit w-full fixed top-0 z-10 max-w-[420px] bg-white space-y-2 shadow-lg border-b-1">
                <div className="h-[50px] w-screen flex flex-row items-center justify-between px-4 max-w-[420px] pt-4">
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <Image
                      src={"/logo/logo-icon.png"}
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
                      }}
                    >
                      D-
                      {(nearestDate.MOMENT as moment.Moment)
                        .locale("ko")
                        .from(new Date().setHours(0, 0, 0))
                        .replace("in ", "")
                        .replace(" days", "")}
                    </p>
                  </div>
                  <Dropdown placement={"bottom-end"} backdrop={"blur"}>
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
                {isCalendarFolded && (
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
                        ? "holiday"
                        : null
                    }
                  />
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
                <div className="h-[80px] w-full"></div>
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
                          <Divider className="bg-black/50"></Divider>
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
                              ? "#A2E9C1"
                              : "#E4E4E7"
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
                          } w-full bg-center bg-cover bg-blend-darken bg-black text-start`}
                          style={{
                            backgroundColor:
                              e[selectedCategory as keyof typeof e] == "YES"
                                ? `#A2E9C1`
                                : "#E4E4E7",
                            boxShadow: `inset 0 0 0 ${
                              (e.MOMENT as moment.Moment).isSame(
                                moment(seletecDate)
                              )
                                ? "3px #F871A0"
                                : "1px #000000"
                            } `,
                            // backgroundImage:
                            //   e[selectedCategory as keyof typeof e] == "YES"
                            //     ? `url("../../logo/logo-icon-pepe.png")`
                            //     : "",
                            // backgroundPositionX: 5 + 50 * i,
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
    </>
  );

}
