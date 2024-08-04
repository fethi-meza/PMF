import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Flex, Icon, Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import AddNewProductionLait from "../Components/production_lait/addNewPRODctionLite";
import EditProductionLait from "../Components/production_lait/EditePRodictionLite";
import DeleteProductionLait from "../Components/production_lait/DeletePRodictionLite";

const ProductionLait = () => {
  const { id_vache } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productionLait, setProductionLait] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const fetchProductionLait = useCallback(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/v1/vaches/${id_vache}/productions`);
      setProductionLait(response.data);
    } catch (error) {
      console.error("Error fetching production data:", error);
    }
  }, [id_vache]);

  useEffect(() => {
    fetchProductionLait();
  }, [fetchProductionLait]);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const openEdit = (production) => {
    setInitialValues(production);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
  };

  const openDelete = (id, date_production) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
    setInitialValues({ date_production });
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  const updateProductionLait = (updatedProduction) => {
    setProductionLait((prevProductionLait) =>
      prevProductionLait.map((production) =>
        production.id === updatedProduction.id ? updatedProduction : production
      )
    );
  };

  return (
    <div>
      <Box className="n" p={4}>
        <Box textAlign="center">
          <h1 style={{ fontSize: "2rem" }}>
            <span style={{ color: "green" }}>Welcome</span>
            <span style={{ color: "red" }}> To</span>
            <span style={{ color: "white" }}> Production Lait Page</span>
          </h1>
        </Box>
      </Box>

      <Flex mb={4}>
        <Button colorScheme="green" mr={4} onClick={openForm} leftIcon={<Icon as={FaPlus} />}>
          Add New Production Lait
        </Button>
      </Flex>
      <AddNewProductionLait isOpen={isFormOpen} onClose={closeForm} id_vache={id_vache} onSave={fetchProductionLait} />
      <EditProductionLait isOpen={isEditOpen} onClose={closeEdit} initialValues={initialValues} onSave={updateProductionLait} id_vache={id_vache} />
      <DeleteProductionLait isOpen={isDeleteOpen} onClose={closeDelete} id={selectedId} id_vache={id_vache} date_production={initialValues.date_production} />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Date Production</Th>
            <Th>Litres Lait</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productionLait.map((production) => (
            <Tr key={production.id}>
              <Td>{production.id}</Td>
              <Td>{production.date_production}</Td>
              <Td>{production.litres_lait}</Td>
              <Td>
                <Button size="sm" colorScheme="blue" ml={2} onClick={() => openEdit(production)} leftIcon={<Icon as={FaEdit} />}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => openDelete(production.id, production.date_production)} leftIcon={<Icon as={FaTrash} />}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default ProductionLait;
