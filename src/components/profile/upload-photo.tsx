/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Vrn2uEHO0ir
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardHeader, CardBody, Card, Input } from "@nextui-org/react";
import { randomUUID } from "crypto";
import { type ChangeEvent, useState } from "react";
import { supabase } from "~/components/providers/auth";

export function UploadPhotoButton() {
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async () => {
    if (image === null) {
      console.log("null image");
      return;
    }
    
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`public/${randomUUID()}.png`, image, {
        cacheControl: "3600",
        upsert: false,
      });
  };

  return (
    <Card className="flex w-full max-w-md items-center justify-center border-2 border-dashed border-gray-300 p-10 shadow-sm dark:border-gray-700">
      <label className="cursor-pointer" htmlFor="file-upload">
        <CardBody className="flex flex-col items-center justify-center space-y-4">
          <CardHeader className="flex flex-col items-center justify-center space-y-4">
            <UploadIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
            <h1 className="dark:text-gray flex items-center text-center text-lg text-gray-500 no-underline">
              Tap Here to Upload a Photo
            </h1>
          </CardHeader>
          <Input
            className="hidden"
            id="file-upload"
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files.length > 0) {
                const image = e.target.files[0]!; // Safely access the file using TypeScript
                setImage(image); // Set the file state
              }
            }}
          />
        </CardBody>
      </label>
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
