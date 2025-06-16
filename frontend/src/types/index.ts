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