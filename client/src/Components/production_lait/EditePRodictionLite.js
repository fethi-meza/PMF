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

const EditProductionLait = ({ isOpen, onClose, initialValues, id_vache, onSave }) => {
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Production Lait</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            axios
              .put(`http://127.0.0.1:4000/api/v1/vaches/${id_vache}/productions/${initialValues.date_production}`, {
                date_production: values.date_production,
                litres_lait: values.litres_lait
              })
              .then((response) => {
                onSave(response.data);
                onClose();
                toast({
                  title: "Success",
                  description: "Production data updated successfully.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              })
              .catch((error) => {
                console.error("Error:", error);
                toast({
                  title: "Error",
                  description: "Failed to update production data.",
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
            if (!values.date_production) {
              errors.date_production = "Date Production is required";
            }
            return errors;
          }}
          enableReinitialize={true}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalBody>
                <Field name="date_production">
                  {({ field }) => (
                    <FormControl isInvalid={field.value === ''}>
                      <FormLabel htmlFor="date_production">Date Production</FormLabel>
                      <Input {...field} id="date_production" type="date" />
                      <ErrorMessage name="date_production" component="div" style={{ color: 'red' }} />
                    </FormControl>
                  )}
                </Field>
                <Field name="litres_lait">
                  {({ field }) => (
                    <FormControl mt={4}>
                      <FormLabel htmlFor="litres_lait">Litres Lait</FormLabel>
                      <Input {...field} id="litres_lait" placeholder="Enter Litres Lait" />
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

export default EditProductionLait;
