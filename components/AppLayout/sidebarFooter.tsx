import Link from "next/link";
import Image from "next/image";
import { Group } from "@mantine/core";
import { User } from "../../misc/types";

const SidebarFooter = ({ user }: { user: User }): JSX.Element => {
  return (
    <>
      {!!user ? (
        <Group position="center" grow pb="xl" px="md">
          <div className="min-width-[50px]">
            <Image
              src={user?.picture}
              alt={user?.name}
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="font-bold">{user.email}</div>
            <Link className="text-sm" href="/api/auth/logout">
              Logout
            </Link>
          </div>
        </Group>
      ) : (
        <></>
      )}
    </>
  );
};

export default SidebarFooter;
