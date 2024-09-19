import { useMutation } from "@/hooks/useMutation";
import { Button, FormControl, InputGroup, useToast } from "@chakra-ui/react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function CreatePost() {
  const toast = useToast();
  const router = useRouter();
  const { mutate, isError } = useMutation();
  const [postData, setPostData] = useState({ description: "" });
  const [isPostData, setIsPostData] = useState(false);

  const handleEventPost = (event) => {
    setPostData((postData) => ({
      ...postData,
      [event.target.name]: event.target.value,
    }));
    const valueInput = event.target.value;
    valueInput.trim().length > 0 ? setIsPostData(true) : setIsPostData(false);
  };

  const handleSubmitPost = async () => {
    try {
      const result = await mutate({
        url: `https://service.pace-unv.cloud/api/post`,
        method: "POST",
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
            name="description"
            value={postData.description}
            onChange={handleEventPost}
          ></textarea>
        </InputGroup>
        <Button
          isDisabled={!isPostData}
          mt="4"
          colorScheme="blue"
          size="md"
          width="full"
          onClick={() => handleSubmitPost()}
        >
          Post
        </Button>
      </FormControl>
    </div>
  );
}
