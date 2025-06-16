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

import { createReservation } from "@/api/parking/parkinglots";

interface ReservationAddProps {
  parkingLocation: string;
  parkingSlot: string;
}

export default function ReservationAdd({
  parkingLocation,
  parkingSlot,
}: ReservationAddProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");

  const handleCreate = async () => {
    if (!startTime || !endTime) {
      alert("Please fill out all fields.");

      return;
    }

    try {
      await createReservation({
        start_time: startTime,
        end_time: endTime,
        parking_location: parkingLocation,
        parking_slot: parkingSlot,
      });
      setStartTime("");
      setEndTime("");
      alert("Reservation created!");
      window.location.reload();
    } catch {
      alert("Failed to create reservation.");
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Reservation
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Register Reservation
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Start Time"
                  placeholder="YYYY-MM-DDTHH:MM"
                  type="datetime-local"
                  value={startTime}
                  variant="bordered"
                  onValueChange={setStartTime}
                />
                <Input
                  label="End Time"
                  placeholder="YYYY-MM-DDTHH:MM"
                  type="datetime-local"
                  value={endTime}
                  variant="bordered"
                  onValueChange={setEndTime}
                />
                <Input
                  isDisabled
                  isReadOnly
                  contentEditable={false}
                  label="Parking Location ID"
                  value={parkingLocation}
                  variant="bordered"
                />
                <Input
                  isDisabled
                  isReadOnly
                  contentEditable={false}
                  label="Parking Slot ID"
                  value={parkingSlot}
                  variant="bordered"
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
