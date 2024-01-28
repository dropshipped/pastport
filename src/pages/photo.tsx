import { UploadPhotoButton } from "~/components/profile/upload-photo";

export default function TempScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-red-500">
      <UploadPhotoButton />
    </div>
  );
}
