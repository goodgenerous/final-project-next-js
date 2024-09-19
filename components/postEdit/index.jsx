import React, { useContext } from "react";
import {
  Button,
  Flex,
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
  FormControl,
  FormLabel,
  Textarea,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Heading,
} from "@chakra-ui/react";
import ProfileImageSolid from "../profileImageSolid";
import { UserContext } from "@/context/userContext";

export default function PostEdit({
  id,
  description,
  name,
  email,
  createdAt,
  likes,
  replies,
  idPost,
  isLike,
}) {
  const {
    dataUser,
    replyDataAPI,
    replyData,
    handleEvent,
    handleSubmit,
    handleLikeButton,
    handleUnlikeButton,
    setCurrentId,
    currentId,
    formatDate,
    dataAPI,
    handleEditEvent,
    handleSubmitEdit,
    isUpdate,
    modalType,
    setModalType,
    handleDeleteReplies,
  } = useContext(UserContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleCurrentId = (id, type) => {
    setCurrentId(id);
    setModalType(type);
    onOpen();
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
          <Button
            onClick={() => {
              handleSubmitEdit();
            }}
            colorScheme="blue"
            mr={3}
          >
            Save
          </Button>
          <Button onClick={onClose}> Cancel </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

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
                      <Flex
                        justifyContent="space-between"
                        gap="10"
                        alignItems="center"
                      >
                        <Flex direction="column" ml={1}>
                          <Heading size="xs">{item.user.name}</Heading>
                          <Text fontSize="xs">
                            {formatDate(item.created_at)}
                          </Text>
                        </Flex>
                        {item.user.id === dataUser.id ? (
                          <Button
                            colorScheme="blue"
                            variant="outline"
                            size="xs"
                            onClick={() =>
                              handleCurrentId(idPost, "DELETE_REPLIES")
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Button>
                        ) : (
                          <> </>
                        )}
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

  const ModalDeleteReplies = () => (
    <Modal
      isCentered
      isOpen={isOpen && modalType === "DELETE_REPLIES"}
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
              const ownReplyId = replyDataAPI
                .filter((item) => item.is_own_reply)
                .map((item) => item.id);
              handleDeleteReplies(ownReplyId);
              onClose();
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

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
              {createdAt} {isUpdate ? "EDITED" : ""}
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
            !isLike ? handleLikeButton(idPost) : handleUnlikeButton(idPost);
          }}
          leftIcon={
            isLike ? (
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
      </Flex>
      {ModalDelete()}
      {ModalEdit()}
      {ModalReply()}
      {ModalDeleteReplies()}
    </Box>
  );
}
