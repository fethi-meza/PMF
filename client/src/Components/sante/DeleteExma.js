import React from "react";
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
  Text,
  useToast,
} from "@chakra-ui/react";

const DeleteExma = ({ isOpen, onClose, id_vache, date_examen, onDelete }) => {
  const toast = useToast();

  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:4000/api/v1/vaches/${id_vache}/examens/${date_examen}`)
      .then((response) => {
        onDelete(response.data); // Notify parent component of deletion
        onClose(); // Close the modal after successful deletion
        toast({
          title: "Success",
          description: "Examen deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response && error.response.status === 404) {
          // If the examen was not found (404 error), display a different error message
          toast({
            title: "Error",
            description: "Examen not found.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          // For other errors, display a generic error message
          toast({
            title: "Success",
            description: "Examen deleted successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Examen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this entry?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>Delete</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteExma;
