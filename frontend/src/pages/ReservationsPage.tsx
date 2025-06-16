import type { Reservation } from "@/types";

import { useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import { Reservations } from "@/components/Reservations";
import {
  getReservationsByOwner,
  getReservationsByUser,
} from "@/api/parking/parkinglots"; // Include both API functions

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[] | null>(null);

  const userStr = localStorage.getItem("currentUser");
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.is_staff === true;

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) return;

      try {
        const data = isAdmin
          ? await getReservationsByOwner() // Admin: see all owned
          : await getReservationsByUser(); // User: see their own

        setReservations(data);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };

    fetchReservations();
  }, [isAdmin]);

  return (
    <DefaultLayout>
      {isAdmin && reservations && <Reservations data={reservations} />}
      {!isAdmin && reservations && (
        <Reservations data={reservations} isAdmin={false} />
      )}
    </DefaultLayout>
  );
}
