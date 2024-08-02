import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";

const ViewVache = ({ isOpen, onClose, vache }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>View Vache</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {vache ? (
            <>
              <p>ID: {vache.id_vache}</p>
              <p>Date: {vache.date_entree}</p>
              <p>Race: {vache.race}</p>
              {vache.examens_sante && vache.examens_sante.map((examen, index) => (
                <p key={index}>Examen {index + 1}: {examen.maladie}</p>
              ))}
              {vache.vêlages && vache.vêlages.map((velage, index) => (
                <p key={index}>Vêlage {index + 1}: {velage.date_vêlage}</p>
              ))}
              <p>Production Lait:</p>
              {vache.production_lait && vache.production_lait.map((production, index) => (
                <p key={index}>Date: {production.date_production}"=="Litres: {production.litres_lait}</p>
              ))}
            </>
          ) : (
            <p>No vache data provided.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewVache;
