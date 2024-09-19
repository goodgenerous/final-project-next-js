import { Flex, Text } from "@chakra-ui/react";
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
          </Flex>
          <Flex gap="2">
            <Text fontSize="sm" fontWeight="semibold" color="gray.500">
              Replied your post
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
