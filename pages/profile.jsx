import dynamic from "next/dynamic";
import CreatePost from "@/components/createPost";
import ProfileItem from "@/components/profileItem";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import PostEdit from "@/components/postEdit";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p> Loading... </p>,
  ssr: false,
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Profile() {
  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const userData = useContext(UserContext);
  const { data, isLoading } = useQueries({
    prefixUrl: `https://service.pace-unv.cloud/api/posts?type=me`,
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });
  console.log("data user =>", data);

  return (
    <div className="bg-black min-h-screen">
      <LayoutComponent
        metaTitle="Profile"
        metaDescription="Ini merupakan halaman Profile"
      >
        <div className="p-4">
          <ProfileItem />
          <CreatePost />
          {isLoading && data == null ? (
            <Flex justify="center" align="center" h="25vh">
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
                  <PostEdit
                    key={item.id}
                    name={item.user.name}
                    description={item.description}
                    email={item.user.email}
                    createdAt={formatDate(item.created_at)}
                    likes={item.likes_count.toString()}
                    replies={item.replies_count.toString()}
                    idPost={item.id}
                  />
                ))
              ) : (
                <Flex justify="center" align="center" h="25vh">
                  <Text color="white">No posts available</Text>
                </Flex>
              )}
            </>
          )}
        </div>
      </LayoutComponent>
    </div>
  );
}
