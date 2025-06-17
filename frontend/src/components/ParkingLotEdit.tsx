// Parking lot modal popup when edit button is pressed

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import React from "react";

import {
  updateParkingLocation,
  deleteParkingLocation,
} from "@/api/parking/parkinglots";

export default function ParkingLotEdit({
  lot,
  onUpdated,
}: {
  lot: any;
  onUpdated?: () => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = React.useState(lot?.name || "");
  const [location, setLocation] = React.useState(lot?.location || "");
  const [description, setDescription] = React.useState(lot?.description || "");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setName(lot?.name || "");
    setLocation(lot?.location || "");
    setDescription(lot?.description || "");
  }, [lot]);

  // Function to handle the update of parking lot details
  const handleUpdate = async () => {
    if (!name || !location || !description) {
      alert("Please fill out all fields.");

      return;
    }
    setLoading(true);
    try {
      await updateParkingLocation(lot.id, { name, location, description });
      alert("Parking lot updated!");
      onUpdated && onUpdated();
      onOpenChange();
    } catch {
      alert("Failed to update parking lot.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the deletion of a parking lot
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteParkingLocation(lot.id);
      alert("Parking lot deleted!");
      onUpdated && onUpdated();
      onOpenChange();
      window.location.href = "/locations";
    } catch {
      alert("Failed to delete parking lot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button color="primary" variant="flat" onPress={onOpen}>
        Edit
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Parking Lot
              </ModalHeader>
              {/* Form for parking lot editing */}
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Enter name of the parking lot"
                  value={name}
                  variant="bordered"
                  onValueChange={setName}
                />
                <Input
                  label="Location"
                  placeholder="Enter where your parking lot is located"
                  value={location}
                  variant="bordered"
                  onValueChange={setLocation}
                />
                <Input
                  label="Description"
                  placeholder="Enter a short description for the parking lot"
                  value={description}
                  variant="bordered"
                  onValueChange={setDescription}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  isLoading={loading}
                  variant="flat"
                  onPress={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  color="primary"
                  isLoading={loading}
                  onPress={handleUpdate}
                >
                  Update
                </Button>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
