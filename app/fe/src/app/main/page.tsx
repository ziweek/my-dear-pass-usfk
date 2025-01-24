"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { dataset } from "@/components/common/dataset";
import { useIsMobile } from "@/hook/useMediaQuery";
import { format, differenceInDays, parse, getMonth, getYear } from "date-fns";
import { IconUp } from "@/components/common/icon";
import { useTheme } from "next-themes";
import { Calendar1Icon, LucideBanana, MoreVertical } from "lucide-react";

interface Holiday {
  DATE: string;
  DAY: string;
  HOLIDAY: string;
  US: string;
  ROK: string;
  KATUSA: string;
  "DOD(US)": string;
  "USFK(LN)": string;
  "CFC(KN)": string;
  "DODEA(US)": string;
}

type FilterKey =
  | "ALL"
  | "US"
  | "ROK"
  | "KATUSA"
  | "DOD(US)"
  | "USFK(LN)"
  | "CFC(KN)"
  | "DODEA(US)";

const filterOptions = [
  { label: "All", value: "ALL", color: "default" },
  { label: "US", value: "US", color: "primary" },
  { label: "ROK", value: "ROK", color: "danger" },
  { label: "KATUSA", value: "KATUSA", color: "success" },
  { label: "DOD(US)", value: "DOD(US)", color: "warning" },
  { label: "USFK(LN)", value: "USFK(LN)", color: "secondary" },
  { label: "CFC(KN)", value: "CFC(KN)", color: "default" },
  { label: "DODEA(US)", value: "DODEA(US)", color: "primary" },
] as const;

export default function Main2Page() {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedHoliday, setSelectedHoliday] = useState<{
    name: string;
    date: string;
  } | null>(null);
  const [showPastHolidays, setShowPastHolidays] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");
  const isMobile = useIsMobile();
  const [mobile, setMobile] = useState<boolean>(false);
  const { systemTheme } = useTheme();

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

  // Convert dataset dates to proper Date objects
  const holidays = dataset.map((holiday) => {
    const [day, month, year] = holiday.DATE.split("-");
    return {
      ...holiday,
      dateObj: parse(`${day}-${month}-20${year}`, "dd-MM-yyyy", new Date()),
    };
  });

  // Filter and sort holidays
  const filteredHolidays = holidays
    .filter((holiday) => showPastHolidays || holiday.dateObj >= new Date())
    .filter((holiday) => {
      if (!activeFilter || activeFilter === "ALL") return true;
      if (activeFilter === "DODEA(US)") {
        return holiday[activeFilter] === "SMBRK";
      }
      return holiday[activeFilter] === "YES";
    })
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

  // Find nearest upcoming holiday
  const nearestHoliday = filteredHolidays.find((holiday) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return holiday.dateObj >= today;
  });
  const daysUntilNextHoliday = nearestHoliday
    ? differenceInDays(nearestHoliday.dateObj, new Date())
    : null;

  // Group holidays by month
  const groupedHolidays = filteredHolidays.reduce((acc, holiday) => {
    const monthKey = format(holiday.dateObj, "yyyy-MM");
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(holiday);
    return acc;
  }, {} as Record<string, typeof filteredHolidays>);

  // Calendar tile class based on holidays
  const getTileClassName = ({ date }: { date: Date }) => {
    const holiday = holidays.find(
      (h) =>
        h.dateObj.getFullYear() === date.getFullYear() &&
        h.dateObj.getMonth() === date.getMonth() &&
        h.dateObj.getDate() === date.getDate()
    );

    if (!holiday) return "";

    let classes = [];

    // Check if this holiday matches the current filter
    const matchesFilter =
      !activeFilter ||
      activeFilter === "ALL" ||
      (activeFilter === "DODEA(US)"
        ? holiday[activeFilter] === "SMBRK"
        : holiday[activeFilter] === "YES");

    if (matchesFilter) {
      classes.push("holiday-highlight");
    }

    if (holiday) {
      classes.push("holiday-date");
    }

    return classes.join(" ");
  };

  // Handle holiday selection
  const handleHolidaySelect = async (holiday: Holiday) => {
    const currentSelection = { name: holiday.HOLIDAY, date: holiday.DATE };
    if (
      selectedHoliday?.name === holiday.HOLIDAY &&
      selectedHoliday?.date === holiday.DATE
    ) {
      await setDate(new Date());
      await setSelectedHoliday(null);
      await setShowCalendar(false);
      await console.log(11, currentSelection, selectedHoliday);
    } else {
      await setSelectedHoliday(currentSelection);
      const [day, month, year] = holiday.DATE.split("-");
      const parsedDate = await parse(
        `${day}-${month}-20${year}`,
        "dd-MM-yyyy",
        new Date()
      );
      await setDate(parsedDate);

      await setShowCalendar(true);
      await console.log(22, currentSelection, selectedHoliday);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#FAF9F6] dark:bg-[#262627] text-black dark:text-white transition-colors duration-300`}
    >
      <div className="w-full max-w-7xl mx-auto pb-4 min-h-screen">
        {/* Calendar and Holiday List */}
        <div
          className={`w-full ${
            !mobile ? "grid grid-cols-2 gap-4" : "flex flex-col gap-4"
          }`}
        >
          {/* Calendar Section */}
          <div
            id="calendar-section"
            className={`w-full sticky top-0 z-30 bg-[#FAF9F6] dark:bg-[#262627] rounded-b-2xl`}
          >
            <Card
              className="w-full bg-white dark:bg-[#3B3B3B] shadow-sm rounded-t-none drop-shadow-md"
              shadow={"lg"}
            >
              <CardBody>
                <div className="bg-white dark:bg-[#3B3B3B] z-40 flex justify-between items-center">
                  <h3 className="font-bold text-black dark:text-white">
                    My Dear Pass USFK
                  </h3>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        variant="light"
                        className="text-black dark:text-white w-fit"
                      >
                        <p className="opacity-70 pl-2">{activeFilter}</p>
                        <MoreVertical size={20} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Filter Options"
                      variant="light"
                      disabledKeys={[]}
                    >
                      <DropdownSection
                        showDivider
                        title="Filter"
                        items={filterOptions}
                      >
                        {(option) => (
                          <DropdownItem
                            key={option.value}
                            className={`text-black dark:text-white ${
                              activeFilter === option.value
                                ? "bg-gray-200 dark:bg-gray-700"
                                : ""
                            }`}
                            onClick={() =>
                              setActiveFilter(option.value as FilterKey)
                            }
                          >
                            {option.label}
                          </DropdownItem>
                        )}
                      </DropdownSection>
                      <DropdownSection title="Options">
                        <DropdownItem
                          key="past-holidays"
                          className="text-black dark:text-white"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs">Show Past Holidays</span>
                            <input
                              type="checkbox"
                              checked={showPastHolidays}
                              onChange={(e) =>
                                setShowPastHolidays(e.target.checked)
                              }
                              className="form-checkbox h-4 w-4 text-black dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 rounded"
                            />
                          </div>
                        </DropdownItem>
                      </DropdownSection>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="flex flex-wrap gap-4 my-1 items-center">
                  {!showCalendar && nearestHoliday && (
                    <div className="m-auto text-center pt-2">
                      <p className="text-xs">Next Holiday:</p>
                      <p className="font-bold text-sm">
                        {nearestHoliday.HOLIDAY}
                      </p>
                      <p className="text-sm text-blue-500 dark:text-blue-300">
                        D-{daysUntilNextHoliday} (
                        {format(nearestHoliday.dateObj, "MMM d, yyyy")})
                      </p>
                    </div>
                  )}
                </div>
              </CardBody>
              <div className="flex flex-wrap items-center">
                <Calendar
                  minDetail={"month"}
                  view={"month"}
                  maxDetail={"month"}
                  showFixedNumberOfWeeks
                  value={date}
                  className={`w-full h-full ${
                    !showCalendar && "hidden"
                  } bg-white dark:bg-gray-600/80 rounded-lg`}
                  tileClassName={getTileClassName}
                  locale="en-US"
                  onChange={(value) => {
                    if (value instanceof Date) {
                      setDate(value);
                      // Clear holiday selection when manually selecting a date
                      setSelectedHoliday(null);
                    }
                  }}
                />
              </div>
              <div className={`mx-auto ${showCalendar ? "" : "rotate-180"}`}>
                <Button
                  isIconOnly
                  variant="light"
                  className="text-black dark:text-white hover:text-black dark:hover:text-white"
                  onClick={() => setShowCalendar(!showCalendar)}
                  disableAnimation
                >
                  <IconUp
                    width={15}
                    fill={systemTheme == "dark" ? "#ffffff" : "#000000"}
                  />
                </Button>
              </div>
            </Card>
          </div>

          {/* Holiday List Section */}
          <div className="w-full py-4 relative z-20 px-4">
            {/* Holiday List */}
            <div className="space-y-6">
              {Object.entries(groupedHolidays).map(([monthKey, holidays]) => (
                <div key={monthKey} className="space-y-4">
                  <div
                    id={`month-${monthKey}`}
                    className={`bg-[#FCCFDB] dark:bg-[#693E4D] py-4 z-20 rounded-lg shadow-sm sticky ${
                      showCalendar ? "top-[520px]" : "top-48"
                    }`}
                  >
                    <h3 className="text-sm font-bold px-4">
                      {format(new Date(monthKey), "MMMM yyyy")}
                    </h3>
                  </div>
                  <div
                    className={`grid grid-cols-1 gap-4 ${mobile ? "px-2" : ""}`}
                  >
                    {holidays.map((holiday, index) => {
                      const isPast = holiday.dateObj < new Date();
                      return (
                        <Card
                          key={index}
                          isPressable
                          onPress={() => handleHolidaySelect(holiday)}
                          className={`
                          ${
                            selectedHoliday?.name === holiday.HOLIDAY &&
                            selectedHoliday?.date === holiday.DATE
                              ? "shadow-inner"
                              : ""
                          }
                          ${isPast ? "opacity-50" : ""}
                          transition-all duration-200 bg-white dark:bg-zinc-700
                        `}
                        >
                          <CardBody>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-xs mb-2 text-black dark:text-white">
                                  {holiday.HOLIDAY}
                                </h3>
                                <p className="text-xs text-black dark:text-white">
                                  {format(holiday.dateObj, "MMMM d, yyyy")} (
                                  {holiday.DAY})
                                </p>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  isPast
                                    ? "bg-gray-100 text-black"
                                    : "bg-blue-100 text-black"
                                }`}
                              >
                                {isPast ? "Past" : "Upcoming"}
                              </span>
                            </div>
                            <div className="flex gap-2 mt-2">
                              {holiday.US === "YES" && (
                                <span className="px-2 py-1 text-xs bg-blue-100 rounded text-black">
                                  US
                                </span>
                              )}
                              {holiday.ROK === "YES" && (
                                <span className="px-2 py-1 text-xs bg-red-100 rounded text-black">
                                  ROK
                                </span>
                              )}
                              {holiday.KATUSA === "YES" && (
                                <span className="px-2 py-1 text-xs bg-green-100 rounded text-black">
                                  KATUSA
                                </span>
                              )}
                            </div>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Footer component
const Footer = () => {
  return (
    <footer className="bg-white drop-shadow-md dark:bg-[#3b3b3b] text-black dark:text-white py-4 mt-8 sticky bottom-0 z-40">
      <div className="container mx-auto px-4 grid grid-cols-2 gap-4 pb-4">
        <div className="calendar-section m-auto">
          <Button variant={"light"} disableRipple>
            <div className="flex flex-col items-center space-y-1">
              <Calendar1Icon width={20}></Calendar1Icon>
              <p className="text-xs">Calendar</p>
            </div>
          </Button>
        </div>
        <div className="lab-section m-auto">
          <Button variant={"light"} disabled disableRipple>
            <div className="flex flex-col items-center space-y-1">
              <LucideBanana width={20}></LucideBanana>
              <p className="text-xs">Lab</p>
            </div>
          </Button>
        </div>
      </div>
    </footer>
  );
};
