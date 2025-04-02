import React from "react";
import Image from "next/image";
import { Typography } from "../Typography/typography.component";

interface UserCardProps {
  user: {
    name?: string;
    login?: string;
    bio?: string;
    location?: string;
    avatar_url?: string;
  };
}

export function UserCard({ user }: UserCardProps) {
  const defaultAvatar = "/avatar.svg";

  return (
    <div
      className="border-gray-300 border-[1px] rounded-lg p-6 flex flex-col items-center gap-4 w-[448px] h-[420px]"
      aria-labelledby="user-card-name"
    >
      <Image
        src={user?.avatar_url || defaultAvatar}
        alt="User avatar"
        className="rounded-full"
        width={200}
        height={200}
        aria-hidden="true"
      />
      <Typography center variant="h2" color="grey">
        {user?.name || "Name"}
      </Typography>
      <Typography center variant="p" color="grey">
        {user?.login || "Login"}
      </Typography>
      {user?.bio && (
        <Typography variant="p" color="grey">
          {user.bio}
        </Typography>
      )}
      {user?.location && (
        <Typography variant="p" color="grey">
          {user.location}
        </Typography>
      )}
    </div>
  );
}
