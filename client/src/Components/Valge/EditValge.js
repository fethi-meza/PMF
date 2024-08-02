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

const EditVach = ({ isOpen, onClose, initialValues, id_vache, onSave }) => {
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Vach</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            axios
              .put(`http://127.0.0.1:4000/api/v1/vaches/${id_vache}`, values)
              .then((response) => {
                onSave(response.data);
                onClose();
                toast({
                  title: "Success",
                  description: "Vach data updated successfully.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              })
              .catch((error) => {
                console.error("Error:", error);
                toast({
                  title: "Error",
                  description: "Failed to update vach data.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
          validate={(values) => {
            const errors = {};
            // Validation logic if needed
            return errors;
          }}
          enableReinitialize={true}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalBody>
                <Field name="date_vêlage">
                  {({ field }) => (
                    <FormControl mt={4}>
                      <FormLabel htmlFor="date_vêlage">Date Vêlage</FormLabel>
                      <Input {...field} id="date_vêlage" type="date" />
                    </FormControl>
                  )}
                </Field>
                <Field name="poids_vêlage_kg">
                  {({ field }) => (
                    <FormControl mt={4}>
                      <FormLabel htmlFor="poids_vêlage_kg">Poids Vêlage (kg)</FormLabel>
                      <Input {...field} id="poids_vêlage_kg" placeholder="Enter Poids Vêlage (kg)" type="number" />
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit" isLoading={isSubmitting}>
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

export default EditVach;
