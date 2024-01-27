import { Card, CardHeader, Avatar, Button } from "@nextui-org/react";

type Props = {}; // eslint-disable-line

export const ProfileBar = ({}: Props) => {
  const isFollowed = true;
  return (
    <div className="absolute top-0 w-full p-8">
      <Card className="h-16 w-full">
        <CardHeader className="justify-between">
          <div className="flex gap-3">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://headsupfortails.com/cdn/shop/articles/Cat_s_Mind_x630.jpg?v=1624444348"
            />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @zoeylang
              </h5>
            </div>
          </div>
          <Button
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
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
};
