import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel,
  Textarea,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Heading,
} from "@chakra-ui/react";
import { StarIcon, ChatIcon } from "@chakra-ui/icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { mutate } from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
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

export default function PostEdit({
  description,
  name,
  email,
  createdAt,
  likes,
  replies,
  idPost,
}) {
  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const [currentId, setCurrentId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(null);
  const toast = useToast();
  const router = useRouter();
  const [dataAPI, setDataAPI] = useState({
    description: "",
  });
  const [replyData, setReplyData] = useState({ description: "" });
  const [replyDataAPI, setReplyDataAPI] = useState([]);
  const handleEvent = (event) => {
    event.preventDefault();
    setReplyData({ ...replyData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (currentId) {
      async function fetchingData() {
        const res = await fetch(
          `https://service.pace-unv.cloud/api/replies/post/${currentId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }
        );
        const listReply = await res.json();
        setReplyDataAPI(listReply.data);
      }
      fetchingData();
    }
  }, [currentId]);
  useEffect(() => {
    async function fetchingData() {
      if (!currentId) return;
      try {
        const res = await fetch(
          `https://service.pace-unv.cloud/api/post/${currentId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch post data");
        const listPosts = await res.json();
        setDataAPI(listPosts.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchingData();
  }, [currentId]);

  const handleCurrentId = (id, type) => {
    setCurrentId(id);
    setModalType(type);
    onOpen();
  };

  const handleSubmitEdit = async () => {
    try {
      const url = `https://service.pace-unv.cloud/api/post/update/${currentId}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        body: JSON.stringify({ ...dataAPI }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }
      const result = await response.json();
      console.log(result);
      toast({
        title: "Data Successfully Edited",
        position: "top",
        variant: "top-accent",
        status: "success",
        isClosable: true,
      });
      router.reload();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to Edit Data",
        description: error.message,
        position: "top",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleEditEvent = (event) => {
    event.preventDefault();
    setDataAPI({ ...dataAPI, [event.target.name]: event.target.value });
    console.log(dataAPI);
  };

  const handleDelete = async (id) => {
    try {
      const url = `https://service.pace-unv.cloud/api/post/delete/${id}`;
      await mutate(
        url,
        async () => {
          const result = await fetch(url, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          });
          if (!result.ok) {
            throw new Error(`Error deleting posts: ${result.status}`);
          }
          return result.json();
        },
        { revalidate: true }
      );
      toast({
        title: "Data Successfully Deleted",
        position: "top",
        variant: "top-accent",
        status: "warning",
        isClosable: true,
      });
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const ModalDelete = () => (
    <Modal
      isCentered
      isOpen={isOpen && modalType === "DELETE"}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Confirm Delete </ModalHeader> <ModalCloseButton />
        <ModalBody pb={6}>Do you want to delete this data?</ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              handleDelete(currentId);
              onClose();
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const ModalEdit = () => (
    <Modal
      isCentered
      isOpen={isOpen && modalType === "EDIT"}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Edit Data </ModalHeader> <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4}>
            <FormLabel> Description </FormLabel>
            <Textarea
              type="text"
              name="description"
              value={dataAPI && dataAPI.description}
              onChange={handleEditEvent}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => handleSubmitEdit()} colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}> Cancel </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://service.pace-unv.cloud/api/replies/post/${currentId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(replyData),
        }
      );
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

  return (
    <Box borderBottom="1px" borderColor="gray.500" px={2} py={8}>
      <Flex justifyContent="space-between">
        <Flex mb={5}>
          <ProfileImageSolid name={name} />
          <Flex direction="column" ml={5}>
            <Text fontSize="md" fontWeight="bold">
              {name} (You)
            </Text>
            <Text fontSize="sm" fontWeight="semibold" color="gray.500">
              {email}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {createdAt}
            </Text>
          </Flex>
        </Flex>
        <Menu>
          <MenuButton as={Button} colorScheme="blue" variant="solid" size="sm">
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
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            </svg>
          </MenuButton>
          <MenuList>
            <MenuItem
              color="black"
              onClick={() => handleCurrentId(idPost, "EDIT")}
            >
              Edit
            </MenuItem>
            <MenuItem
              color="red"
              onClick={() => handleCurrentId(idPost, "DELETE")}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Text mb={5}>{description}</Text>
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
      </Flex>
      {ModalDelete()}
      {ModalEdit()}
      {ModalReply()}
    </Box>
  );
}
