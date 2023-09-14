import React from "react";
import Image from "next/image";
import Container from "./container";
import useTranslation from "next-translate/useTranslation";
import { SectionData } from "../misc/types";

// Move to utils and use for Hero title as well
export const colorWords = (
  text: string,
  wordsToColor: string[],
  baseColor: string = "var(--text-gray-9)",
  customColor: string = "var(--cyan-7)"
) => {
  return (
    <div>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          // Cannot use words position because of i18n
          style={{
            color: wordsToColor.includes(word) ? customColor : baseColor,
          }}
        >
          {word}{" "}
        </span>
      ))}
    </div>
  );
};

const Section: React.FC<SectionData> = (props) => {
  const { data } = props;
  const { t } = useTranslation("common");
  const title = t(`${data.title}`);
  const wordsToColor = t(`${data.wordsToColor}`).split(",");

  return (
    <div className="w-full bg-gray-2">
      <Container
        className={`flex ${
          data?.imagePos === "right" ? "flex-row-reverse" : ""
        } flex-wrap h-[800px]`}
      >
        <div
          className={`flex items-center justify-center w-full lg-halveWidth`}
        >
          <div>
            <Image
              src={data.image}
              alt={t(`${data.imageAlt}`)}
              className={"object-cover"}
              placeholder="blur"
              blurDataURL={data.image.src}
              height={550}
            />
          </div>
        </div>
        <div className={`flex flex-wrap items-center w-full lg-halveWidth`}>
          <div className="flex justify-center w-full mt-4">
            <h3 className="max-w-[400px] mt-3 lg:text-[64px] text-3xl font-bold leading-snug tracking-tight text-gray-9 lg-heading">
              {colorWords(title, wordsToColor)}
            </h3>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Section;
