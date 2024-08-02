import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Flex, Icon, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
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

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const openEdit = (examen) => {
    setInitialValues(examen);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
  };

  const openDelete = (id, date_examen) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
    // Set the date_examen to state for DeleteExma
    setInitialValues({ date_examen });
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  const updateExamen = (updatedExamen) => {
    setExamens((prevExamens) =>
      prevExamens.map((examen) =>
        examen.id === updatedExamen.id ? updatedExamen : examen
      )
    );
  };

  return (
    <div>
      <h1>Welcome to ExmaSante Page</h1>
      <Flex mb={4}>
        <Button colorScheme="green" mr={4} onClick={openForm} leftIcon={<Icon as={FaPlus} />}>Add New Entry</Button>
      </Flex>
      <AddNewExmaSant isOpen={isFormOpen} onClose={closeForm} id_vache={id_vache} onSave={fetchExamens} />
      <EditExmaSant isOpen={isEditOpen} onClose={closeEdit} initialValues={initialValues} onSave={updateExamen} id_vache={id_vache} />
      <DeleteExma isOpen={isDeleteOpen} onClose={closeDelete} id={selectedId} id_vache={id_vache} date_examen={initialValues.date_examen} />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date Examen</Th>
            <Th>Maladie</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {examens.map((examen) => (
            <Tr key={examen.id}>
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
