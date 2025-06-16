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

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleCreate = () => {
    // Implement your create logic here
    // For example, collect input values and send to API
    // You may want to use useState to manage input values
    console.log("Create button clicked");
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Parking Lot
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Register Parking Lot
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Enter name of the parking lot"
                  variant="bordered"
                />
                <Input
                  label="Location"
                  placeholder="Enter where your parking lot is located"
                  variant="bordered"
                />
                <Input
                  label="Description"
                  placeholder="Enter a short description for the parking lot"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    // Call your create function here
                    handleCreate();
                    onClose();
                  }}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
