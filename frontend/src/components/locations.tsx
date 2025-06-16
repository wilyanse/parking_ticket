import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";

import locationsData from "@/statics/locations.json";
import { Location } from "@/types/index.ts";
import ParkingLotAdd from "@/components/ParkingLotAdd.tsx";
export interface LocationsProps {
  title?: string;
  subtitle?: string;
  isAdmin?: boolean;
  data?: Location[];
}

export const Locations: React.FC<LocationsProps> = ({
  title = "Parking Locations",
  subtitle = "Manage your parking locations and reservations efficiently.",
  isAdmin = true,
  data = locationsData,
}) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-10 md:py-16">
      <div className="inline-block max-w-2xl text-center justify-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-gray-600 mb-4">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <ParkingLotAdd />
        <div className="w-full overflow-x-auto">
          <Table
            isStriped
            aria-label="Locations table"
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
              <TableColumn>NAME</TableColumn>
              <TableColumn>DESCRIPTION</TableColumn>
              <TableColumn>LOCATION</TableColumn>
              {/* <TableColumn>ACTIONS</TableColumn> */}
            </TableHeader>
            <TableBody>
              {items.map((loc) => (
                <TableRow
                  key={loc.id}
                  className="cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/locations/${loc.id}`)
                  }
                >
                  <TableCell>{loc.name}</TableCell>
                  <TableCell>{loc.description}</TableCell>
                  <TableCell>{loc.location}</TableCell>
                  {/* <TableCell>
                    {isAdmin ? (
                      <div className="flex gap-2">
                      <button
                        className="text-secondary-500 hover:underline"
                        onClick={() => alert(`Edit ${loc}`)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="text-tertiary-500 hover:underline"
                        onClick={() => alert(`Delete ${loc}`)}
                      >
                        <DeleteIcon />
                      </button>
                      </div>
                    ) : null}
                    </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};
