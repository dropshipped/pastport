import { Card, CardHeader, Avatar, cn } from "@nextui-org/react";
import Link from "next/link";
import {
  BuildingsIcon,
  GlobeIcon,
  HouseIcon,
  PencilIcon,
} from "~/assets/icons";
import { useProfile } from "~/components/profile/profile-provider";

type Props = {
  profileLayout?: boolean;
}; // eslint-disable-line

export const ProfileBar = ({ profileLayout = false }: Props) => {
  const { username } = useProfile();
  return (
    <div className="absolute top-0 z-10 w-full p-8">
      <Card className={cn("w-full", profileLayout ? "h-36" : "h-16")}>
        <CardHeader
          className={cn(
            "flex h-full justify-between",
            profileLayout && "flex-col items-center gap-2 pt-5",
          )}
        >
          {profileLayout && (
            <Link
              href={`/${username}/edit`}
              className="absolute right-0 top-0 flex items-center justify-center gap-1 p-2 text-xs text-foreground-300"
            >
              Edit Profile <PencilIcon className="h-3 w-3" />
            </Link>
          )}
          <div
            className={cn(
              "flex gap-3",
              profileLayout && "flex-col items-center",
            )}
          >
            <Avatar
              isBordered
              radius={profileLayout ? "md" : "full"}
              size="md"
              src="https://headsupfortails.com/cdn/shop/articles/Cat_s_Mind_x630.jpg?v=1624444348"
            />
            <div className={cn("flex flex-col items-start justify-center")}>
              <h4 className="text-small font-semibold leading-none text-default-600">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @zoeylang
              </h5>
            </div>
          </div>
          <div
            className={cn(
              "flex h-full items-end justify-center text-xs font-light text-foreground-400",
              profileLayout ? "flex-row gap-2" : "flex-col gap-1",
            )}
          >
            <div className="flex gap-2">
              <div className="flex items-center justify-center gap-1">
                <GlobeIcon className="h-2.5 w-2.5" />
                <p>56%</p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <BuildingsIcon className="h-2.5 w-2.5" />
                <p>13</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <HouseIcon className="h-2.5 w-2.5" />
              <p>Orlando, FL</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
