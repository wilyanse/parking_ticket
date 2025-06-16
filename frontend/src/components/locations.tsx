import locationsData from "../statics/locations.json";

export interface Location {
  id: string;
  name: string;
  description: string;
  location: string;
  date_created: string;
  date_updated: string;
}

export interface LocationsProps {
  title?: string;
  subtitle?: string;
  isAdmin?: boolean;
  data?: Location[];
}

export const Locations: React.FC<LocationsProps> = ({
  title = "Parking Ticket Locations",
  subtitle = "Manage your parking locations and reservations efficiently.",
  isAdmin = false,
  data = locationsData
}) => {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-10 md:py-16">
      <div className="inline-block max-w-2xl text-center justify-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-gray-600 mb-4">{subtitle}</p>
      </div>


      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Created</th>
              <th className="px-4 py-2 border-b">Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  No locations found.
                </td>
              </tr>
            ) : (
              data.map((loc) => (
                <tr key={loc.id}>
                  <td className="px-4 py-2 border-b">{loc.name}</td>
                  <td className="px-4 py-2 border-b">{loc.description}</td>
                  <td className="px-4 py-2 border-b">{loc.location}</td>
                  <td className="px-4 py-2 border-b">{new Date(loc.date_created).toLocaleString()}</td>
                  <td className="px-4 py-2 border-b">{new Date(loc.date_updated).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
