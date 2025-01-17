"use client";

import { Button, Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useIsMobile } from "@/hook/useMediaQuery";
import Footer from "@/components/footer";

import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { IconCheck, IconNo } from "@/components/common/icon";

import Image from "next/image";
import { useTheme } from "next-themes";

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

interface RelatedApplication {
  platform: string;
  url: string;
}

declare global {
  interface Navigator {
    getInstalledRelatedApps: () => Promise<RelatedApplication[]>;
  }
}

const TOAST_LIMIT = 1;

export default function Home() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [mobile, setMobile] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();

  const [appInstalled, setAppInstalled] = useState(false);

  const [deferredPrompt, setDeferredPrompt] = useState<
    BeforeInstallPromptEvent | undefined
  >(undefined);
  const [isHydrated, setIsHydrated] = useState(false);

  const { toasts } = useToasterStore();

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

    if (isUnsupportedBrowser) {
      toast.error(
        (t) => (
          <div className="flex w-full flex-col items-end space-y-2">
            <div className="flex flex-row space-x-4">
              <IconNo width={50} fill="#f31260"></IconNo>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold dark:text-white">
                  Your browser does not support one-click PWA installation.
                </p>
                <p className="text-xs text-gray-500">
                  * Please follow below instructions.
                </p>
              </div>
            </div>
            <Button
              variant={"light"}
              className="text-xs w-fit h-fit p-1"
              isIconOnly
              disableAnimation
              disableRipple
              color={"primary"}
              onPress={() => {
                window.open(
                  "https://amplified-purpose-11c.notion.site/My-Dear-Pass-USFK-9e714a1605a146dca142ae93c9824912?pvs=74"
                );
              }}
            >
              Move to How to Use
            </Button>
          </div>
        ),
        {
          icon: <></>,
          // style: {
          //   backgroundColor: resolvedTheme == "light" ? "#ffffff" : "#2b2b2b",
          // },
        }
      );
    }

    if (!isUnsupportedBrowser) {
      if (deferredPrompt) {
        await deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        await setDeferredPrompt(undefined);
      } else {
        toast.success(
          (t) => (
            <div className="flex w-full flex-col items-end space-y-2 select-none">
              <div className="flex flex-row space-x-4">
                <IconCheck width={50} fill="#17c964"></IconCheck>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold w-full dark:text-white">
                    You have already installed our application. 👍
                  </p>
                  <p className="text-xs text-gray-500">
                    * I wish you all have sweet pass :)
                  </p>
                </div>
              </div>
            </div>
          ),
          {
            icon: <></>,
            // style: {
            //   backgroundColor: resolvedTheme == "light" ? "#fff" : "#2b2b2b",
            // },
          }
        );
      }
    }
  };

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
    const handleBeforeInstallPrompt = async (e: BeforeInstallPromptEvent) => {
      await e.preventDefault();
      await setDeferredPrompt(e);
      await setIsHydrated(true);
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

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT && _.id != "installation") // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  useEffect(() => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-[350px] bg-white dark:bg-[#2b2b2b] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 select-none`}
        >
          <div className="flex w-full p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <Image
                  className="h-10 w-10 rounded-full"
                  src="/logo/logo-icon.png"
                  width={100}
                  height={100}
                  alt="logo"
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-gray-900 font-bold dark:text-white">
                  Add to Home Screen
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  This web application supports one-click PWA installation.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-fit pr-4">
            <Button
              size={"sm"}
              radius={"full"}
              variant={"solid"}
              onPress={async () => {
                await promptAppInstall();
                // await toast.dismiss(t.id);
              }}
              className=""
            >
              Install
            </Button>
          </div>
        </div>
      ),
      { id: "installation", duration: Infinity, position: isMobile ? "top-center":"top-right" }
    );
  }, [isHydrated]);

  return (
    <>
      <section
        className={`${
          mobile ? "" : "grid grid-cols-2"
        } mx-auto h-full min-h-full w-screen select-none overflow-x-clip dark:bg-[#222222]`}
        style={{ gridTemplateColumns: `1fr minmax(400px, 500px)` }}
      >
        {!mobile && (
          <div
            className="flex flex-col items-center justify-center w-full h-full bg-cover bg-center bg-blend-lighten bg-white/20"
            style={{ backgroundImage: `url(/image/3d-deer.png)` }}
            aria-label="deer"
          ></div>
        )}
        {/* 1. 프로젝트 소개  */}
        <div
          className={`${
            mobile
              ? "bg-center bg-cover bg-white/50 bg-blend-lighten dark:bg-black/50 dark:bg-blend-darken"
              : ""
          } mx-auto flex h-screen flex-col items-center justify-center min-w-[300px] bg-center`}
          style={{
            backgroundImage: mobile ? `url('/image/3d-deer.png')` : "",
          }}
        >
          {mobile && (
            <div className="fixed top-0 bg-gradient-to-b from-white dark:from-black to-transparent h-[250px] w-full"></div>
          )}
          <div className="z-20 flex w-full flex-col items-center justify-center space-y-8">
            {/* 소개 텍스트 */}
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <p className={`${mobile ? "text-2xl" : "text-3xl"} font-light`}>
                My Dear Pass USFK
              </p>
              <p
                className={`text-center font-bold ${
                  mobile ? "text-md" : "text-md"
                }`}
              >
                Handy Calendar{mobile && <br></br>} for USFK Holiday Schedule
              </p>
            </div>
            {/*  */}
            <div className="flex w-full flex-col items-center justify-center space-y-4">
              <div className="flex flex-row space-x-2">
                <Button
                  className={`font-bold border-black dark:border-white hover:-translate-y-1 ${
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
                  className={`font-bold border-black dark:border-white hover:-translate-y-1 ${
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
            </div>
          </div>

          <div className="absolute bottom-0">
            <Footer
              isFixed
              title={"Thank you for your service"}
              subtitle={"If there are any issues, please contact me."}
            ></Footer>
          </div>
        </div>
      </section>
      <Toaster
        position={"top-center"}
        reverseOrder={false}
        toastOptions={{
          style: {
            maxWidth: 350,
            backgroundColor: resolvedTheme == "light" ? "#ffffff" : "#2b2b2b",
          },
        }}
      />
    </>
  );
}
