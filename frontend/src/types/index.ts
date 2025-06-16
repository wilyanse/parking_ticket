import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Location {
  id: string;
  name: string;
  description: string;
  location: string;
  date_created: string;
  date_updated: string;
}

export interface Slot {
  id: string;
  status: "available" | "occupied" | "reserved";
  date_created: string;
  date_updated: string;
  parking_location: string;
}

export interface Reservation {
  id: string;
  start_time: string;
  end_time: string;
  status: "active" | "cancelled" | "completed";
  date_created: string;
  date_updated: string;
  user: number;
  parking_location: string;
  parking_slot: string;
  username: string;
}
