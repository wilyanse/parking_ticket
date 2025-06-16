import type { Reservation } from "@/types";

import { SetStateAction, useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import { Reservations } from "@/components/Reservations";
import { getReservationsByOwner } from "@/api/parking/parkinglots"; // You should have this API function

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[] | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    const user = userStr ? JSON.parse(userStr) : null;
    const ownerId = user ? user.user_id : null;

    if (user && user.is_staff === true && ownerId) {
      getReservationsByOwner(ownerId).then(
        (data: SetStateAction<Reservation[] | null>) => {
          setReservations(data);
        },
      );
    }
  }, []);

  const userStr = localStorage.getItem("currentUser");
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user && user.is_staff === true;

  return (
    <DefaultLayout>
      {isAdmin && reservations && <Reservations data={reservations} />}
      {!isAdmin}
    </DefaultLayout>
  );
}
