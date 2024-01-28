import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ErrorNotFound = () => {
  const [countdown, setCountdown] = useState<number>(5);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/").catch((e) => console.error(e));

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (countdown === 0) router.push("/").catch((e) => console.error(e));
  }, [countdown, router]);

  return (
    <div className="flex flex-col items-center gap-1">
      <h1 className="text-xl font-bold">Hey... you lost?</h1>
      <p>Redirecting in {countdown}</p>
    </div>
  );
};

export default ErrorNotFound;
