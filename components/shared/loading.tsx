import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";

const Loading: () => JSX.Element = () => {
  const { t } = useTranslation("seoFacts");
  const [seoFact, setSeoFact] = useState<string>(t("0"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeoFact(t(`${String(Math.floor(Math.random() * 23) || "0")}`));
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [t]);

  return (
    <div className="text-slate flex h-full animate-pulse w-full flex-col justify-center items-center">
      <FontAwesomeIcon
        icon={faFeather}
        size="4x"
        className="px-2 text-slate-900/60 h-5"
      ></FontAwesomeIcon>
      <h5 className="w-[60%] text-center">{seoFact}</h5>
    </div>
  );
};

export default Loading;
