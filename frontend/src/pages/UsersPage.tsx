import type { User } from "@/types";

import { useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import { Users } from "@/components/Users";
import { getUsers } from "@/api/auth/authService";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const userStr = localStorage.getItem("currentUser");
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user && user.is_staff === true;

  useEffect(() => {
    if (isAdmin) {
      getUsers().then(setUsers);
    }
  }, [isAdmin]);

  return (
    <DefaultLayout>
      {isAdmin && <Users data={users} />}
      {!isAdmin && (
        <div className="flex flex-col items-center justify-center py-10">
          <h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
          <p className="text-gray-600">You do not have access to this page.</p>
        </div>
      )}
    </DefaultLayout>
  );
}
