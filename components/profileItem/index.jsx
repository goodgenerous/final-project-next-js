import { UserContext } from "@/context/userContext";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import ProfileImageSolid from "../profileImageSolid";

export default function ProfileItem() {
  const userData = useContext(UserContext);

  return (
    <div className="border border-stone-500 px-2 py-8 rounded-lg mb-4">
      <Flex justifyContent="center">
        <ProfileImageSolid name={userData && userData.name} />
      </Flex>
      <Flex direction="column" alignItems="center" mt="2">
        <Text fontSize="md" fontWeight="bold">
          {userData && userData.name}
        </Text>
        <Text fontSize="sm" fontWeight="semibold" color="gray.500">
          {userData && userData.email}
        </Text>
      </Flex>
      <Flex direction="row" padding="4" justifyContent="center" gap="6">
        <Flex direction="column" gap="2" alignItems="center">
          <Text fontSize="sm" fontWeight="semibold">
            Hobby
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="gray.500">
            {userData && userData.hobby ? userData.hobby : "-"}
          </Text>
        </Flex>
        <Flex direction="column" gap="2" alignItems="center">
          <Text fontSize="sm" fontWeight="semibold">
            Phone
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="gray.500">
            {userData && userData.phone ? userData.phone : "-"}
          </Text>
        </Flex>
        <Flex direction="column" gap="2" alignItems="center">
          <Text fontSize="sm" fontWeight="semibold">
            Date of Birth
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="gray.500">
            {userData && userData.dob ? userData.dob : "-"}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
}
