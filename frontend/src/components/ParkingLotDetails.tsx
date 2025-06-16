import React from "react";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

import slotsData from "@/statics/slots.json";
import locationsData from "@/statics/locations.json";
import { Location, Slot } from "@/types/index.ts";

export interface ParkingLotDetailsProps {
  isAdmin?: boolean;
  data?: Slot[];
  lotData?: Location;
}

const slotStatusOptions = [
  { name: "All", value: "all" },
  { name: "Available", value: "available" },
  { name: "Occupied", value: "occupied" },
  { name: "Reserved", value: "reserved" },
];

export const ParkingLotDetails: React.FC<ParkingLotDetailsProps> = ({
  isAdmin = true,
  data = slotsData,
  lotData = locationsData[0],
}) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  // Filter slots by status
  const filteredData = React.useMemo(() => {
    if (statusFilter === "all") return data;

    return data.filter((slot) => slot.status === statusFilter);
  }, [data, statusFilter]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData]);

  const totalSlots = data.length;
  const availableSlots = data.filter(
    (slot) => slot.status === "available",
  ).length;

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-10 md:py-16">
      <div className="inline-block max-w-2xl text-center justify-center">
        <h2 className="text-2xl font-bold mb-2">{lotData?.name}</h2>
        <p className="text-gray-600 mb-1">
          Available Slots: {availableSlots}/{totalSlots}
        </p>
        <p className="text-gray-600 mb-1">
          Date Created: {lotData?.date_created}
        </p>
        <p className="text-gray-600 mb-1">
          Last Updated: {lotData?.date_updated}
        </p>
      </div>
      <div className="flex flex-col gap-3 max-w-2xl w-full">
        <div className="flex justify-end mb-2">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat">
                Filter:{" "}
                {
                  slotStatusOptions.find((opt) => opt.value === statusFilter)
                    ?.name
                }
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Slot Status Filter"
              selectedKeys={[statusFilter]}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;

                setStatusFilter(selected);
                setPage(1);
              }}
            >
              {slotStatusOptions.map((option) => (
                <DropdownItem key={option.value}>{option.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="overflow-x-auto">
          <Table
            aria-label="Slots table"
            bottomContent={
              <div className="flex justify-center">
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
              <TableColumn className="text-center">ID</TableColumn>
              <TableColumn className="text-center">STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((slot, idx) => (
                <TableRow key={slot.id}>
                  <TableCell className="text-center">
                    {(page - 1) * rowsPerPage + idx + 1}
                  </TableCell>
                  <TableCell className="text-center">{slot.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ParkingLotDetails;
