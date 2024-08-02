import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Flex, Icon, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import AddNewVelage from "../Components/Valge/AddNewValge";
import EditVelage from "../Components/Valge/EditValge";
import DeleteVelage from "../Components/Valge/DeleteValge";

const Valge = () => {
  const { id_vache } = useParams(); // Ensure this matches the route param name
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [velages, setVelages] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const fetchVelages = useCallback(async () => {
    if (!id_vache) return; // Exit if id_vache is not available

    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/v1/vaches/${id_vache}/getAllVelages`);
      console.log("Fetched vêlages:", response.data); // Debugging line
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
  const openDelete = (date_vêlage) => {
    setSelectedId(date_vêlage);
    setIsDeleteOpen(true);
    setInitialValues({ date_vêlage });
  };
  const closeDelete = () => setIsDeleteOpen(false);

  const updateVelage = (updatedVelage) => {
    setVelages((prevVelages) =>
      prevVelages.map((velage) =>
        velage.date_vêlage === updatedVelage.date_vêlage ? updatedVelage : velage
      )
    );
  };

  return (
    <div>
      <h1>Vêlages</h1>
      <Flex mb={4}>
        <Button colorScheme="green" mr={4} onClick={openForm} leftIcon={<Icon as={FaPlus} />}>Add New Vêlage</Button>
      </Flex>
      <AddNewVelage isOpen={isFormOpen} onClose={closeForm} id_vache={id_vache} onSave={fetchVelages} />
      <EditVelage isOpen={isEditOpen} onClose={closeEdit} initialValues={initialValues} onSave={updateVelage} id_vache={id_vache} />
      <DeleteVelage isOpen={isDeleteOpen} onClose={closeDelete} id_vache={id_vache} date_vêlage={initialValues.date_vêlage} />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date Vêlage</Th>
            <Th>Poids Vêlage (kg)</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {velages.length > 0 ? (
            velages.map((velage) => (
              <Tr key={velage.date_vêlage}>
                <Td>{velage.date_vêlage}</Td>
                <Td>{velage.poids_vêlage_kg}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" ml={2} onClick={() => openEdit(velage)} leftIcon={<Icon as={FaEdit} />}>Edit</Button>
                  <Button size="sm" colorScheme="red" ml={2} onClick={() => openDelete(velage.date_vêlage)} leftIcon={<Icon as={FaTrash} />}>Delete</Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="3">No Vêlages Found</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default Valge;
