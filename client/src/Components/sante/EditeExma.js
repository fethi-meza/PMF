import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

const EditExamenSante = ({ isOpen, onClose, initialValues, id_vache, onSave }) => {
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Examen Santé</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
           
            axios
              .put(`http://127.0.0.1:4000/api/v1/vaches/${id_vache}/examens/${initialValues.date_examen}`, values)
              .then((response) => {
                onSave(response.data);
                onClose();
                toast({
                  title: "Success",
                  description: "Examen Santé updated successfully.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              })
              .catch((error) => {
                console.error("Error:", error);
                toast({
                  title: "Error",
                  description: "Failed to update Examen Santé.",
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
            if (!values.date_examen) {
              errors.date_examen = "Date Examen is required";
            }
            return errors;
          }}
          enableReinitialize={true}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalBody>
                <Field name="date_examen">
                  {({ field }) => (
                    <FormControl isInvalid={field.value === ''}>
                      <FormLabel htmlFor="date_examen">Date Examen</FormLabel>
                      <Input {...field} id="date_examen" type="date" />
                      <ErrorMessage name="date_examen" component="div" style={{ color: 'red' }} />
                    </FormControl>
                  )}
                </Field>
                <Field name="maladie">
                  {({ field }) => (
                    <FormControl mt={4}>
                      <FormLabel htmlFor="maladie">Maladie</FormLabel>
                      <Input {...field} id="maladie" placeholder="Enter Maladie" />
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

export default EditExamenSante;
