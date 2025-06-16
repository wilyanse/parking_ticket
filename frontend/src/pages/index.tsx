import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-8 py-10 md:py-16">
        <div className="inline-block max-w-2xl text-center justify-center">
          <h1 className="text-4xl font-bold mb-2">
            Parking Ticket: Treat your parking lot like it&apos;s a movie
            screening!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Parking ticket is a full-stack application built with React, Django,
            and Postgres to make parking management easy for admins and users.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <div className="flex-1 bg-background rounded-lg shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Admin Features</h2>
            <ul className="list-disc list-inside text-left text-gray-700 mb-4">
              <li>Secure login to admin dashboard</li>
              <li>Add, update, or delete parking locations</li>
              <li>Define number of slots per location</li>
              <li>View current and upcoming reservations</li>
              <li>Cancel user reservations</li>
              <li>View parking activity summary</li>
              <li>Manage user accounts</li>
            </ul>
            <div className="flex gap-2 mt-auto">
              <Link
                className={buttonStyles({ color: "primary", radius: "full" })}
                href="/login"
              >
                Get started as an admin
              </Link>
            </div>
          </div>
          <div className="flex-1 bg-background rounded-lg shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">User Features</h2>
            <ul className="list-disc list-inside text-left text-gray-700 mb-4">
              <li>Register and log in securely</li>
              <li>Update profile and password</li>
              <li>View available parking locations</li>
              <li>See real-time slot availability</li>
              <li>Reserve a parking slot and get confirmation</li>
              <li>View active and past reservations</li>
              <li>Cancel reservation before start time</li>
              <li>Receive alerts for reservation status</li>
            </ul>
            <div className="flex gap-2 mt-auto">
              <Link
                className={buttonStyles({ color: "primary", radius: "full" })}
                href="/login"
              >
                Get started as a user
              </Link>
            </div>
          </div>
        </div>

        {/*         <div className="flex gap-4 mt-4">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div> */}
      </section>
    </DefaultLayout>
  );
}
