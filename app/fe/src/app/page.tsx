"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Button
        onPress={() => {
          router.push("/main");
        }}
      >
        입장
      </Button>
    </>
  );
}
