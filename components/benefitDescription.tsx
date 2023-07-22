import { IconClockCancel, IconPencil, IconFileCheck } from "@tabler/icons";

import benefitOneImg from "../public/img/benefit-one.png";

const benefitOne = {
  title: "Highlight your benefits",
  desc: "You can use this space to highlight your first benefit or a feature of your product. It can also contain an image or Illustration like in the example along with some bullet points.",
  image: benefitOneImg,
  imageAlt: "Woman Texting BY IDAN on https://www.glazestock.com/",
  bullets: [
    {
      title: "Reduce time to first draft",
      desc: "Never waste your time again thinking about how to start",
      icon: <IconClockCancel />,
    },
    {
      title: "Focus on what matters",
      desc: "Edit, Optimize, Rewrite. You are in charge.",
      icon: <IconPencil />,
    },
    {
      title: "Done",
      desc: "Deliver your best work.",
      icon: <IconFileCheck />,
    },
  ],
};

// const benefitTwo = {
//   title: "Offer more benefits here",
//   desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
//   image: benefitTwoImg,
//   bullets: [
//     {
//       title: "Mobile Responsive Template",
//       desc: "Nextly is designed as a mobile first responsive template.",
//       icon: <DevicePhoneMobileIcon />,
//     },
//     {
//       title: "Powered by Next.js & TailwindCSS",
//       desc: "This template is powered by latest technologies and tools.",
//       icon: <AdjustmentsHorizontalIcon />,
//     },
//     {
//       title: "Dark & Light Mode",
//       desc: "Nextly comes with a zero-config light & dark mode. ",
//       icon: <SunIcon />,
//     },
//   ],
// };

export { benefitOne };
