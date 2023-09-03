import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";
import { Title } from "@mantine/core";

export const Logo = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex justify-center items-center mt-12 mb-4 min-w-full">
      <FontAwesomeIcon
        icon={faFeather}
        className="text-2xl px-2"
      ></FontAwesomeIcon>
      <Title order={3}>{t("aiseowriter")}</Title>
    </div>
  );
};
