import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@chakra-ui/react";
import UpdateCustomerForm from "./UpdateCustomerForm";

const AddIcon = () => "+";
const CloseIcon = () => "x";

const UpdateCustomerDrawer = ({
  fetchCustomers,
  initialValues,
  customerId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg={"gray.200"}
        color={"black"}
        rounded={"full"}
        _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
        onClick={onOpen}
      >
        Update
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update customer</DrawerHeader>

          <DrawerBody>
            <UpdateCustomerForm
              fetchCustomers={fetchCustomers}
              initialValues={initialValues}
              customerId={customerId}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button
              leftIcon={<CloseIcon />}
              onClick={onClose}
              colorScheme="blue"
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateCustomerDrawer;
