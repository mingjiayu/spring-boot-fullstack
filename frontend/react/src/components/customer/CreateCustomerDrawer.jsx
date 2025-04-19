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
import CreateCustomerForm from "./CreateCustomerForm";

const AddIcon = () => "+";
const CloseIcon = () => "x";

const DrawerForm = ({fetchCustomers}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button leftIcon={<AddIcon />} onClick={onOpen} colorScheme="blue">
        Create customer
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new customer</DrawerHeader>

          <DrawerBody>
            <CreateCustomerForm 
              fetchCustomers={fetchCustomers}
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

export default DrawerForm;
