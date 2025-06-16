import DefaultLayout from "@/layouts/default";
import { ParkingLotDetails } from "@/components/ParkingLotDetails";

import { useParams } from "react-router-dom";
export default function LocationsPage() {
  const userStr = localStorage.getItem("currentUser");

  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user && user.is_staff === true;

   const { lotId } = useParams();
   
  return (
    <DefaultLayout>
      {isAdmin && <ParkingLotDetails />}
      {!isAdmin}
    </DefaultLayout>
  );
}
