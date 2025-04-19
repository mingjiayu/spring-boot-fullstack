import { Wrap, WrapItem, Spinner, Text } from "@chakra-ui/react";
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { useEffect, useState } from "react";
import { getCustomers } from "./services/client.js";
import CardWithImage from "./components/customer/Card.jsx";
import DrawerForm from "./components/customer/CreateCustomerDrawer.jsx";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const fetchCustomers = () => {
    setLoading(true);
    getCustomers()
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        setError(err.code, err.response.data.message);
        errorNotification(err.code, err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <SidebarWithHeader>
        <Spinner />
      </SidebarWithHeader>
    );
  }

  if (err) {
    return (
      <SidebarWithHeader>
        <DrawerForm fetchCustomers={fetchCustomers} />
        <Text mt={5}>Oops there is an error</Text>
      </SidebarWithHeader>
    );
  }

  if (customers.length <= 0) {
  }

  return (
    <SidebarWithHeader>
      <DrawerForm fetchCustomers={fetchCustomers} />
      <Wrap justify={"center"} spacing={"30"}>
        {customers.map((customer, index) => (
          <WrapItem key={index}>
            <CardWithImage {...customer} imageNumber={index} fetchCustomers={fetchCustomers}/>
          </WrapItem>
        ))}
      </Wrap>
    </SidebarWithHeader>
  );
};

export default App;
