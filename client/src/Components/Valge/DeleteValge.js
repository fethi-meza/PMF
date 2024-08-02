import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import axios from 'axios';

const DeleteValge = ({ isOpen, onClose, id }) => {
  const handleDelete = () => {
    axios.delete(`your_delete_endpoint/${id}`)
      .then((response) => {
        console.log("Delete response:", response.data);
        onClose(); // Close the modal after successful deletion
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Valge Entry</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this entry?
        </ModalBody>
        <ModalFooter>
         
          <Button  colorScheme="red" mr={3}    onClick={handleDelete}>
            Delete
          </Button>
          
          <Button variant="ghost"  onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteValge;
