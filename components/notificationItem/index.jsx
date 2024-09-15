import { Flex, Image, Text } from "@chakra-ui/react";
import ProfileImageSolid from "../profileImageSolid";

const NotificationLike = ({ name, createdAt }) => {
  return (
    <div className="border border-sky-600 p-3 mt-3 rounded-lg">
      <Flex alignItems="center">
        <ProfileImageSolid name={name} />
        <Flex direction="column" ml="5">
          <Text fontSize="md" fontWeight="bold">
            {name}
          </Text>
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

const NotificationReply = ({ name, createdAt }) => {
  return (
    <div className="border border-yellow-600 p-3 mt-3 rounded-lg">
      <Flex alignItems="center">
        <ProfileImageSolid name={name} />
        <Flex direction="column" ml="5">
          <Text fontSize="md" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="gray.500">
            Replied to your post
          </Text>
          <Text fontSize="sm" color="gray.500">
            {createdAt}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

const NotificationItem = ({ type, userName, createdAt }) => {
  if (type === "like") {
    return <NotificationLike name={userName} createdAt={createdAt} />;
  } else if (type === "reply") {
    return <NotificationReply name={userName} createdAt={createdAt} />;
  }
  return null;
};

export default NotificationItem;
