import { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { getCookie } from "../../utils/cookieUtils";

// This component doesn't render anything, it just sets the language
const LanguageSetter = () => {
  const { lang } = useTranslation();

  useEffect(() => {
    const userLanguage = getCookie("language");
    if (userLanguage) {
      setLanguage(userLanguage);
    }
  }, []);

  return null;
};

export default LanguageSetter;
