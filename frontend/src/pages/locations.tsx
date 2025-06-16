import type { Location } from "@/types";

import { useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import { Locations } from "@/components/locations";
import { getParkingLocations, getParkingLocationsByUser } from "@/api/parking/parkinglots";

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[] | null>(null);

  const userStr = localStorage.getItem("currentUser");
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user && user.is_staff === true;

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = isAdmin
          ? await getParkingLocationsByUser() // Admin: fetch all locations
          : await getParkingLocations(); // Non-admin: fetch user-specific

        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [isAdmin]);

  return (
    <DefaultLayout>
      {isAdmin && locations && <Locations data={locations}/>}
      {!isAdmin && locations && <Locations data={locations} isAdmin={false} />}
    </DefaultLayout>
  );
}
