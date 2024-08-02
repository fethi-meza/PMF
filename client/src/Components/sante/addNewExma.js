import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from "@chakra-ui/react";

const AddNewExmaSant = ({ isOpen, onClose, id_vache, onSave }) => {
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Examen Santé</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ date_examen: "", maladie: "" }}
          onSubmit={(values, actions) => {
            axios
              .post(
                `http://127.0.0.1:4000/api/v1/vaches/${id_vache}/examens/addExamen`,
                values
              )
              .then((response) => {
                console.log("Post response:", response.data);
                onClose(); // Close the modal after successful submission
                onSave(); // Trigger update of the examen list
                toast({
                  title: "Success",
                  description: "Examen data added successfully.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              })
              .catch((error) => {
                console.error("Error:", error); // Log any errors
                toast({
                  title: "Error",
                  description: "Failed to add examen data.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {() => (
            <Form>
              <ModalBody>
                <Field name="date_examen">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="date_examen">Date Examen</FormLabel>
                      <Input {...field} id="date_examen" type="date" />
                    </FormControl>
                  )}
                </Field>
                <Field name="maladie">
                  {({ field }) => (
                    <FormControl mt={4}>
                      <FormLabel htmlFor="maladie">Maladie</FormLabel>
                      <Input
                        {...field}
                        id="maladie"
                        placeholder="Enter Maladie"
                      />
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddNewExmaSant;
