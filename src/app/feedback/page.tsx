"use client";

import { Text, Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormErrorMessage, FormLabel, Heading, Input, Divider, Stack, Box, Textarea, Alert, AlertIcon, AlertDescription, AlertTitle, useDisclosure, CloseButton, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import styles from "./page.module.css";

export default function Feedback() {
    const {register, handleSubmit, formState: {errors, isSubmitting}, watch} = useForm();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const {isOpen, onClose, onOpen} = useDisclosure();

    function submit(_values: FieldValues) {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve(null);
            }, 2000);
        }).then(() => onOpen());
    }

    return (
        <main className={styles.main}>
            <Card>
                <CardHeader>
                    <Heading size="md">
                        Feedback Form
                    </Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(submit)}>
                        <Stack direction="column" spacing={4}>
                            <FormControl isInvalid={!!errors.name}>
                                <FormLabel htmlFor="name">Name*</FormLabel>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    {...register("name", {
                                        required: true,
                                        maxLength: 30
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.name?.type == "required" && "Please enter your name."}
                                    {errors.name?.type == "maxLength" && "Please enter a shortened version of your name, so it fits in 30 characters."}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel htmlFor="email">Email Address*</FormLabel>
                                <Input 
                                    id="email"
                                    placeholder="example@domain.com"
                                    {...register("email", {
                                        required: true, 
                                        pattern: emailPattern
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.email?.type == "required" && "Please enter your email address."}
                                    {errors.email?.type == "pattern" && "The email you entered is invalid."}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.feedback}>
                                <FormLabel htmlFor="feedback">Feedback</FormLabel>
                                <Textarea
                                    id="feedback"
                                    placeholder="e.g. Sudoku was fun, but..."
                                    {...register("feedback", {
                                        maxLength: 500
                                    })}
                                />
                                <Text textAlign="right" color={(watch("feedback") || "").length > 500 ? "red" : "black"}>
                                    { 500 - (watch("feedback") || "").length }
                                </Text>
                                <FormErrorMessage>
                                    {errors.feedback && "We appreciate your enthusiasm, but please keep your feedback below 500 characters."}
                                </FormErrorMessage>
                            </FormControl>
                            <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </CardBody>
                <CardFooter>
                    <Text fontSize="xs">
                        Note: this form does not actually do anything when you submit it
                    </Text>
                </CardFooter>
            </Card>
            {
                isOpen && <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <Alert
                            status="success"
                            variant="subtle"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                            height="200px"
                        >
                            <CloseButton
                                alignSelf="flex-end"
                                position="relative"
                                right={-1}
                                top={-1}
                                onClick={onClose}
                            />
                            <AlertIcon boxSize="40px" mr={0} />
                            <AlertTitle mt={4} mb={1} fontSize="lg">
                                Thank you for your feedback, {watch("name")}!
                            </AlertTitle>
                            <AlertDescription maxWidth="sm">
                                We will email you at {watch("email")} with any future updates!
                            </AlertDescription>
                        </Alert>
                    </ModalContent>
                </Modal>
            }
        </main>
    );
}