import React from "react";
import { useParams } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import { ParkingLotDetails } from "@/components/ParkingLotDetails";
import {
  getParkingLocationById,
  getParkingSlotsByLocation,
} from "@/api/parking/parkinglots";

export default function LocationsPage() {
  const userStr = localStorage.getItem("currentUser");
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user && user.is_staff === true;

  const { lotId } = useParams();

  const [lotData, setLotData] = React.useState<any>(null);
  const [slots, setSlots] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (lotId) {
          const [lot, slotList] = await Promise.all([
            getParkingLocationById(lotId as string),
            getParkingSlotsByLocation(lotId as string),
          ]);

          setLotData(lot);
          setSlots(slotList);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [lotId]);

  return (
    <DefaultLayout>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <ParkingLotDetails data={slots} isAdmin={isAdmin} lotData={lotData} />
      )}
    </DefaultLayout>
  );
}
