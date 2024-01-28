import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Callout() {
  // dim background image by 50% darker

  return (
    <div
      className="flex h-64 flex-col items-start justify-center gap-4 bg-cover bg-center p-8 pl-12"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501446529957-6226bd447c46?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <h1 className="text-4xl font-semibold">
        Start Collecting Your Travels Today.
      </h1>
      <Link href="/login">
        <Button
          color="default"
          variant="faded"
          size="lg"
          className="bg-[#6DBE45] px-16"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );
}
