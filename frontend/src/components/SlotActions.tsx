// Buttons for managing parking slot - admin side

import { Button } from "@heroui/react";
import React from "react";

import {
  createParkingSlot,
  deleteParkingSlot,
} from "@/api/parking/parkinglots";

export default function SlotActions({
  locationId,
  onUpdated,
}: {
  locationId: string;
  onUpdated?: () => void;
}) {
  const [loading, setLoading] = React.useState(false);

  const handleCreateSlot = async () => {
    setLoading(true);
    try {
      await createParkingSlot(locationId);
      alert("Slot created!");
      onUpdated && onUpdated();
    } catch {
      alert("Failed to create slot.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async () => {
    setLoading(true);
    try {
      await deleteParkingSlot(locationId);
      alert("Latest slot deleted!");
      onUpdated && onUpdated();
    } catch {
      alert("Failed to delete slot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button color="primary" isLoading={loading} onPress={handleCreateSlot}>
        Add Slot
      </Button>
      <Button
        color="danger"
        isLoading={loading}
        variant="flat"
        onPress={handleDeleteSlot}
      >
        Subtract Slot
      </Button>
    </div>
  );
}
