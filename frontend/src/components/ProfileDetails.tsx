import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import React from "react";

import { logout, updateUser, disableUser } from "@/api/auth/authService";

export default function ProfileDetails() {
  const userStr = localStorage.getItem("currentUser");
  const [user, setUser] = React.useState(userStr ? JSON.parse(userStr) : null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [username, setUsername] = React.useState(user?.username || "");
  const [email, setEmail] = React.useState(user?.email || "");
  const [loading, setLoading] = React.useState(false);

  // When modal opens, sync input fields with user state
  React.useEffect(() => {
    if (isOpen && user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [isOpen, user]);

  const handleUpdate = async () => {
    if (!user?.user_id) return;
    setLoading(true);
    try {
      await updateUser(user.user_id, { username, email });
      const updatedUser = { ...user, username, email };

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Profile updated!");
      onOpenChange();
    } catch {
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p className="text-gray-600">No user information found.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-10 md:py-16">
      <div className="inline-block max-w-2xl text-center justify-center">
        <div className="flex flex-col items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold">Profile</h2>
        </div>
        <p className="text-gray-600 mb-1">Username: {user.username}</p>
        <p className="text-gray-600 mb-1">Email: {user.email}</p>
        <p className="text-gray-600 mb-1">User ID: {user.user_id}</p>
        <p className="text-gray-600 mb-1">
          Role: {user.is_staff ? "Admin" : "User"}
        </p>
        <div className="flex flex-col gap-2 mt-6 items-center">
          <div className="flex gap-2">
            <Button color="primary" onPress={onOpen}>
              Edit
            </Button>
            <Button
              color="warning"
              isLoading={loading}
              variant="flat"
              onPress={async () => {
                if (
                  !window.confirm(
                    "Are you sure you want to disable your account? This action cannot be undone.",
                  )
                )
                  return;
                setLoading(true);
                try {
                  await disableUser(user.user_id);
                  localStorage.removeItem("currentUser");
                  alert("Your account has been disabled.");
                  logout();
                } catch {
                  alert("Failed to disable account.");
                } finally {
                  setLoading(false);
                }
              }}
            >
              Disable Account
            </Button>
          </div>
          <Button color="danger" onPress={logout}>
            Logout
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Profile
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Username"
                  placeholder="Enter your username"
                  value={username}
                  variant="bordered"
                  onValueChange={setUsername}
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  variant="bordered"
                  onValueChange={setEmail}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={loading}
                  onPress={handleUpdate}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
