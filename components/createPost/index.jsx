import { useMutation } from "@/hooks/useMutation";
import {
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function CreatePost() {
  const toast = useToast();
  const router = useRouter();
  const { mutate, isError } = useMutation();
  const [postData, setPostData] = useState({ description: "" });
  const API_URL = process.env.NEXT_PUBLIC_URL_API;

  const handleSubmit = async () => {
    try {
      const result = await mutate({
        url: `${API_URL}/post`,
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        payload: postData,
      });
      console.log("result ->", result);
      if (!isError) {
        toast({
          title: "Data Success Added",
          position: "top",
          variant: "top-accent",
          status: "success",
          isClosable: true,
        });
      }
      router.reload();
    } catch (error) {
      toast({
        title: "Error adding data",
        position: "top",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <div className="border-b border-stone-500">
      <FormControl mb={4}>
        <InputGroup size="md">
          <textarea
            className="border border-stone-500 p-4 w-full bg-black rounded-md"
            placeholder="What is Happening?!"
            onChange={(event) =>
              setPostData({
                ...postData,
                description: event.target.value,
              })
            }
          ></textarea>
        </InputGroup>
        <Button
          mt="4"
          colorScheme="blue"
          size="md"
          width="full"
          onClick={() => handleSubmit()}
        >
          Post
        </Button>
      </FormControl>
    </div>
  );
}
