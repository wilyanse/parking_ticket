import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Parking Lots
export interface Location {
  id: string;
  name: string;
  description: string;
  location: string;
  date_created: string;
  date_updated: string;
}

// Parking Slots
export interface Slot {
  id: string;
  status: "available" | "occupied" | "reserved";
  date_created: string;
  date_updated: string;
  parking_location: string;
}

// Reservations
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

// user
export interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
}
