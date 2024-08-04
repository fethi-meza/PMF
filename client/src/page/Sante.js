import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Flex, Icon, Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import AddNewExmaSant from "../Components/sante/addNewExma";
import EditExmaSant from "../Components/sante/EditeExma";
import DeleteExma from "../Components/sante/DeleteExma";

const ExmaSante = () => {
  const { id_vache } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [examens, setExamens] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  // Fetch all examens
  const fetchExamens = useCallback(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/v1/vaches/${id_vache}/examens/getAllExamens`);
      setExamens(response.data);
    } catch (error) {
      console.error("Error fetching examens:", error);
    }
  }, [id_vache]);

  useEffect(() => {
    fetchExamens();
  }, [fetchExamens]);

  // Calculate the next ID by finding the highest existing ID and adding 1
  const getNextId = () => {
    if (examens.length === 0) return 1;
    const highestId = Math.max(...examens.map(examen => examen.id));
    return highestId + 1;
  };

  // Open and close form functions
  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  // Open and close edit functions
  const openEdit = (examen) => {
    setInitialValues(examen);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
  };

  // Open and close delete functions
  const openDelete = (id, date_examen) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
    setInitialValues({ date_examen });
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  // Update examens list after edit or add
  const updateExamen = (updatedExamen) => {
    setExamens((prevExamens) =>
      prevExamens.map((examen) =>
        examen.id === updatedExamen.id ? updatedExamen : examen
      )
    );
  };

  // Add new examen with incremented ID
  const addNewExamen = async (newExamen) => {
    const newId = getNextId();
    const examenWithId = { ...newExamen, id: newId };
    
    // Assuming you're sending the data to the server and the server accepts this ID
    try {
      await axios.post(`http://127.0.0.1:4000/api/v1/vaches/${id_vache}/examens`, examenWithId);
      setExamens(prevExamens => [...prevExamens, examenWithId]);
    } catch (error) {
      console.error("Error adding new examen:", error);
    }
  };

  return (
    <div>
      <Box className="n" p={4}>
        <Box textAlign="center">
          <h1 style={{ fontSize: "2rem" }}>
            <span style={{ color: "green" }}>Welcome</span>
            <span style={{ color: "red" }}> To</span>
            <span style={{ color: "white" }}> ExmaSante Page</span>
          </h1>
        </Box>
      </Box>
      <Flex mb={4}>
        <Button colorScheme="green" mr={4} onClick={openForm} leftIcon={<Icon as={FaPlus} />}>Add New Entry</Button>
      </Flex>
      <AddNewExmaSant isOpen={isFormOpen} onClose={closeForm} id_vache={id_vache} onSave={fetchExamens} addNewExamen={addNewExamen} />
      <EditExmaSant isOpen={isEditOpen} onClose={closeEdit} initialValues={initialValues} onSave={updateExamen} id_vache={id_vache} />
      <DeleteExma isOpen={isDeleteOpen} onClose={closeDelete} id={selectedId} id_vache={id_vache} date_examen={initialValues.date_examen} />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Date Examen</Th>
            <Th>Maladie</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {examens.map((examen) => (
            <Tr key={examen.id}>
              <Td>{examen.id}</Td>
              <Td>{examen.date_examen}</Td>
              <Td>{examen.maladie}</Td>
              <Td>
                <Button size="sm" colorScheme="blue" ml={2} onClick={() => openEdit(examen)} leftIcon={<Icon as={FaEdit} />}>Edit</Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => openDelete(examen.id, examen.date_examen)} leftIcon={<Icon as={FaTrash} />}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default ExmaSante;
