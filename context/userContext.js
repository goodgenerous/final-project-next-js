import { createContext, useState, useEffect } from "react";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

export const UserContext = createContext({});
const API_URL =
  process.env.NEXT_PUBLIC_URL_API || "https://service.pace-unv.cloud/api";

export function UserContextProvider({ children, ...props }) {
  const [dataUser, setDataUser] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const [replyData, setReplyData] = useState({ description: "" });
  const [isUpdate, setIsUpdate] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [dataAPI, setDataAPI] = useState({
    description: "",
  });
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    hobby: "",
  });
  const [payloadLogin, setPayloadLogin] = useState({
    email: "",
    password: "",
  });
  const [replyDataAPI, setReplyDataAPI] = useState([]);
  const router = useRouter();
  const { mutate, isError } = useMutation();
  const toast = useToast();

  const { data: userData } = useQueries({
    prefixUrl: `${API_URL}/user/me`,
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  const { data: posts, isLoading: postsLoading } = useQueries({
    prefixUrl: `${API_URL}/posts?type=all`,
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  const handleLogout = async () => {
    const response = await mutate({
      url: `${API_URL}/logout`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    Cookies.remove("user_token");
    router.push("/login");
  };

  const handleEvent = (event) => {
    event.preventDefault();
    setReplyData({ ...replyData, [event.target.name]: event.target.value });
  };

  const handleEditEvent = (event) => {
    event.preventDefault();
    setDataAPI({ ...dataAPI, description: event.target.value });
    console.log(dataAPI);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/replies/post/${currentId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(replyData),
      });
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

  const handleSubmitEdit = async () => {
    try {
      const url = `${API_URL}/post/update/${currentId}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: dataAPI.description }),
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
      setIsUpdate(true);
      router.reload();
      toast({
        title: "Data Successfully Edited",
        position: "top",
        variant: "top-accent",
        status: "success",
        isClosable: true,
      });
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

  const handleSubmitLogin = async () => {
    const response = await mutate({
      url: `${API_URL}/login`,
      method: "POST",
      payload: payloadLogin,
    });
    if (!response.success) {
      toast({
        title: "Login Failed!",
        description: "Email and password didn't match",
        position: "top",
        status: "error",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    } else {
      Cookies.set("user_token", response.data.token, {
        expires: new Date(response.data.expires_at),
        path: "/",
      });
      router.push("/");
      toast({
        title: "Login Successfully!",
        position: "top",
        variant: "top-accent",
        status: "success",
        isClosable: true,
      });
      setPayloadLogin({
        email: "",
        password: "",
      });
    }
  };

  const handleSubmitRegister = async () => {
    const response = await mutate({
      url: `${API_URL}/register`,
      method: "POST",
      payload: payload,
    });
    if (!response.success) {
      toast({
        title: "Register Failed!",
        position: "top",
        status: "error",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    } else {
      router.push("/login");
      toast({
        title: "Register Successfully!",
        position: "top",
        variant: "top-accent",
        status: "success",
        isClosable: true,
      });
      setPayload({
        name: "",
        email: "",
        password: "",
        dob: "",
        phone: "",
        hobby: "",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await mutate({
        url: `${API_URL}/post/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      if (!isError) {
        toast({
          title: "Data Successfully Deleted",
          position: "top",
          variant: "top-accent",
          status: "warning",
          isClosable: true,
        });
      }
      router.reload();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error delete data",
        position: "top",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleDeleteReplies = async (id) => {
    try {
      const response = await fetch(`${API_URL}/replies/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete reply");
      }
      toast({
        title: "Success Delete Replies",
        position: "top",
        variant: "top-accent",
        status: "success",
        isClosable: true,
      });
      router.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error delete replies",
        position: "top",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleLikeButton = async (id_post) => {
    try {
      const result = await mutate({
        url: `${API_URL}/likes/post/${id_post}`,
        method: "POST",
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

  const handleUnlikeButton = async (id_post) => {
    try {
      const result = await mutate({
        url: `${API_URL}/unlikes/post/${id_post}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      if (!isError) {
        toast({
          title: "Data Success Unlike",
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
        title: "Error Unlike data",
        position: "top",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

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

  useEffect(() => {
    if (currentId) {
      async function fetchingData() {
        const res = await fetch(`${API_URL}/replies/post/${currentId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
        });
        const listReply = await res.json();
        setReplyDataAPI(listReply.data);
      }
      fetchingData();
    }
  }, [currentId]);

  useEffect(() => {
    async function fetchingData() {
      try {
        const res = await fetch(
          `https://service.pace-unv.cloud/api/post/${currentId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }
        );
        const listPosts = await res.json();
        setDataAPI(listPosts.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchingData();
  }, [currentId]);

  useEffect(() => {
    if (userData) {
      setDataUser(userData.data);
    }
  }, [userData]);

  useEffect(() => {
    if (posts) {
      setPostsData(posts);
      setIsLoading(postsLoading);
    }
  }, [posts, postsLoading]);

  const state = {
    dataUser,
    setDataUser,
    postsData,
    setPostsData,
    isLoading,
    setIsLoading,
    currentId,
    setCurrentId,
    replyData,
    setReplyData,
    replyDataAPI,
    setReplyDataAPI,
    router,
    dataAPI,
    setDataAPI,
    isUpdate,
    setIsUpdate,
    modalType,
    setModalType,
    toast,
    payload,
    setPayload,
    payloadLogin,
    setPayloadLogin,
  };

  const handleFunction = {
    handleLogout,
    handleEvent,
    handleEditEvent,
    handleSubmit,
    handleSubmitEdit,
    handleSubmitRegister,
    handleSubmitLogin,
    handleLikeButton,
    handleUnlikeButton,
    formatDate,
    handleDelete,
    handleDeleteReplies,
  };

  return (
    <UserContext.Provider value={{ ...state, ...handleFunction }} {...props}>
      {" "}
      {children}{" "}
    </UserContext.Provider>
  );
}
