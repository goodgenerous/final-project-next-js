import Image from "next/image";
import dynamic from "next/dynamic";
import { Flex, Spinner } from "@chakra-ui/react";
import CreatePost from "@/components/createPost";
import Post from "@/components/post";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";

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

export default function Home() {
  const { data, isLoading } = useQueries({
    prefixUrl: `https://service.pace-unv.cloud/api/posts?type=all`,
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  return (
    <div className="bg-black min-h-screen">
      <LayoutComponent
        metaTitle="Home"
        metaDescription="Ini merupakan halaman Home"
      >
        <div className="p-4">
          <CreatePost />
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
              {data?.data &&
                data.data.map((item) => (
                  <Post
                    key={item.id}
                    name={item.user.name}
                    description={item.description}
                    email={item.user.email}
                    createdAt={formatDate(item.created_at)}
                    likes={item.likes_count.toString()}
                    replies={item.replies_count.toString()}
                    idPost={item.id}
                  />
                ))}
            </>
          )}
        </div>
      </LayoutComponent>
    </div>
  );
}
