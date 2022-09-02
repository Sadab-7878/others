import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Badge,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaBath, FaBed, FaBorderAll } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

import Navbar from "./navBar";
import ProfileNav from "./profileNav";

const api = axios.create({
  baseURL: `http://localhost:5001/api/post`,
});

export default function ProRentDetails() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isBOpen,
    onOpen: onBOpen,
    onClose: onBClose,
  } = useDisclosure();
  const router = useRouter();
  const id = router.query;
  const querystring = require("querystring");
  const post_id = querystring.stringify(id).replace(/=$|=(?=&)/g, "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookNumber, setBookNumber] = useState("");
  const [bookId, setId] = useState("");
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");

  const PostDelete = async (post_id: any) => {
    let data = await api.delete(`/${post_id}`);
  };
  
  const bookInfo = async () => {
    console.log(Uname);
  };
  return (
    <>
      <ProfileNav id={undefined} />
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={`https://fahabcdzxgcwuzrpykgn.supabase.co/storage/v1/object/public/avatars/${image}`}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Stack direction="row" alignItems="baseline">
                <Text
                  fontSize="20"
                  fontWeight="bold"
                  textAlign={"match-parent"}
                >
                  BDT
                </Text>
                <Text fontSize="45" fontWeight="bold">
                  {price}
                </Text>
              </Stack>
              <Text fontSize="18" p={1}>
                {address}
              </Text>
              <Badge p={1} fontSize="1em">
                {type}
              </Badge>
              <Heading
                fontSize={20}
                overflow={"hidden"}
                orientation={"horizontal"}
              >
                {name}
              </Heading>
              <HStack spacing={7} pt={3} alignItems={"baseline"}>
                <HStack>
                  <FaBed size={20} />
                  <Text>{beds}</Text>
                </HStack>
                <HStack>
                  <FaBath size={20} />
                  <Text>{baths}</Text>
                </HStack>
                <HStack>
                  <FaBorderAll size={20} />
                  <Text>{area}</Text>
                </HStack>
              </HStack>
            </Box>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack
                spacing={{ base: 4, sm: 6 }}
                justifyContent={"flex-start"}
              >
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  Description
                </Text>
                <Text fontSize={"lg"}>{description}</Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("green.500", "green.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Property Information
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Type</ListItem>
                    <ListItem>Completion</ListItem>{" "}
                    <ListItem>Furnishing</ListItem>
                    <ListItem>Last Updated</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem fontWeight="bold">{type}</ListItem>
                    <ListItem fontWeight="bold">{status}</ListItem>
                    <ListItem fontWeight="bold">Furnished</ListItem>
                    <ListItem fontWeight="bold">{time}</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <HStack
                flex={1}
                mx={1}
                as={"button"}
                onClick={() => {
                  onBOpen();
                  getBook();
                }}
              >
                <Box
                  h={"160%"}
                  w={"100%"}
                  boxShadow={"lg"}
                  rounded={"lg"}
                  pt={7}
                  flex={1}
                  _hover={{
                    boxShadow: "2xl",
                  }}
                  flexDirection="column"
                  alignContent={"center"}
                >
                  <Text textAlign="center" fontWeight="bold">
                    Booking Details
                  </Text>
                </Box>
                <Modal isOpen={isBOpen} onClose={onBClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Booking Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      {bookName === "" && bookNumber === "" ? (
                        <Text>Not booked yet!</Text>
                      ) : (
                        <>
                          <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Text>{bookName}</Text>
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Phone Number</FormLabel>
                            <Text>{bookNumber}</Text>
                          </FormControl>
                        </>
                      )}
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </HStack>
            </Stack>

            <Flex justifyContent={"flex-end"} flexDirection={"column"} flex={1}>
              <VStack py={4} justifyContent={"start"}>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      w={"100%"}
                      fontSize={"sm"}
                      fontWeight={400}
                      color="white"
                      variant={"solid"}
                      bg="green.400"
                      _hover={{
                        bg: "green.300",
                      }}
                    >
                      Call
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Phone Number</PopoverHeader>
                    <PopoverBody>{phone}</PopoverBody>
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      w={"100%"}
                      fontSize={"sm"}
                      fontWeight={400}
                      color="white"
                      variant={"solid"}
                      bg="green.400"
                      _hover={{
                        bg: "green.300",
                      }}
                    >
                      Email
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Email Address</PopoverHeader>
                    <PopoverBody>{email}</PopoverBody>
                  </PopoverContent>
                </Popover>
                {bookId === post_id ? (
                  "jdkjfaksldf"
                ) : (
                  <Button
                    w={"100%"}
                    fontSize={"sm"}
                    fontWeight={400}
                    color="white"
                    variant={"solid"}
                    bg="green.400"
                    _hover={{
                      bg: "green.300",
                    }}
                    onClick={onOpen}
                  >
                    Book Now
                  </Button>
                )}
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Book The Rent</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                          placeholder="Full Name"
                          onChange={(e) => setBookName(e.target.value)}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                          placeholder="017XXXXXX"
                          onChange={(e) => setBookNumber(e.target.value)}
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => {
                          onClose();
                          handleBook(post_id, bookName, bookNumber);
                        }}
                      >
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </VStack>
            </Flex>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
