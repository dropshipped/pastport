import { Card, CardHeader, Avatar, cn } from "@nextui-org/react";
import { GlobeIcon } from "~/assets/icons";
import { useProfile } from "~/components/profile/profile-provider";

type Props = {}; // eslint-disable-line

export const ProfileBar = ({}: Props) => {
  const { showProfile } = useProfile();

  const isFollowed = true;
  return (
    <div className="absolute top-0 w-full p-8">
      <Card className={cn("h-16 w-full", showProfile && "h-32")}>
        <CardHeader className="justify-between border-2 border-solid border-blue-400">
          <div className="flex gap-3">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://headsupfortails.com/cdn/shop/articles/Cat_s_Mind_x630.jpg?v=1624444348"
            />
            <div
              className={cn(
                "flex flex-col items-start justify-center",
                showProfile && "flex-row",
              )}
            >
              <h4 className="text-small font-semibold leading-none text-default-600">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @zoeylang
              </h5>
            </div>
          </div>
          {/* <Button
            className={
              isFollowed
                ? "border-default-200 bg-transparent text-foreground"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            // onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button> */}
          <div className="h-full border-2 border-solid border-red-500 text-foreground-400">
            <div className="flex items-center justify-center gap-1">
              <GlobeIcon className="h-3 w-3" />
              <p className="text-sm">56%</p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <GlobeIcon className="h-3 w-3" />
              <p className="text-sm">56%</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
