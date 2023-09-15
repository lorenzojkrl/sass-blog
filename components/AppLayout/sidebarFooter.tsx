import Link from "next/link";
import Image from "next/image";
import { Group, Text } from "@mantine/core";
import { User } from "../../misc/types";
import useTranslation from "next-translate/useTranslation";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const SidebarFooter = ({ user }: { user: User }): JSX.Element => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <div className="pt-6 flex items-center gap-2 h-20">
      {!!user ? (
        <Group position="center" pb="xl" px="md">
          <div>
            <Image
              src={user?.picture}
              alt={user?.name}
              height={40}
              width={40}
              className="rounded-full"
            />
          </div>
          <div className="max-w-[150px] whitespace-nowrap">
            <Text size="md" className="font-bold text-ellipsis overflow-hidden">
              {user.name}
            </Text>
            <Text color='dimmed' size="xs" className="font-bold text-ellipsis overflow-hidden">
              {user.email}
            </Text>
          </div>
          <FontAwesomeIcon
            onClick={() => router.push("/api/auth/logout")}
            icon={faRightFromBracket}
            className="cursor-pointer"
          ></FontAwesomeIcon>
        </Group>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SidebarFooter;
