"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Switch,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { dataset } from "@/components/common/dataset";
import { useIsMobile } from "@/hook/useMediaQuery";
import { format, differenceInDays, parse, getMonth, getYear } from "date-fns";
import { IconUp } from "@/components/common/icon";
import { useTheme } from "next-themes";

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
  // const [mounted, setMounted] = useState(false);
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

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

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
  const handleHolidaySelect = (holiday: Holiday) => {
    const currentSelection = { name: holiday.HOLIDAY, date: holiday.DATE };
    if (
      selectedHoliday?.name === holiday.HOLIDAY &&
      selectedHoliday?.date === holiday.DATE
    ) {
      setSelectedHoliday(null);
      setDate(new Date());
    } else {
      setSelectedHoliday(currentSelection);
      const [day, month, year] = holiday.DATE.split("-");
      const parsedDate = parse(
        `${day}-${month}-20${year}`,
        "dd-MM-yyyy",
        new Date()
      );
      setDate(parsedDate);

      if (!showCalendar) {
        setShowCalendar(true);
      }
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#FAF9F6] dark:bg-[#262627] text-black dark:text-white transition-colors duration-300`}
    >
      <div className="w-full max-w-7xl mx-auto p-4 pb-20 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-[#FAF9F6] dark:bg-[#262627] z-40 py-4">
          <h2 className="text-2xl font-bold px-2">My Dear Pass USFK</h2>
        </div>

        {/* Calendar and Holiday List */}
        <div
          className={`w-full ${
            !mobile ? "grid grid-cols-2 gap-4" : "flex flex-col gap-4"
          }`}
        >
          {/* Calendar Section */}
          <div
            id="calendar-section"
            className={`w-full sticky top-16 z-30 bg-[#FAF9F6] dark:bg-[#262627]`}
          >
            <Card
              className="w-full bg-white dark:bg-[#3B3B3B] shadow-sm border-2 border-black"
              shadow={"lg"}
            >
              <CardBody>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-black dark:text-white">
                    Calendar
                  </h3>
                  <Switch
                    size={"sm"}
                    checked={showPastHolidays}
                    onChange={(e) => setShowPastHolidays(e.target.checked)}
                    classNames={{
                      wrapper:
                        "bg-gray-200 group-data-[selected=true]:bg-black dark:bg-gray-600 dark:group-data-[selected=true]:bg-black",
                    }}
                  >
                    <p className="text-xs text-black dark:text-white">
                      Show Past Holidays
                    </p>
                  </Switch>
                </div>
                <div className="flex flex-wrap gap-4 my-3 items-center">
                  {nearestHoliday && (
                    <div className="m-auto text-center">
                      <p className="text-sm">Next Holiday:</p>
                      <p className="font-bold">{nearestHoliday.HOLIDAY}</p>
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
                  value={date}
                  className={`w-full h-full ${
                    !showCalendar && "hidden"
                  } bg-white dark:bg-gray-600/80 rounded-lg border border-black/10 dark:border-gray-600/10 p-2`}
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
              <CardBody>
                <div className="w-full">
                  <Select
                    size={"lg"}
                    label="Filter Holidays"
                    selectionMode="single"
                    placeholder="Select category"
                    selectedKeys={[activeFilter]}
                    defaultSelectedKeys={["ALL"]}
                    className="w-full"
                    classNames={{
                      trigger:
                        "bg-white/90 dark:bg-gray-600 border-black/10 dark:border-gray-600",
                      value: "text-black dark:text-white",
                    }}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as FilterKey;
                      setActiveFilter(selected || "ALL");
                    }}
                  >
                    {filterOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </CardBody>
              <div className={`mx-auto ${showCalendar ? "rotate-180" : ""}`}>
                <Button
                  isIconOnly
                  variant="light"
                  className="text-black dark:text-white hover:text-black dark:hover:text-white"
                  onClick={() => setShowCalendar(!showCalendar)}
                  disableAnimation
                >
                  <IconUp
                    width={20}
                    fill={systemTheme == "dark" ? "#ffffff" : "#000000"}
                  />
                </Button>
              </div>
            </Card>
          </div>

          {/* Holiday List Section */}
          <div className="w-full py-4 relative z-20 mt-2">
            {/* Holiday List */}
            <div className="space-y-6">
              {Object.entries(groupedHolidays).map(([monthKey, holidays]) => (
                <div key={monthKey} className="space-y-4">
                  <div
                    id={`month-${monthKey}`}
                    className="bg-zinc-300 dark:bg-zinc-600 py-2 z-20 rounded-lg shadow-sm"
                  >
                    <h3 className="text-xl font-bold px-4">
                      {format(new Date(monthKey), "MMMM yyyy")}
                    </h3>
                  </div>
                  <div
                    className={`grid grid-cols-1 gap-4 ${mobile ? "pl-4" : ""}`}
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
                              ? "border-2 border-[#f871a0]"
                              : ""
                          }
                          ${isPast ? "opacity-50" : ""}
                          transition-all duration-200 bg-white dark:bg-gray-600
                        `}
                        >
                          <CardBody>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold mb-2 text-black dark:text-white">
                                  {holiday.HOLIDAY}
                                </h3>
                                <p className="text-sm text-black dark:text-white">
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
    </div>
  );
}
