import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  Modal,
  ModalFooter,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
} from "@chakra-ui/react";
import { useMutation } from "@/hooks/useMutation";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { UserContext } from "@/context/userContext";
import ProfileImageSolid from "../profileImageSolid";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export default function Post({
  description,
  name,
  email,
  createdAt,
  likes,
  replies,
  idPost,
}) {
  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const userData = useContext(UserContext);
  const toast = useToast();
  const [modalType, setModalType] = useState(null);
  const router = useRouter();
  const [currentId, setCurrentId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isError, isLoading } = useMutation();
  const [dataAPI, setDataAPI] = useState();
  const [replyData, setReplyData] = useState({ description: "" });
  const [replyDataAPI, setReplyDataAPI] = useState([]);
  const handleEvent = (event) => {
    event.preventDefault();
    setReplyData({ ...replyData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (currentId) {
      async function fetchingData() {
        const res = await fetch(`${API_URL}/replies/post/${currentId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
        });
        const listReply = await res.json();
        setReplyDataAPI(listReply.data);
      }
      fetchingData();
    }
  }, [currentId]);

  const handleCurrentId = (id, type) => {
    setCurrentId(id);
    setModalType(type);
    onOpen();
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/replies/post/${currentId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(replyData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit reply");
      }
      toast({
        title: "Success Replied",
        position: "top",
        variant: "top-accent",
        status: "success",
        isClosable: true,
      });
      setReplyData({ description: "" });
      router.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error replying to post",
        position: "top",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

  const ModalReply = () => (
    <Modal
      closeOnEsc={true}
      isCentered
      isOpen={isOpen && modalType === "REPLY"}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Replies Post </ModalHeader> <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Textarea
              placeholder="reply this post..."
              name="description"
              value={replyData.description}
              onChange={handleEvent}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter width="full">
          <Button
            width="full"
            onClick={() => {
              handleSubmit();
              onClose();
            }}
            colorScheme="green"
          >
            Reply
          </Button>
        </ModalFooter>
        <Card>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {replyDataAPI.length > 0 ? (
                replyDataAPI.map((item) => (
                  <Box key={item.id}>
                    <Flex gap="2">
                      <ProfileImageSolid name={item.user.name} />
                      <Flex direction="column">
                        <Heading size="xs">{item.user.name}</Heading>
                        <Text fontSize="xs">{formatDate(item.created_at)}</Text>
                      </Flex>
                    </Flex>
                    <Text pt="3" fontSize="md">
                      {item.description}
                    </Text>
                  </Box>
                ))
              ) : (
                <Text>No replies yet.</Text>
              )}
            </Stack>
          </CardBody>
        </Card>
      </ModalContent>
    </Modal>
  );

  const handleLikeButton = async () => {
    try {
      const result = await mutate({
        url: `https://service.pace-unv.cloud/api/likes/post/${currentId}`,
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      if (!isError) {
        toast({
          title: "Data Success Like",
          position: "top",
          variant: "top-accent",
          status: "success",
          isClosable: true,
        });
      }
      router.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error like data",
        position: "top",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (currentId) {
      async function fetchingData() {
        const res = await fetch(
          `https://service.pace-unv.cloud/api/likes/post/${currentId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }
        );
        const listNotes = await res.json();
        setDataAPI(listNotes.data);
      }
      fetchingData();
    }
  }, [currentId]);

  return (
    <div className="border-b border-stone-500 px-2 py-8">
      <Flex mb="5">
        <ProfileImageSolid name={name} />
        <Flex direction="column" ml="5">
          <Text fontSize="md" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="gray.500">
            {email}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {createdAt}
          </Text>
        </Flex>
      </Flex>
      <Text mb="5">{description}</Text>
      <Flex justifyContent="center" gap="2">
        <Button
          width="full"
          variant="outline"
          colorScheme="blue"
          onClick={() => {
            setCurrentId(idPost);
            handleLikeButton();
          }}
          leftIcon={
            dataAPI &&
            dataAPI.users_id === userData.id &&
            dataAPI.is_like_post ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )
          }
        >
          {likes} Like
        </Button>
        <Button
          width="full"
          variant="outline"
          colorScheme="blue"
          onClick={() => handleCurrentId(idPost, "REPLY")}
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
          }
        >
          {replies} Replies
        </Button>
        {ModalReply()}
      </Flex>
    </div>
  );
}
