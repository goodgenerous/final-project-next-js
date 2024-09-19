import Image from "next/image";
import dynamic from "next/dynamic";
import { Flex, Spinner } from "@chakra-ui/react";
import CreatePost from "@/components/createPost";
import Post from "@/components/post";
import PostEdit from "@/components/postEdit";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p> Loading... </p>,
  ssr: false,
});

export default function Home() {
  const { dataUser, postsData, isLoading, formatDate } =
    useContext(UserContext);
  console.log(postsData);

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
              {postsData?.data &&
                postsData.data.map((item) =>
                  dataUser?.id === item.user.id ? (
                    <PostEdit
                      key={item.id}
                      id={item.user.id}
                      name={item.user.name}
                      description={item.description}
                      email={item.user.email}
                      createdAt={formatDate(item.created_at)}
                      likes={item.likes_count.toString()}
                      replies={item.replies_count.toString()}
                      idPost={item.id}
                      isLike={item.is_like_post}
                    />
                  ) : (
                    <Post
                      key={item.id}
                      id={item.user.id}
                      name={item.user.name}
                      description={item.description}
                      email={item.user.email}
                      createdAt={formatDate(item.created_at)}
                      likes={item.likes_count.toString()}
                      replies={item.replies_count.toString()}
                      idPost={item.id}
                      isLike={item.is_like_post}
                    />
                  )
                )}
            </>
          )}
        </div>
      </LayoutComponent>
    </div>
  );
}
