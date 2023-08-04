import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { Header, Group, Burger, Title } from "@mantine/core";

// Mobile header once logged in
export default function MobileHeader({
  drawerOpened,
  toggleDrawer,
  style,
}: {
  drawerOpened: boolean;
  toggleDrawer: () => void;
  style?: any;
}): JSX.Element {
  return (
    <Header height={60} px="md ">
      <Group position="apart" className="w-full" sx={{ height: "100%" }}>
        <Group>
          <Title order={2} className="text-slate-900/90">
            AI SEO Writer
          </Title>

          <FontAwesomeIcon
            icon={faFeather}
            size="lg"
            className=" text-slate-900/90"
          ></FontAwesomeIcon>
        </Group>

        <Burger
          opened={drawerOpened}
          onClick={toggleDrawer}
          className={style}
        />
      </Group>
    </Header>
  );
}
