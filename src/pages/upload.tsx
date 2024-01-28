import { Avatar, Button, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { UploadPhotoButton } from "~/components/profile/upload-photo";

type RequestBody = {
  location: string;
  date: string;
};

const EMPTY_REQUEST_BODY: RequestBody = {
  location: "",
  date: "",
};

export default function UploadPage() {
  const [input, setInput] = useState<RequestBody>(EMPTY_REQUEST_BODY);

  return (
    // <div className="flex h-screen w-screen items-center justify-center">
    <div className="h-screen w-full overflow-y-scroll p-4">
      <div className="flex w-full flex-col items-center justify-center gap-4 pt-32">
        <h1 className="text-lg font-semibold md:text-2xl">
          Start by uploading an image from a trip.
        </h1>
        <UploadPhotoButton />
      </div>
      <div className=""></div>
      <div className="flex w-full flex-col items-center justify-center gap-4 pt-8">
        <div className="flex h-full w-[448px] flex-col gap-2 ">
          <Input
            size="sm"
            variant="bordered"
            type="text"
            label="Location"
            placeholder="Enter the city of the trip"
            onChange={(e) =>
              setInput((p) => ({ ...p, displayName: e.target.value }))
            }
          />
          <Input
            size="sm"
            variant="bordered"
            type="date"
            label="Date"
            placeholder="Enter when you travelled here"
            onChange={(e) => setInput((p) => ({ ...p, date: e.target.value }))}
          />
          <Button type="submit" className="bg-[#6DBE45]">
            Create trip
          </Button>
        </div>
      </div>
    </div>
  );
}
