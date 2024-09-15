import { createContext } from "react";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";

export const UserContext = createContext({});
const API_URL = process.env.NEXT_PUBLIC_URL_API;

export function UserContextProvider({ children, ...props }) {
  const { data: userData } = useQueries({
    prefixUrl: `${API_URL}/user/me`,
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  return (
    <UserContext.Provider value={userData && userData.data} {...props}>
      {" "}
      {children}{" "}
    </UserContext.Provider>
  );
}
