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

export default function Register() {
  const { handleSubmitRegister, payload, setPayload } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <section className="bg-black min-w-screen min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Card maxW="2xl" padding={4}>
          <CardHeader>
            <Heading size="lg" textAlign="center">
              Register
            </Heading>
          </CardHeader>
          <CardBody>
            <FormControl mb={4}>
              <FormLabel> Name </FormLabel>{" "}
              <InputGroup size="md">
                <Input
                  name="name"
                  placeholder="Enter name"
                  type="text"
                  value={payload.name}
                  onChange={(e) =>
                    setPayload({ ...payload, name: e.target.value })
                  }
                />{" "}
              </InputGroup>{" "}
            </FormControl>{" "}
            <FormControl mb={4}>
              <FormLabel> Email </FormLabel>{" "}
              <InputGroup size="md">
                <Input
                  name="password"
                  placeholder="Enter email"
                  type="text"
                  value={payload.email}
                  onChange={(e) =>
                    setPayload({ ...payload, email: e.target.value })
                  }
                />{" "}
              </InputGroup>{" "}
            </FormControl>{" "}
            <FormControl mb={4}>
              <FormLabel> Date of Birth </FormLabel>{" "}
              <InputGroup size="md">
                <Input
                  name="dob"
                  type="date"
                  value={payload.dob}
                  onChange={(e) =>
                    setPayload({ ...payload, dob: e.target.value })
                  }
                />{" "}
              </InputGroup>{" "}
            </FormControl>{" "}
            <FormControl mb={4}>
              <FormLabel> Phone Number </FormLabel>{" "}
              <InputGroup size="md">
                <Input
                  name="phone"
                  placeholder="Enter phone number"
                  type="text"
                  value={payload.phone}
                  onChange={(e) =>
                    setPayload({ ...payload, phone: e.target.value })
                  }
                />{" "}
              </InputGroup>{" "}
            </FormControl>{" "}
            <FormControl mb={4}>
              <FormLabel> Hobby </FormLabel>{" "}
              <InputGroup size="md">
                <Input
                  name="hobby"
                  placeholder="Enter hobby"
                  type="text"
                  value={payload.hobby}
                  onChange={(e) =>
                    setPayload({ ...payload, hobby: e.target.value })
                  }
                />{" "}
              </InputGroup>{" "}
            </FormControl>{" "}
            <FormControl>
              <FormLabel> Password </FormLabel>{" "}
              <InputGroup size="md">
                <Input
                  name="password"
                  onChange={(e) =>
                    setPayload({ ...payload, password: e.target.value })
                  }
                  value={payload.password}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {" "}
                    {show ? "Hide" : "Show"}{" "}
                  </Button>{" "}
                </InputRightElement>{" "}
              </InputGroup>{" "}
            </FormControl>{" "}
          </CardBody>{" "}
          <Flex justifyContent="center">
            <CardFooter width="full">
              <Button
                width="full"
                colorScheme="blue"
                onClick={() => handleSubmitRegister()}
              >
                Submit
              </Button>
            </CardFooter>
          </Flex>
          <CardFooter>
            <Flex gap="1">
              <Text fontSize="sm"> Already have an account ? </Text>
              <Text fontSize="sm" color="blue.400" fontWeight="semibold">
                <Link href="/login"> Login </Link>
              </Text>
            </Flex>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
