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

const AddNewValge = ({ isOpen, onClose }) => {
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Valge Entry</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ date_vêlage: "", poids_vêlage_kg: "" }}
          onSubmit={(values, actions) => {
            axios
              .post(
                "http://127.0.0.1:4000/api/v1/valges/addValge",
                values,
              )
              .then((response) => {
                console.log("Post response:", response.data);
                onClose(); // Close the modal after successful submission
                toast({
                  title: "Success",
                  description: "Valge data added successfully.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              })
              .catch((error) => {
                console.error("Error:", error); // Log any errors
                toast({
                  title: "Error",
                  description: "Failed to add valge data.",
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
                <Field name="date_vêlage">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="date_vêlage">
                        Date Vêlage
                      </FormLabel>
                      <Input {...field} id="date_vêlage" type="date" />
                    </FormControl>
                  )}
                </Field>
                <Field name="poids_vêlage_kg">
                  {({ field }) => (
                    <FormControl mt={4}>
                      <FormLabel htmlFor="poids_vêlage_kg">Poids Vêlage (kg)</FormLabel>
                      <Input
                        {...field}
                        id="poids_vêlage_kg"
                        placeholder="Enter Poids Vêlage (kg)"
                        type="number"
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

export default AddNewValge;
