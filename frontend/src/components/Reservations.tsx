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

import reservationsData from "@/statics/reservations.json";
import { Reservation } from "@/types/index.ts";
import { cancelReservationStatus } from "@/api/parking/parkinglots";

export interface ReservationsProps {
  title?: string;
  subtitle?: string;
  isAdmin?: boolean;
  data?: Reservation[];
}

const statusOptions = [
  { name: "All", value: "all" },
  { name: "Active", value: "active" },
  { name: "Cancelled", value: "cancelled" },
  { name: "Expired", value: "expired" },
];

export const Reservations: React.FC<ReservationsProps> = ({
  title = "Reservations",
  subtitle = "View all parking reservations.",
  isAdmin = true,
  data = reservationsData,
}) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  // Filter reservations by status
  const filteredData = React.useMemo(() => {
    if (statusFilter === "all") return data;

    return data.filter((res) => res.status === statusFilter);
  }, [data, statusFilter]);

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
              aria-label="Reservation Status Filter"
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
            aria-label="Reservations table"
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
              <TableColumn>USER</TableColumn>
              <TableColumn>LOCATION</TableColumn>
              <TableColumn>START</TableColumn>
              <TableColumn>END</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((res) => (
                <TableRow key={res.id}>
                  <TableCell>{res.username}</TableCell>
                  <TableCell>{res.parking_location}</TableCell>
                  <TableCell>
                    {new Date(res.start_time).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(res.end_time).toLocaleString()}
                  </TableCell>
                  <TableCell>{res.status}</TableCell>
                  <TableCell>
                    <Button
                      color="danger"
                      isDisabled={res.status !== "active"}
                      size="sm"
                      variant="flat"
                      onPress={() => {
                        cancelReservationStatus(res.id).finally(() => {
                          window.location.reload();
                        });
                      }}
                    >
                      Cancel
                    </Button>
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
