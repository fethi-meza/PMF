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

const AddNewProductionLait = ({ isOpen, onClose, id_vache, onSave }) => {
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Production Lait</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ date_production: "", litres_lait: "" }}
          onSubmit={(values, actions) => {
            axios
              .post(
                `http://127.0.0.1:4000/api/v1/vaches/${id_vache}/productions/addProduction`,
                values,
              )
              .then((response) => {
                console.log("Post response:", response.data);
                onClose(); // Close the modal after successful submission
                onSave(); // Trigger update of production list
                toast({
                  title: "Success",
                  description: "Production data added successfully.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              })
              .catch((error) => {
                console.error("Error:", error); // Log any errors
                toast({
                  title: "Error",
                  description: "Failed to add production data.",
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
                <Field name="date_production">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="date_production">
                        Date Production
                      </FormLabel>
                      <Input {...field} id="date_production" type="date" />
                    </FormControl>
                  )}
                </Field>
                <Field name="litres_lait">
                  {({ field }) => (
                    <FormControl mt={4}>
                      <FormLabel htmlFor="litres_lait">Litres Lait</FormLabel>
                      <Input
                        {...field}
                        id="litres_lait"
                        placeholder="Enter Litres Lait"
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

export default AddNewProductionLait;
