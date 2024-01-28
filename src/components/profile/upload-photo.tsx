import { CardHeader, Card, CardBody, Image } from "@nextui-org/react";
import { useState } from "react";
import { PhotosIcon } from "~/assets/icons/photo";

export function UploadPhotoButton() {
  const [photo, setPhoto] = useState();

  return (
    <Card className="py-4">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <p className="text-tiny font-bold uppercase">Upload a Photo</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="flex w-full items-center justify-center bg-red-500">
          <PhotosIcon className="h-32 w-full" />
        </div>
        <input type="file">

          
        </input>
        {/* {photo && (
          <Image
            alt="Card background"
            className="rounded-xl object-cover"
            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            width={270}
          />
        )} */}
      </CardBody>
    </Card>
  );
}
