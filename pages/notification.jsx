import dynamic from "next/dynamic";
import { Spinner, Text, Flex } from "@chakra-ui/react";
import NotificationItem from "@/components/notificationItem";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

export default function Notification() {
  const { API_URL } = useContext(UserContext);
  const { data, isLoading } = useQueries({
    prefixUrl: `${API_URL}/notifications`,
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  return (
    <div className="bg-black min-h-screen">
      <LayoutComponent
        metaTitle="Notification"
        metaDescription="Ini merupakan halaman Notification"
      >
        <div className="p-4">
          <Text fontSize="xl" fontWeight="bold">
            Notification
          </Text>
          {isLoading ? (
            <Flex justify="center" align="center" h="75vh">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          ) : (
            <>
              {data?.data && data.data.length > 0 ? (
                data.data.map((item) => (
                  <NotificationItem
                    key={item.id}
                    type={item.remark}
                    userName={item.user.name}
                    replies={item.posts.description}
                    createdAt={formatDate(item.created_at)}
                  />
                ))
              ) : (
                <Flex justify="center" align="center" h="25vh">
                  <Text color="white">No notifications available</Text>
                </Flex>
              )}
            </>
          )}
        </div>
      </LayoutComponent>
    </div>
  );
}
