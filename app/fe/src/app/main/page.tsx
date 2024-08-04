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
} from "@nextui-org/react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import Image from "next/image";
import { useState, useMemo } from "react";
import { IconUp } from "@/components/common/icon";
import Footer from "@/components/footer";

const dataset = [
  {
    DATE: "3-Oct-22",
    DAY: "MONDAY",
    HOLIDAY: "NATIONAL FOUNDATION DAY (ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "NO",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "NO",
  },
  {
    DATE: "7-Oct-22",
    DAY: "FRIDAY",
    HOLIDAY: "COLUMBUS DAY (US) TRAINING HOLIDAY",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "9-Oct-22",
    DAY: "SUNDAY",
    HOLIDAY: "HANGUL (KOREAN LANGUAGE) DAY (ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "NO",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "10-Oct-22",
    DAY: "MONDAY",
    HOLIDAY: "HANGUL (KOREAN LANGUAGE) DAY ALT HOLIDAY",
    US: "NO",
    ROK: "YES",
    KATUSA: "NO",
    "DOD (US)": "YES",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "10-Oct-22",
    DAY: "MONDAY",
    HOLIDAY: "COLUMBUS DAY (US)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "YES",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "10-Nov-22",
    DAY: "THURSDAY",
    HOLIDAY: "TRAINING HOLIDAY (US) - VETERANS DAY",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "11-Nov-22",
    DAY: "FRIDAY",
    HOLIDAY: "VETERANS DAY (US) OBSERVED",
    US: "YES",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "YES",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "11-Nov-22",
    DAY: "FRIDAY",
    HOLIDAY: "KOREAN EMPLOYEE UNION FOUNDATION DAY",
    US: "NO",
    ROK: "NO",
    KATUSA: "NO",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "NO",
  },
  {
    DATE: "24-Nov-22",
    DAY: "THURSDAY",
    HOLIDAY: "THANKSGIVING DAY (US)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "25-Nov-22",
    DAY: "FRIDAY",
    HOLIDAY: "THANKSGIVING TRAINING HOLIDAY (US)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "23-Dec-22",
    DAY: "FRIDAY",
    HOLIDAY: "CHRISTMAS DAY (US) TRAINING HOLIDAY",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "25-Dec-22",
    DAY: "SUNDAY",
    HOLIDAY: "CHRISTMAS DAY (US/ROK)",
    US: "YES",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "YES",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "26-Dec-22",
    DAY: "MONDAY",
    HOLIDAY: "CHRISTMAS HOLIDAY (IN LIEU)",
    US: "YES",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "YES",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "30-Dec-22",
    DAY: "FRIDAY",
    HOLIDAY: "NEW YEAR'S DAY (US) TRAINING HOLIDAY",
    US: "YES",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "1-Jan-23",
    DAY: "SUNDAY",
    HOLIDAY: "NEW YEAR'S DAY (US/ROK)",
    US: "YES",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "YES",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "2-Jan-23",
    DAY: "MONDAY",
    HOLIDAY: "NEW YEAR'S DAY (US/ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "YES",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "2-Jan-23",
    DAY: "MONDAY",
    HOLIDAY: "NEW YEAR'S DAY (IN LIEU)",
    US: "NO",
    ROK: "NO",
    KATUSA: "NO",
    "DOD (US)": "YES",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "13-Jan-23",
    DAY: "FRIDAY",
    HOLIDAY: "DR. MLK DAY (US) TRAINING HOLIDAY",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "16-Jan-23",
    DAY: "MONDAY",
    HOLIDAY: "DR. MARTIN LUTHER KING DAY (US)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "21-Jan-23",
    DAY: "SATURDAY",
    HOLIDAY: "LUNAR NEW YEAR (ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "22-Jan-23",
    DAY: "SUNDAY",
    HOLIDAY: "LUNAR NEW YEAR (ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "23-Jan-23",
    DAY: "MONDAY",
    HOLIDAY: "LUNAR NEW YEAR (US/ROK)",
    US: "YES",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "YES",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "24-Jan-23",
    DAY: "TUESDAY",
    HOLIDAY: "LUNAR NEW YEAR (ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "YES",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "13-Feb-23",
    DAY: "MONDAY",
    HOLIDAY: "TRAINING HOLIDAY - SUPERBOWL LVII(57th) (US)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "17-Feb-23",
    DAY: "FRIDAY",
    HOLIDAY: "PRESIDENT'S DAY (US) TRAINING HOLIDAY",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "20-Feb-23",
    DAY: "MONDAY",
    HOLIDAY: "PRESIDENT'S DAY (US)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "1-Mar-23",
    DAY: "WEDNESDAY",
    HOLIDAY: "INDEPENDENCE MOVEMENT DAY (ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "NO",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "27-Mar-23",
    DAY: "MONDAY",
    HOLIDAY: "TRAINING HOLIDAY",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "28-Mar-23",
    DAY: "TUESDAY",
    HOLIDAY: "TRAINING HOLIDAY",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "1-May-23",
    DAY: "MONDAY",
    HOLIDAY: "LABOR DAY (USFK LN ONLY)",
    US: "NO",
    ROK: "NO",
    KATUSA: "NO",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "5-May-23",
    DAY: "FRIDAY",
    HOLIDAY: "CHILDREN'S DAY (ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "NO",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "26-May-23",
    DAY: "FRIDAY",
    HOLIDAY: "TRAINING HOLIDAY (US) - MEMORIAL DAY",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "29-May-23",
    DAY: "MONDAY",
    HOLIDAY: "BUDDHA'S BIRTHDAY (ROK) OBSERVED",
    US: "NO",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "29-May-23",
    DAY: "MONDAY",
    HOLIDAY: "MEMORIAL DAY (US)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "YES",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "6-Jun-23",
    DAY: "TUESDAY",
    HOLIDAY: "MEMORIAL DAY (ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "NO",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "16-Jun-23",
    DAY: "FRIDAY",
    HOLIDAY: "JUNETEENTH TRAINING HOLIDAY",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "19-Jun-23",
    DAY: "MONDAY",
    HOLIDAY: "JUNETEENTH",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "3-Jul-23",
    DAY: "MONDAY",
    HOLIDAY: "INDEPENDENCE DAY TRAINING HOLIDAY (US)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "4-Jul-23",
    DAY: "TUESDAY",
    HOLIDAY: "INDEPENDENCE DAY (US)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "15-Aug-23",
    DAY: "TUESDAY",
    HOLIDAY: "LIBERATION DAY (ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "NO",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "4-Sep-23",
    DAY: "MONDAY",
    HOLIDAY: "LABOR DAY (US)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "YES",
    "USFK (LN)": "NO",
    "CFC (KN)": "YES",
  },
  {
    DATE: "5-Sep-23",
    DAY: "TUESDAY",
    HOLIDAY: "LABOR DAY TRAINING HOLIDAY (US)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "15-Sep-23",
    DAY: "FRIDAY",
    HOLIDAY: "TRAINING HOLIDAY",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "18-Sep-23",
    DAY: "MONDAY",
    HOLIDAY: "TRAINING HOLIDAY (EXERCISE)",
    US: "YES",
    ROK: "NO",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "NO",
    "CFC (KN)": "NO",
  },
  {
    DATE: "28-Sep-23",
    DAY: "THURSDAY",
    HOLIDAY: "CHUSEOK (ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "NO",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "29-Sep-23",
    DAY: "FRIDAY",
    HOLIDAY: "CHUSEOK (US/ROK)",
    US: "YES",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
  {
    DATE: "30-Sep-23",
    DAY: "SATURDAY",
    HOLIDAY: "CHUSEOK (ROK)",
    US: "NO",
    ROK: "YES",
    KATUSA: "YES",
    "DOD (US)": "NO",
    "USFK (LN)": "YES",
    "CFC (KN)": "YES",
  },
];

const aa = new CalendarDate(2024, 8, 7);

export default function MainPage(props: any) {
  const [isCalendarFolded, setIsCalendarFolded] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["US"]));
  const [selectedCategory, setSelectedCategory] = useState<string>("US");

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  return (
    <div
      className="h-full min-h-screen w-screen grid justify-items-stretch overflow-y-auto max-w-[600px] mx-auto"
      style={{ gridTemplateRows: "auto 1fr auto" }}
    >
      {/* header */}
      <div className="flex flex-col h-fit w-full fixed top-0 bg-white z-10">
        <div className="h-[60px] w-screen flex flex-row items-center justify-between px-4 bg-white max-w-[600px]">
          <p>logo</p>
          <p>team</p>
        </div>
        <div className="w-full h-fit flex flex-col items-center bg-white space-y-2 border-b-1 shadow-md pb-1 sticky top-1">
          <div className="w-full flex h-fit flex-row justify-between px-4 space-x-4">
            <Dropdown placement={"bottom"}>
              <DropdownTrigger>
                <Button
                  fullWidth
                  variant="bordered"
                  className="border-1 border-black w-full h-[60px] font-bold text-lg"
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
                  gridHeaderRow: "justify-between",
                  gridWrapper: "rounded-none w-full h-full",
                  grid: "w-full h-full",
                  gridBody:
                    "w-full h-full flex flex-col justify-around bg-white",
                  gridBodyRow: "justify-evenly h-full",
                  content: "w-full h-full",
                }}
                showShadow={false}
                className="w-full flex flex-col h-[320px]"
                lang={"en"}
              />
              <div className="w-full flex h-fit flex-row justify-end px-4 space-x-2 items-end">
                <p className="opacity-50 text-sm">Subscribe in</p>
                <Button
                  // radius={"full"}
                  variant={"bordered"}
                  className="bg-white border-1 border-black"
                  isIconOnly
                  startContent={
                    <div className="flex flex-col items-center justify-center overflow-clip w-[40px] h-full">
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
      <div className="h-full w-full flex flex-col items-center justify-start overflow-hidden z-0 pt-48">
        <div className="h-full w-full space-y-4 p-4">
          {/* Footer */}
          <Footer
            isFixed
            title={"So-When-is-4day"}
            subtitle={"If any issues, let us know."}
          ></Footer>
          {/* <div className="h-full w-full space-y-4 p-4 overflow-y-auto pb-8"> */}
          {dataset.map((e, i: number) => {
            return (
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
                <div className="w-full h-full flex flex-col p-4 text-white justify-between">
                  <div className="w-full h-fit flex flex-col text-white justify-between">
                    <p className="text-md">
                      {e.DATE}, {e.DAY}
                    </p>
                    <p className="text-md">{e.HOLIDAY}</p>
                  </div>
                  <p className="text-3xl font-bold w-full text-right">
                    {selectedCategory} - {e[selectedCategory as keyof typeof e]}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
