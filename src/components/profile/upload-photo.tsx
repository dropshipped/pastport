/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Vrn2uEHO0ir
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Component() {
  return (
    <Card className="w-full max-w-md border-2 border-dashed border-gray-300 p-10 shadow-sm dark:border-gray-700">
      <CardHeader className="flex flex-col items-center justify-center space-y-4">
        <UploadIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
        <CardTitle className="text-lg text-gray-500 dark:text-gray-400">
          Drag & Drop your files here
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          - OR -
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <Label
          className="cursor-pointer text-blue-500 underline dark:text-blue-400"
          htmlFor="file-upload"
        >
          Select files from your device
        </Label>
        <Input className="hidden" id="file-upload" type="file" />
      </CardContent>
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
