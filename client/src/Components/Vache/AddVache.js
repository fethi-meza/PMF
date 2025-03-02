import React, { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const AddVache = ({ isOpen, onClose, onSave }) => {
  const [dateEntree, setDateEntree] = useState("");
  const [race, setRace] = useState(""); // Use state for race
  const toast = useToast();

  const handleSave = () => {
    const newVache = {
      date_entree: dateEntree,
      race: race,
    };

    axios.post("http://localhost:4000/api/v1/vaches/addVach", newVache)
      .then((response) => {
        onSave(response.data);
        onClose();
        toast({
          title: "Vache Added",
          description: "New vache has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error adding vache:", error);
        toast({
          title: "Error",
          description: "Failed to add vache. Please try again later.",
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
        <ModalHeader>Add New Vache</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Date Entree</FormLabel>
            <Input
              type="date"
              value={dateEntree}
              onChange={(e) => setDateEntree(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Race</FormLabel>
            <Select
              value={race} // Correctly bind the Select value to state
              onChange={(e) => setRace(e.target.value)} // Handle change
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
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddVache;
