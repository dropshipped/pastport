import { CardHeader, CardBody, Card, Spinner } from "@nextui-org/react";
// import { randomUUID } from "crypto";
import { type ChangeEvent, useState, useEffect } from "react";
// import { supabase } from "~/components/providers/auth";

// @ts-ignore no type def
import { parse } from "exifr";

export function UploadPhotoButton() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // function handleChange(e: ChangeEvent<HTMLInputElement>) {
  //   setFile(e?.target?.files![0]!);
  // }

  useEffect(() => {
    handleExtract();
  }, [file]);

  // const getData = async () => {
  //   if (file) {
  //     // const tags = ExifReader.load(image!);
  //     // console.log(tags);
  //     // console.log(await EXIF.getAllTags(image));
  //     console.log("ac parsing image metadata");
  //     const res = await exifr.gps(file);
  //     // console.log();
  //   }
  // };

  async function handleExtract() {
    if (!file) return;
    setLoading(true);
    const data = await parse(file as File, true);
    console.log(data);
    setLoading(false);
  }

  /*
  const onSubmit = async () => {
    if (file === null) {
      console.log("null image");
      return;
    }

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`public/${randomUUID()}.png`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    console.log(data, error);
  };
  */

  return (
    <Card className="flex w-full max-w-md items-center justify-center border-2 border-dashed border-gray-300 p-10 shadow-sm dark:border-gray-700">
      {loading ? (
        <Spinner />
      ) : (
        <label className="cursor-pointer" htmlFor="file-upload">
          <CardBody className="flex flex-col items-center justify-center space-y-4">
            <CardHeader className="flex flex-col items-center justify-center space-y-4">
              <UploadIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
              <h1 className="dark:text-gray flex items-center text-center text-lg text-gray-500 no-underline">
                Tap Here to Upload a Photo
              </h1>
            </CardHeader>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                // const image = e.target.files[0]!; // Safely access the file using TypeScript
                setFile(e?.target?.files![0]!);
                // if (e.target.files && e.target.files.length > 0) {
                //   const image = e.target.files[0]!; // Safely access the file using TypeScript
                //   setFile(image); // Set the file state
                // }
                // setLoading(true);
                // console.log("loading", loading);
                // console.log("started parsing image metadata");
                // await new Promise(() =>
                //   setTimeout(() => {
                //     console.log("Finished");
                //     1;
                //   }, 1000),
                // );
                // await handleExtract();
                // console.log("stopped parsing image metadata");

                // setLoading(false);
                // console.log("not loading", loading);
              }}
            />
          </CardBody>
        </label>
      )}
    </Card>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
