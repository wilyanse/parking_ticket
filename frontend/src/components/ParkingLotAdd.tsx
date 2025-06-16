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

import { createParkingLocation } from "@/api/parking/parkinglots";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleCreate = async () => {
    // Get user_id from localStorage (assuming currentUser is stored there)
    const userStr = localStorage.getItem("currentUser");
    const user = userStr ? JSON.parse(userStr) : null;
    const user_id = user?.user_id;

    if (!name || !location || !description || !user_id) {
      alert("Please fill out all fields.");

      return;
    }

    try {
      await createParkingLocation({
        name,
        location,
        description,
        user_id,
      });
      // Optionally clear fields or trigger a refresh
      setName("");
      setLocation("");
      setDescription("");
      alert("Parking lot created!");
      window.location.reload();
    } catch {
      alert("Failed to create parking lot.");
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Parking Lot
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Register Parking Lot
              </ModalHeader>
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
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await handleCreate();
                    onClose();
                  }}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
