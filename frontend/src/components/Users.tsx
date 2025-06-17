// Users table for Admin

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

import { User } from "@/types/index.ts";
import { disableUser, enableUser, getUsers } from "@/api/auth/authService";

export interface UsersProps {
  title?: string;
  subtitle?: string;
  isAdmin?: boolean;
  data?: User[];
}

const statusOptions = [
  { name: "All", value: "all" },
  { name: "Active", value: "active" },
  { name: "Inactive", value: "inactive" },
];

export const Users: React.FC<UsersProps> = ({
  title = "Users",
  subtitle = "View and manage users.",
  isAdmin = true,
  data = [],
}) => {
  // Pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [users, setUsers] = React.useState<User[]>(data);

  React.useEffect(() => {
    if (!data.length) {
      getUsers().then(setUsers);
    }
  }, [data]);

  // Filter users by status
  const filteredData = React.useMemo(() => {
    if (statusFilter === "all") return users;
    if (statusFilter === "active") return users.filter((u) => u.is_active);
    if (statusFilter === "inactive") return users.filter((u) => !u.is_active);

    return users;
  }, [users, statusFilter]);
  
  // Pagination and filtering logic
  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData]);

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-10 md:py-16">
      <div className="inline-block max-w-2xl text-center justify-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-gray-600 mb-4">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-end mb-2">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat">
                Filter:{" "}
                {statusOptions.find((opt) => opt.value === statusFilter)?.name}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="User Status Filter"
              selectedKeys={[statusFilter]}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;

                setStatusFilter(selected);
                setPage(1);
              }}
            >
              {statusOptions.map((option) => (
                <DropdownItem key={option.value}>{option.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="w-full overflow-x-auto">
          <Table
            isStriped
            aria-label="Users table"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
            selectionMode="single"
          >
            <TableHeader>
              <TableColumn>USERNAME</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {/* Map user to table */}
              {items.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.is_active ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    {user.is_active ? (
                      <Button
                        color="danger"
                        size="sm"
                        variant="flat"
                        onPress={() => {
                          disableUser(user.id!).finally(() =>
                            window.location.reload(),
                          );
                        }}
                      >
                        Disable
                      </Button>
                    ) : (
                      <Button
                        color="success"
                        size="sm"
                        variant="flat"
                        onPress={() => {
                          enableUser(user.id!).finally(() =>
                            window.location.reload(),
                          );
                        }}
                      >
                        Enable
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};
