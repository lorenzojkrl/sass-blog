import Link from "next/link";
import React from "react";
import Container from "./container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";

export default function Footer() {
  const navigationTest = ["features"];
  const legalTest = [{ title: "startFree", url: "/post/new" }];
  const { t } = useTranslation("common");

  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 lg-grid-cols-5">
          <div className="lg-col-span-2">
            <div>
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-medium text-indigo-800"
              >
                <span>{t("aiseowriter")}</span>
                <FontAwesomeIcon
                  icon={faFeather}
                  size="xs"
                  className="px-2 text-indigo-500"
                ></FontAwesomeIcon>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 ">
              {t("hero_subtitle")}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3">
              {navigationTest.map((item, index) => (
                <Link
                  key={index}
                  href="/"
                  className="w-full px-4 py-2 text-gray-500 rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                >
                  {t(`${item}`)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3">
              {legalTest.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="w-full px-4 py-2 text-gray-500 rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                >
                  {t(`${item.title}`)}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <div>
              <b>{t("G_contact")}</b> contact@aiseowriter.co
            </div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600">
          Copyright © {new Date().getFullYear()}. Made with ♥ by AI SEO Writer.
        </div>
      </Container>
    </div>
  );
}
