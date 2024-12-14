"use client";

import { leap_year } from "@/components/common/cmasdate";
import { non_leap_year } from "@/components/common/cmasdate";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import moment, { duration, Moment } from "moment";

type CmasAmountType = {
  CMAS_180_days: moment.Moment;
  CMAS_final_amount: number;
};

// calculates whether if it is a leap year or not
function calc_leap_year(year: number) {
  if (year % 4 == 0) {
    if (year % 100 == 0) {
      if (year % 400 == 0) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

// calculate the range for the for loop, which starts from 180 days from KTA to the user's current month
function calc_range(s_month: number, s_year: number, e_month: number, e_year: number) {
  if (s_year == e_year) {
    return e_month - s_month;
  } else if (s_month <= e_month) {
    return e_month - s_month;
  } else {
    return s_month - e_month;
  }
}

// calculates the amount of the CMAS that user has
function cmas_amount_calculator(starting_year: any, todays_date: any): CmasAmountType {
  // object that includes 180 days from the KTA and the amount of CMAS
  let ultimate_Object: CmasAmountType = { CMAS_180_days: moment(), CMAS_final_amount: 0 };

  // CMAS index amount.
  var cmas_amount: number = 0;

  // KTA starting date.
  var [KTA_entering_year, KTA_entering_month, KTA_entering_date] = starting_year.split("/");

  // user's current day.
  var [today_year, today_month, today_date] = todays_date.split("/");

  // calculating CMAS starting date
  const KTAStartingDate = moment(`${KTA_entering_year}-${KTA_entering_month}-${KTA_entering_date} 12:00:01`);

  // 180days including KTA.
  var CMASStartingDate = KTAStartingDate.add(180, "days");

  ultimate_Object.CMAS_180_days = CMASStartingDate;

  // splits that date into year, month, and day.
  var cmas_starting_year = CMASStartingDate.format("YYYY");
  var cmas_starting_month = CMASStartingDate.format("MM");
  var cmas_starting_date = CMASStartingDate.format("DD");

  // if it is a leap year
  if (calc_leap_year(+cmas_starting_year) == 1) {
    // gets the starting amount from the leap year.
    cmas_amount += leap_year[+cmas_starting_month][+cmas_starting_date - 1];

    // parsing user's date from string to integer.
    var cmas_leap_year_ending_month = parseInt(today_month);
    var cmas_leap_year_ending_year = parseInt(today_year);

    var iteration = calc_range(+cmas_starting_month, +cmas_starting_year, cmas_leap_year_ending_month, cmas_leap_year_ending_year);

    if (cmas_leap_year_ending_year != +cmas_starting_year && cmas_leap_year_ending_month > +cmas_starting_month) {
      cmas_amount = 0;
    } else if (+cmas_starting_month > cmas_leap_year_ending_month) {
      if (iteration < 0) {
        cmas_amount = 0;
      } else {
        for (let i = 0; i < iteration; i++) {
          cmas_amount += 7.26;
          cmas_amount = parseFloat(cmas_amount.toFixed(2));
        }
      }
    }

    ultimate_Object.CMAS_final_amount = cmas_amount;
  }
  // if it is not a leap year
  else {
    cmas_amount += non_leap_year[+cmas_starting_month][+cmas_starting_date - 1];

    // parsing user's date from string to integer.
    var cmas_leap_year_ending_month = parseInt(today_month);
    var cmas_leap_year_ending_year = parseInt(today_year);

    var iteration = calc_range(+cmas_starting_month, +cmas_starting_year, cmas_leap_year_ending_month, cmas_leap_year_ending_year);

    if (cmas_leap_year_ending_year != +cmas_starting_year && cmas_leap_year_ending_month > +cmas_starting_month) {
      cmas_amount = 0;
    } else if (+cmas_starting_month > cmas_leap_year_ending_month) {
      if (iteration < 0) {
        cmas_amount = 0;
      } else {
        for (let i = 0; i < iteration; i++) {
          cmas_amount += 7.26;
          cmas_amount = parseFloat(cmas_amount.toFixed(2));
        }
      }
    }
    ultimate_Object.CMAS_final_amount = cmas_amount;
  }

  return ultimate_Object;
}

export default function CmasCalculator() {
  const [DateInKTA, setdateInKTA] = useState("");
  const [today_date, setDateOfETS] = useState("");
  const [cmasAmount, setCmasAmount] = useState<CmasAmountType>({
    CMAS_180_days: moment(),
    CMAS_final_amount: 0,
  });

  return (
    <>
      <p className="w-full h-0 text-sm">KTA에 입소한 날짜를 입력하세요(ex.2024/04/14)</p>
      <Input
        onChange={(inputValue) => {
          setdateInKTA(inputValue.target.value);
        }}
        value={DateInKTA}
      ></Input>

      <p className="w-full h-0 text-sm">오늘 날짜를 입력해 주세요.</p>
      <Input
        onChange={(inputValue) => {
          setDateOfETS(inputValue.target.value);
        }}
        value={today_date}
      ></Input>
      <Button
        className="w-full"
        onPress={() => {
          const cmas_amount = cmas_amount_calculator(DateInKTA, today_date);
          setCmasAmount(cmas_amount);
        }}
      >
        계산하기
      </Button>

      <p className="w-full">CMAS가 모이기 시작하는 날짜: {cmasAmount.CMAS_180_days.format("YYYY/MM/DD")}</p>
      <p className="w-full">입력한 달 까지의 CMAS 가격: ${cmasAmount.CMAS_final_amount}</p>
    </>
  );
}
