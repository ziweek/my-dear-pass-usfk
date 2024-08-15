"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { useIsMobile } from "@/hook/useMediaQuery";
// import { IconLogo } from "@/component/common/icons";
import Footer from "@/components/footer";

export default function Home() {
  const router = useRouter();
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
    AOS.init();
    return () => {};
  }, []);

  return (
    <>
      <section
        className={`${
          mobile ? "" : "grid grid-cols-2"
        } mx-auto h-full min-h-full w-screen select-none overflow-x-clip`}
        style={{ gridTemplateColumns: `1fr minmax(400px, 500px)` }}
      >
        {!mobile && (
          <div
            className="flex flex-col items-center justify-center w-full h-full bg-cover bg-center bg-blend-lighten bg-white/60"
            style={{ backgroundImage: `url(/image/katusa-meme.jpg)` }}
            aria-label="상장 공장 배너"
          ></div>
        )}
        {/* 1. 프로젝트 소개  */}
        <div
          className={`${
            mobile ? "bg-center bg-cover bg-blend-lighten bg-white/85" : ""
          } mx-auto flex h-screen flex-col items-center justify-center min-w-[300px] bg-center`}
          style={{
            backgroundImage: mobile ? `url('/image/katusa-meme.jpg')` : "",
          }}
        >
          <div className="z-20 flex w-full flex-col items-center justify-center space-y-8">
            {/* 소개 텍스트 */}
            <div className="flex w-full flex-col items-center justify-center gap-2">
              {/* <IconLogo width={mobile ? 100 : 120} fill="#000"></IconLogo> */}
              <p className="font-light text-4xl">My Dear Pass</p>
              <p
                className={`text-center font-bold ${
                  mobile ? "text-md" : "text-lg"
                }`}
              >
                Handy Calendar{mobile && <br></br>} for USFK Holiday Schedule
              </p>
            </div>
            {/*  */}
            <div className="flex w-full flex-col items-center justify-center space-y-4">
              <div className="flex flex-row space-x-2">
                <Button
                  className={`font-bold border-black hover:-translate-y-1 ${
                    mobile ? "border-2" : "border-3"
                  }`}
                  size={mobile ? "md" : "lg"}
                  color={"default"}
                  variant={"bordered"}
                  aria-label="information"
                  // onClick={() => {
                  //   window.open(
                  //     "https://amplified-purpose-11c.notion.site/3e486a3aa9cf4ba585ac1c92eecf0e4a?pvs=74"
                  //   );
                  // }}
                >
                  서비스 소개자료
                </Button>
                <Button
                  className={`font-bold border-black hover:-translate-y-1 ${
                    mobile ? "border-2" : "border-3"
                  }`}
                  size={mobile ? "md" : "lg"}
                  color={"default"}
                  variant={"bordered"}
                  aria-label="product"
                  onClick={() => {
                    router.push("/main");
                  }}
                >
                  서비스 시작하기
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0">
            <Footer
              isFixed
              title={"My Dear Pass"}
              subtitle={"If any issue, let me know."}
            ></Footer>
          </div>
        </div>
      </section>
    </>
  );
}
