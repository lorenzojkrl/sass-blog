import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Text } from "@mantine/core";
import Container from "./container";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <div className="relative bg-[#DEE2E6] h-[100px] lg:h-[144px] flex items-center">
      <Container className="toggle-row-column toggle-p-font-size ">
        <Text color="gray.6">
          {t("G_contact", { email: "" })}{" "}
          <a href="mailto:contact@aiseowriter.co">contact@aiseowriter.co</a>
        </Text>
        <Text color="gray.6">
          Copyright © {new Date().getFullYear()}. Made with ♥ by AI SEO Writer.
        </Text>
      </Container>
    </div>
  );
}
