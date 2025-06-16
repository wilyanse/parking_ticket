import DefaultLayout from "@/layouts/default";
import { Locations } from "@/components/locations";

export default function LocationsPage() {
  const userStr = localStorage.getItem("currentUser");

  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user && user.is_staff === true;

  return (
    <DefaultLayout>
        {isAdmin && <Locations />}
        {!isAdmin}
    </DefaultLayout>
  );
}
