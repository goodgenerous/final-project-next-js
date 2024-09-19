import { Flex, Image, Text } from "@chakra-ui/react";
import ProfileImageSolid from "../profileImageSolid";

const NotificationLike = ({ name, createdAt }) => {
  return (
    <div className="border border-sky-600 p-3 mt-3 rounded-lg">
      <Flex alignItems="center">
        <ProfileImageSolid name={name} />
        <Flex direction="column" ml="5">
          <Flex alignItems="center" gap="1">
            <Text fontSize="md" fontWeight="bold">
              {name}
            </Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 text-red-500"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </Flex>
          <Text fontSize="sm" fontWeight="semibold" color="gray.500">
            Liked your post
          </Text>
          <Text fontSize="sm" color="gray.500">
            {createdAt}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

const NotificationReply = ({ name, description, createdAt }) => {
  return (
    <div className="border border-yellow-600 p-3 mt-3 rounded-lg">
      <Flex alignItems="center">
        <ProfileImageSolid name={name} />
        <Flex direction="column" ml="5">
          <Flex alignItems="center" gap="1">
            <Text fontSize="md" fontWeight="bold">
              {name}
            </Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                clipRule="evenodd"
              />
            </svg>
          </Flex>
          <Flex gap="2">
            <Text fontSize="sm" fontWeight="semibold" color="gray.500">
              Replied your post:
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="gray.400">
              {description}
            </Text>
          </Flex>
          <Text fontSize="sm" color="gray.500">
            {createdAt}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

const NotificationItem = ({ type, userName, createdAt, replies }) => {
  if (type === "like") {
    return <NotificationLike name={userName} createdAt={createdAt} />;
  } else if (type === "reply") {
    return (
      <NotificationReply
        name={userName}
        createdAt={createdAt}
        description={replies}
      />
    );
  }
  return null;
};

export default NotificationItem;
