import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "@mantine/core";

const SidebarHeader = ({ availableTokens, closeDrawer }): JSX.Element => {
  return (
    <>
      <Link
        href="/post/new"
        className="btn w-[80%] mx-auto"
        onClick={closeDrawer}
      >
        New Draft
      </Link>
      <Link
        href="/token-topup"
        className="block mt-2 text-center"
        onClick={closeDrawer}
      >
        <FontAwesomeIcon
          icon={faCoins}
          className="text-yellow-500"
        ></FontAwesomeIcon>
        <span className="pl-1">{availableTokens} drafts available </span>
      </Link>
    </>
  );
};

export default SidebarHeader;
