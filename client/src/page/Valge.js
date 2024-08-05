import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Flex, Icon, Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import AddNewVelage from "../Components/Valge/AddNewValge";
import EditVelage from "../Components/Valge/EditValge";
import DeleteVelage from "../Components/Valge/DeleteValge";

const Valge = () => {
  const { id_vache } = useParams(); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [velages, setVelages] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [selectedVelage, setSelectedVelage] = useState(null);

  const fetchVelages = useCallback(async () => {
    if (!id_vache) return;

    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/v1/vaches/${id_vache}/getAllVelages`);
      console.log("Fetched vêlages:", response.data);
      setVelages(response.data);
    } catch (error) {
      console.error("Error fetching vêlages:", error);
      setVelages([]);
    }
  }, [id_vache]);

  useEffect(() => {
    fetchVelages();
  }, [fetchVelages]);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const openEdit = (velage) => {
    setInitialValues(velage);
    setIsEditOpen(true);
  };
  const closeEdit = () => setIsEditOpen(false);

  const openDelete = (velage) => {
    setSelectedVelage(velage);
    setIsDeleteOpen(true);
  };
  const closeDelete = () => setIsDeleteOpen(false);

  const updateVelage = (updatedVelage) => {
    setVelages((prevVelages) =>
      prevVelages.map((velage) =>
        velage.date_vêlage === updatedVelage.date_vêlage ? updatedVelage : velage
      )
    );
  };

  const deleteVelage = async () => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/v1/vaches/${id_vache}/deleteVelage/${selectedVelage.date_vêlage}`);
      setVelages((prevVelages) =>
        prevVelages.filter((velage) => velage.date_vêlage !== selectedVelage.date_vêlage)
      );
      closeDelete();
    } catch (error) {
      console.error("Error deleting vêlage:", error);
    }
  };

  return (
    <div>
      <Box className="n" p={4}>
        <Box textAlign="center">
          <h1 style={{ fontSize: "2rem" }}>
            <span style={{ color: "green" }}>Welcome</span>
            <span style={{ color: "red" }}> To</span>
            <span style={{ color: "white" }}> Vêlages Page</span>
          </h1>
        </Box>
      </Box>
      <Flex mb={4}>
        <Button colorScheme="green" mr={4} onClick={openForm} leftIcon={<Icon as={FaPlus} />}>Add New Vêlage</Button>
      </Flex>
      <AddNewVelage isOpen={isFormOpen} onClose={closeForm} id_vache={id_vache} onSave={fetchVelages} />
      <EditVelage isOpen={isEditOpen} onClose={closeEdit} initialValues={initialValues} onSave={updateVelage} id_vache={id_vache} />
      <DeleteVelage 
        isOpen={isDeleteOpen} 
        onClose={closeDelete} 
        id_vache={id_vache} 
        date_vêlage={selectedVelage?.date_vêlage} 
        onDelete={deleteVelage} 
      />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Date Vêlage</Th>
            <Th>Poids Vêlage (kg)</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {velages.length > 0 ? (
            velages.map((velage) => (
              <Tr key={velage.id}>
                <Td>{velage.id}</Td>
                <Td>{velage.date_vêlage}</Td>
                <Td>{velage.poids_vêlage_kg}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" ml={2} onClick={() => openEdit(velage)} leftIcon={<Icon as={FaEdit} />}>Edit</Button>
                  <Button size="sm" colorScheme="red" ml={2} onClick={() => openDelete(velage)} leftIcon={<Icon as={FaTrash} />}>Delete</Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="4">No Vêlages Found</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default Valge;
