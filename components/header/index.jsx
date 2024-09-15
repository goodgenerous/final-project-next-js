import Navigation from "../navigation";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
  MenuGroup,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Cookies from "js-cookie";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import ProfileImage from "../profileImage";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

export default function Header() {
  const userData = useContext(UserContext);
  const { mutate } = useMutation();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await mutate({
      url: `https://service.pace-unv.cloud/api/logout`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    Cookies.remove("user_token");
    router.push("/login");
  };

  return (
    <div className="p-4 border-b border-b-stone-500 flex justify-between items-center">
      <Navigation />
      <Menu>
        <MenuButton
          as={Button}
          colorScheme="blue"
          variant="outline"
          rightIcon={<ChevronDownIcon />}
        >
          <ProfileImage name={userData && userData.name} />
        </MenuButton>
        <MenuList placeContent="left">
          <MenuGroup color="black" title="Profile">
            <Link href="/profile">
              <MenuItem color="black">My Profile</MenuItem>
            </Link>
            <Link href="/notification">
              <MenuItem color="black">Notification</MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup color="black" title="Account">
            <MenuItem color="red">
              <Link href="/login" onClick={() => handleLogout()}>
                Sign Out
              </Link>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
}
