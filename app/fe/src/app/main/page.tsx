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
import { today, getLocalTimeZone } from "@internationalized/date";
import Image from "next/image";
import { useState, useMemo } from "react";
import { IconUp } from "@/components/common/icon";
import Footer from "@/components/footer";

export default function MainPage(props: any) {
  const [isCalendarFolded, setIsCalendarFolded] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["type"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  return (
    <div
      className="h-full min-h-screen w-screen grid justify-items-stretch overflow-y-auto"
      style={{ gridTemplateRows: "auto 1fr auto" }}
    >
      {/* Header */}
      <div className="h-[60px] w-screen flex flex-row items-center justify-between px-4 bg-white">
        <p>logo</p>
        <p>team</p>
      </div>
      {/* Content */}
      <div className="h-full w-full flex flex-col items-center justify-start overflow-hidden">
        {/* bottom box */}
        <div className="w-full h-fit flex flex-col items-center bg-white space-y-2 border-b-1 shadow-md pb-1">
          <div className="w-full flex h-fit flex-row justify-between px-4 space-x-4">
            <Dropdown placement={"bottom-start"}>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="border-1 border-black w-[120px]"
                >
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                selectionMode={"single"}
                selectedKeys={selectedKeys}
                disallowEmptySelection={false}
                onSelectionChange={setSelectedKeys}
              >
                <DropdownSection title="Military" showDivider>
                  <DropdownItem key="military_us">US</DropdownItem>
                  <DropdownItem key="military_rok">ROK</DropdownItem>
                  <DropdownItem key="military_katusa">KATUSA</DropdownItem>
                </DropdownSection>
                <DropdownSection title="Civilian" showDivider>
                  <DropdownItem key="civilian_us">DOD (US)</DropdownItem>
                  <DropdownItem key="civilian_rok">USFK (LN)</DropdownItem>
                  <DropdownItem key="civilian_katusa">CFC (KN)</DropdownItem>
                </DropdownSection>
                <DropdownSection title="DODEA">
                  <DropdownItem key="DODEA_us">DODEA (US)</DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
            <Button
              // radius={"full"}
              variant={"bordered"}
              className="bg-white border-1 border-black max-w-[250px]"
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
            >
              Subscribe in G Cal
            </Button>
          </div>
          {isCalendarFolded && (
            <Calendar
              aria-label="Date (Read Only)"
              value={today(getLocalTimeZone())}
              isReadOnly
              calendarWidth={"100%"}
              classNames={{
                base: "rounded-none h-fit bg-white shadow-none",
                headerWrapper: "w-full",
                gridHeader: "w-full",
                gridHeaderRow: "justify-between",
                gridWrapper: "rounded-none w-full h-full",
                grid: "w-full h-full",
                gridBody: "w-full h-full flex flex-col justify-around bg-white",
                gridBodyRow: "justify-evenly h-full",
                content: "w-full h-full",
              }}
              showShadow={false}
              className="w-full flex flex-col h-[320px]"
              lang={"en"}
            />
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
        <div className="h-full w-full space-y-4 p-4 pb-8">
          {/* <div className="h-full w-full space-y-4 p-4 overflow-y-auto pb-8"> */}
          {[1, 2, 3, 4, 5, 6, 7].map((e, i) => {
            return (
              <Card
                key={i}
                className="w-full h-[150px] bg-[url('../../public/image/deer-licking-deer.jpg')] bg-center bg-cover bg-blend-darken bg-black/30 rounded-none"
              >
                <div className="w-full h-full flex flex-col p-4 font-bold text-xl text-white">
                  {e}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      {/* Footer */}
      <Footer
        isFixed
        title={"So-When-is-4day"}
        subtitle={"Thank you for your interest. :)"}
      ></Footer>
    </div>
  );
}
