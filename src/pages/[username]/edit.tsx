import { Avatar, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";

type RequestBody = {
  displayName: string;
  username: string; // TODO: have some username availability endpoint with debouncing
  email: string;
  hometown: string;
};

const EMPTY_REQUEST_BODY: RequestBody = {
  displayName: "",
  username: "",
  email: "",
  hometown: "",
};

export default function EditPage() {
  const [input, setInput] = useState<RequestBody>(EMPTY_REQUEST_BODY);

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const validateUsername = (value: string) =>
    value.match(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i);

  const isEmailInvalid = useMemo(
    () => (input.email === "" ? false : !validateEmail(input.email)),
    [input.email],
  );

  const isUsernameValid = useMemo(
    () => (input.username === "" ? false : !validateUsername(input.username)),
    [input.username],
  );

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-y-scroll p-8">
      <div className="flex w-full justify-center p-2">
        <Avatar
          isBordered
          radius="md"
          size="lg"
          src="https://headsupfortails.com/cdn/shop/articles/Cat_s_Mind_x630.jpg?v=1624444348"
        />
      </div>
      <Input
        size="sm"
        variant="bordered"
        type="email"
        label="Email"
        placeholder="Enter your email"
        isInvalid={isEmailInvalid}
        onChange={(e) => setInput((p) => ({ ...p, email: e.target.value }))}
      />
      <Input
        size="sm"
        variant="bordered"
        type="text"
        label="Name"
        placeholder="Enter your name"
        onChange={(e) =>
          setInput((p) => ({ ...p, displayName: e.target.value }))
        }
      />
      <Input
        size="sm"
        variant="bordered"
        type="text"
        label="Username"
        placeholder="Enter your username"
        startContent="@"
        isInvalid={isUsernameValid}
        onChange={(e) => setInput((p) => ({ ...p, username: e.target.value }))}
      />
      <Input
        size="sm"
        variant="bordered"
        type="text"
        label="Hometown"
        placeholder="Enter your hometown"
        onChange={(e) => setInput((p) => ({ ...p, hometown: e.target.value }))}
      />
    </div>
  );
}

// TODO: outline photos selected for deletion

/*     User Flow
 * ------------------
 * Edit Fields
 * Remove Photos
 *
 * -> this will edit state
 * -> all of this is sent to a backend route
 *
 * onSubmit
 *
 */
