"use client";

import { Button, Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useIsMobile } from "@/hook/useMediaQuery";
import Footer from "@/components/footer";

import toast, { Toaster } from "react-hot-toast";

import "react-toastify/dist/ReactToastify.css";
import { IconGithub } from "@/components/common/icon";

import Swal from "sweetalert2";

// global.d.ts
declare global {
  export interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function Home() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [mobile, setMobile] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<
    BeforeInstallPromptEvent | undefined
  >(undefined);

  useEffect(() => {
    const checkResize = () => {
      if (isMobile) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    checkResize();
    toast(
      <p className="text-sm font-bold">
        FY25 USFK Holiday Schedule v2 has been successfully added to our
        service!
      </p>,
      {
        icon: <IconGithub width={50}></IconGithub>,
        style: {
          // borderRadius: "50px",
        },
      }
    );
  }, [isMobile]);

  const checkUnsupportedBrowser = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return (
      (userAgent.indexOf("safari") > -1 &&
        userAgent.indexOf("chrome") <= -1 &&
        userAgent.indexOf("chromium") <= -1) ||
      (userAgent.indexOf("firefox") > -1 &&
        userAgent.indexOf("seamonkey") <= -1)
    );
  };

  const promptAppInstall = async () => {
    const isUnsupportedBrowser = checkUnsupportedBrowser();

    if (!isUnsupportedBrowser) {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        setDeferredPrompt(undefined);
      } else {
        Swal.fire({
          title: "<div style='font-size:20px;'>" + "Thank you!" + "</div>",
          text: "You have already installed this application. 👍",
          icon: "success",
          confirmButtonText: "Cool",
        });
      }
    }

    if (isUnsupportedBrowser) {
      Swal.fire({
        title:
          "<div style='font-size:20px;'>" +
          "Your browser does not support direct PWA Installation." +
          "</div>",
        text: "So, please follow the bellow instructions.",
        icon: "info",
        confirmButtonText: "Okay",
        footer:
          '<a href="https://amplified-purpose-11c.notion.site/My-Dear-Pass-USFK-9e714a1605a146dca142ae93c9824912?pvs=74">Move to "How to Use"</a>',
      });
    }
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("sw worker registered", reg))
        .catch(() => console.log("failed"));
    }
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
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
            className="flex flex-col items-center justify-center w-full h-full bg-cover bg-center bg-blend-lighten bg-white/20"
            style={{ backgroundImage: `url(/image/3d-deer.png)` }}
            aria-label="상장 공장 배너"
          ></div>
        )}
        {/* 1. 프로젝트 소개  */}
        <div
          className={`${
            mobile ? "bg-center bg-cover bg-blend-lighten bg-white/50" : ""
          } mx-auto flex h-screen flex-col items-center justify-center min-w-[300px] bg-center`}
          style={{
            backgroundImage: mobile ? `url('/image/3d-deer.png')` : "",
          }}
        >
          <div className="z-20 flex w-full flex-col items-center justify-center space-y-8">
            {/* 소개 텍스트 */}
            <div className="flex w-full flex-col items-center justify-center gap-2">
              {/* <IconLogo width={mobile ? 100 : 120} fill="#000"></IconLogo> */}
              <p className="font-light text-2xl">My Dear Pass USFK</p>
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
                  onClick={() => {
                    window.open(
                      "https://amplified-purpose-11c.notion.site/My-Dear-Pass-USFK-9e714a1605a146dca142ae93c9824912?pvs=74"
                    );
                  }}
                >
                  How to use
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
                  Get Started
                </Button>
              </div>
              {!deferredPrompt && (
                <Button
                  onPress={promptAppInstall}
                  variant={"light"}
                  className="font-bold underline underline-offset-4"
                >
                  Add to Home Screen
                </Button>
              )}
            </div>
          </div>

          {/* <div className="absolute bottom-0">
            <Footer
              isFixed
              title={"My Dear Pass USFK"}
              subtitle={"If any issue, let me know."}
            ></Footer>
          </div> */}
        </div>
      </section>
      <Toaster />
    </>
  );
}
