import { IconClockCancel, IconPencil, IconFileCheck } from "@tabler/icons";

import benefitOneImg from "../public/img/benefit-one.png";

const benefitOne = {
  title: "benefitsTitle",
  desc: "benefitsDescription",
  image: benefitOneImg,
  imageAlt: "Woman Texting BY IDAN on https://www.glazestock.com/",
  bullets: [
    {
      title: "benefitsBulletTitle_One",
      desc: "benefitsBulletDescription_One",
      icon: <IconClockCancel />,
    },
    {
      title: "benefitsBulletTitle_Two",
      desc: "benefitsBulletDescription_Two",
      icon: <IconPencil />,
    },
    {
      title: "benefitsBulletTitle_Three",
      desc: "benefitsBulletDescription_Three",
      icon: <IconFileCheck />,
    },
  ],
};

export { benefitOne };
