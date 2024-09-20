import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  Text,
  Button,
  Heading,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/context/userContext";

export default function Login() {
  const { payloadLogin, setPayloadLogin, handleSubmitLogin } =
    useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <section className="bg-black min-w-screen min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Card maxW="2xl" padding={4}>
          <CardHeader>
            <Heading size="lg" textAlign="center">
              Login
            </Heading>
          </CardHeader>
          <CardBody>
            <FormControl mb={4}>
              <FormLabel> Email </FormLabel>{" "}
              <InputGroup size="md">
                <Input
                  name="password"
                  placeholder="Enter email"
                  type="text"
                  value={payloadLogin.email}
                  onChange={(e) =>
                    setPayloadLogin({ ...payloadLogin, email: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel> Password </FormLabel>{" "}
              <InputGroup size="md">
                <Input
                  name="password"
                  onChange={(e) =>
                    setPayloadLogin({
                      ...payloadLogin,
                      password: e.target.value,
                    })
                  }
                  value={payloadLogin.password}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </CardBody>
          <Flex justifyContent="center">
            <CardFooter width="full">
              <Button
                size="md"
                width="full"
                colorScheme="blue"
                onClick={() => handleSubmitLogin()}
              >
                Submit
              </Button>
            </CardFooter>
          </Flex>
          <CardFooter>
            <Flex gap="1">
              <Text fontSize="sm">Dont have an account yet?</Text>
              <Text fontSize="sm" color="blue.400" fontWeight="semibold">
                <Link href="/register">Register Now</Link>
              </Text>
            </Flex>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
