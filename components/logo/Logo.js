import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

export const Logo = () => {
  return (
    <div className="text-3xl text-center py-4 min-w-full min-w-10">
      AI SEO Writer
      <FontAwesomeIcon
        icon={faFeather}
        className="text-2xl text-white px-2"
      ></FontAwesomeIcon>
    </div>
  );
};
