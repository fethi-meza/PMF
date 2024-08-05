import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import axios from 'axios';

const DeleteVelage = ({ isOpen, onClose, id_vache, date_vêlage, onDelete }) => {
  const handleDelete = () => {
    console.log("Attempting to delete vêlage with date:", date_vêlage); // Debugging log
    axios.delete(`http://127.0.0.1:4000/api/v1/vaches/${id_vache}/deleteVelage/${date_vêlage}`)
      .then((response) => {
        console.log("Delete response:", response.data);
        onDelete(); // Update state in parent
        onClose(); 
      })
      .catch((error) => {
        console.error("Error during deletion:", error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Vêlage Entry</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this entry?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteVelage;
