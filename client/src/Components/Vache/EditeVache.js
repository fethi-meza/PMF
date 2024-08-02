import React, { useState, useEffect } from "react";
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
  Select,
  useToast, // Import useToast hook from Chakra UI
} from "@chakra-ui/react";
import axios from "axios";

const EditVach = ({ isOpen, onClose, initialValues, onSave }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const toast = useToast(); // Initialize useToast hook

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:4000/api/v1/vaches/${formValues.id_vache}`, formValues)
      .then((response) => {
        onSave(response.data);
        onClose();
        toast({
          title: "Vache Updated",
          description: "Vache details updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Failed to update vache. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Vache</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="id_vache">ID</FormLabel>
            <Input
              name="id_vache"
              value={formValues.id_vache}
              isReadOnly
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="date_entree">Date</FormLabel>
            <Input
              name="date_entree"
              type="date"
              value={formValues.date_entree}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="race">Race</FormLabel>
            <Select
              name="race"
              value={formValues.race}
              onChange={handleChange}
            >
              <option value="Holstein">Holstein</option>
              <option value="Montbéliarde">Montbéliarde</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditVach;
