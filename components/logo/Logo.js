import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";

export const Logo = () => {
  const { t } = useTranslation("common");

  return (
    <div className="text-3xl text-center py-4 min-w-full min-w-10">
      {t("aiseowriter")}
      <FontAwesomeIcon
        icon={faFeather}
        className="text-2xl text-white px-2"
      ></FontAwesomeIcon>
    </div>
  );
};
