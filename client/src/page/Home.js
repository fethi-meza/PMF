import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AddVache from "../Components/Vache/AddVache";
import EditVach from "../Components/Vache/EditeVache";
import ViewVache from "../Components/Vache/ViewVache";
import DeleteVach from "../Components/Vache/DeleteVach";
import { Link } from "react-router-dom";

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [selectedVache, setSelectedVache] = useState(null);
  const [vaches, setVaches] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/vaches/AllVaches")
      .then((response) => {
        setVaches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vaches:", error);
      });
  }, []);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const openEdit = (vache) => {
    setInitialValues(vache);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
  };

  const openView = (vache) => {
    setSelectedVache(vache);
    setIsViewOpen(true);
  };

  const closeView = () => {
    setIsViewOpen(false);
  };

  const openDelete = (vache) => {
    setSelectedVache(vache);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  const updateVache = (updatedVache) => {
    setVaches((prevVaches) =>
      prevVaches.map((vache) =>
        vache.id_vache === updatedVache.id_vache ? updatedVache : vache
      )
    );
  };

  const addVache = (newVache) => {
    setVaches((prevVaches) => [...prevVaches, newVache]);
  };

  const deleteVache = (id_vache) => {
    axios
      .delete(`http://localhost:4000/api/v1/vaches/${id_vache}`)
      .then(() => {
        setVaches((prevVaches) =>
          prevVaches.filter((vache) => vache.id_vache !== id_vache)
        );
      })
      .catch((error) => {
        console.error("Error deleting vache:", error);
      })
      .finally(() => {
        closeDelete();
      });
  };

  return (
    <Box className="n" p={4}>
      <Box textAlign="center">
        <h1 style={{ fontSize: "2rem" }}>
          <span style={{ color: "green" }}>Welcome</span>
          <span style={{ color: "red" }}> To</span>
          <span style={{ color: "white" }}> Home Page</span>
        </h1>
      </Box>

      <Flex justify="left" mb={4}>
        <Button
          colorScheme="green"
          mr={4}
          onClick={openForm}
          leftIcon={<Icon as={FaPlus} />}
        >
          Add New Vache
        </Button>
      </Flex>

      <AddVache isOpen={isFormOpen} onClose={closeForm} onSave={addVache} />
      <EditVach
        isOpen={isEditOpen}
        onClose={closeEdit}
        initialValues={initialValues}
        onSave={updateVache}
      />
      <ViewVache isOpen={isViewOpen} onClose={closeView} vache={selectedVache} />
      <DeleteVach
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        id_vache={selectedVache ? selectedVache.id_vache : null}
        onDelete={() => deleteVache(selectedVache.id_vache)}
      />

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Date</Th>
            <Th>ExmaSante</Th>
            <Th>Valge</Th>
            <Th>Production Lait</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {vaches.map((vache) => (
            <Tr key={vache.id_vache}>
              <Td>{vache.id_vache}</Td>
              <Td>{vache.date_entree}</Td>
              <Td>
                <Button
                  as={Link}
                  to={`/ExmaSante/${vache.id_vache}`}
                  size="sm"
                  colorScheme="blue"
                  ml={2}
                >
                  ExmaSante
                </Button>
              </Td>
              <Td>
                <Button
                  as={Link}
                  to={`/Valge`}
                  size="sm"
                  colorScheme="red"
                  ml={2}
                >
                  Valge
                </Button>
              </Td>
              <Td>
                <Button
                  as={Link}
                  to={`/ProductionLait/${vache.id_vache}`}
                  size="sm"
                  colorScheme="purple"
                  ml={2}
                >
                  Production Lait
                </Button>
              </Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  ml={2}
                  onClick={() => openView(vache)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  colorScheme="orange"
                  ml={2}
                  onClick={() => openEdit(vache)}
                  leftIcon={<Icon as={FaEdit} />}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  ml={2}
                  onClick={() => openDelete(vache)}
                  leftIcon={<Icon as={FaTrash} />}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Home;
