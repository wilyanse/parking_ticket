// Logged in landing page

import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");

    if (!userStr) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const userStr = localStorage.getItem("currentUser");
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user && user.is_staff === true;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-8 py-10 md:py-16">
        <div className="inline-block max-w-2xl text-center justify-center">
          <h1 className="text-4xl font-bold mb-2">
            Welcome to Parking Ticket!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Manage your parking experience with ease. Whether you&apos;re an
            admin or a user, you have access to powerful features to make
            parking simple and efficient.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          {/* Admin Section */}
          {isAdmin && (
            <div className="flex-1 bg-background rounded-lg shadow p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 text-left mx-auto max-w-md">
                <li>View, add, update, or delete parking locations</li>
                <li>Define and manage slots for each location</li>
                <li>See all current and upcoming reservations</li>
                <li>Cancel user reservations if necessary</li>
                <li>Monitor parking activity and view statistics</li>
                <li>Manage user accounts (view, deactivate, or update)</li>
                <li>Update your profile and password</li>
              </ul>
              <div className="flex flex-wrap justify-center gap-2 mt-auto">
                <Link
                  className={buttonStyles({ color: "primary", radius: "full" })}
                  href="/locations"
                >
                  Manage Parking Lots
                </Link>
                <Link
                  className={buttonStyles({
                    variant: "bordered",
                    radius: "full",
                  })}
                  href="/reservations"
                >
                  View Reservations
                </Link>
                <Link
                  className={buttonStyles({
                    variant: "flat",
                    color: "secondary",
                    radius: "full",
                  })}
                  href="/users"
                >
                  Manage Users
                </Link>
                <Link
                  className={buttonStyles({
                    variant: "flat",
                    color: "default",
                    radius: "full",
                  })}
                  href="/profile"
                >
                  Profile
                </Link>
              </div>
            </div>
          )}
          {/* User Section */}
          {!isAdmin && (
            <div className="flex-1 bg-background rounded-lg shadow p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold mb-2">User Portal</h2>
              <ul className="list-disc list-inside text-left text-gray-700 mb-4">
                <li>
                  View available parking locations and real-time slot
                  availability
                </li>
                <li>Reserve a parking slot and receive confirmation</li>
                <li>View and manage your active and past reservations</li>
                <li>Cancel reservations before start time</li>
                <li>Update your profile and password</li>
                <li>Receive alerts for reservation status</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-auto">
                <Link
                  className={buttonStyles({ color: "primary", radius: "full" })}
                  href="/locations"
                >
                  Find Parking
                </Link>
                <Link
                  className={buttonStyles({
                    variant: "bordered",
                    radius: "full",
                  })}
                  href="/reservations"
                >
                  My Reservations
                </Link>
                <Link
                  className={buttonStyles({
                    variant: "flat",
                    color: "default",
                    radius: "full",
                  })}
                  href="/profile"
                >
                  Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
