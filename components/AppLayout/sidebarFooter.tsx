import Link from "next/link";
import Image from "next/image";
import { Group } from "@mantine/core";
import { User } from "../../misc/types";
import useTranslation from "next-translate/useTranslation";

const SidebarFooter = ({ user }: { user: User }): JSX.Element => {
  const { t } = useTranslation("common");
  console.log("user", user);

  return (
    <>
      {!!user ? (
        <Group position="center" pb="xl" px="md">
          <div>
            <Image
              src={user?.picture}
              alt={user?.name}
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>
          <div>
            <div className="font-bold text-ellipsis overflow-hidden">
              {user.email}
            </div>
            <Link className="text-sm" href="/api/auth/logout">
              {t("G_logOut")}
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
