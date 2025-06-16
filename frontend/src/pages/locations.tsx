import type { Location } from "@/types";

import { useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import { Locations } from "@/components/locations";
import { getParkingLocationsByUser } from "@/api/parking/parkinglots";

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[] | null>(null);

  useEffect(() => {
    getParkingLocationsByUser().then((data) => {
      setLocations(data);
    });
  }, []);

  const userStr = localStorage.getItem("currentUser");
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user && user.is_staff === true;

  return (
    <DefaultLayout>
      {isAdmin && locations && <Locations data={locations} />}
      {!isAdmin}
    </DefaultLayout>
  );
}
