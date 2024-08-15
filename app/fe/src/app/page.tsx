"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Button
        onPress={() => {
          router.push("/main2");
        }}
      >
        입장
      </Button>
    </div>
  );
}
