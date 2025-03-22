import { Wrap, WrapItem, Spinner, Text } from "@chakra-ui/react";
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { useEffect, useState } from "react";
import { getCustomers } from "./services/client.jsx";
import CardWithImage from "./components/Card.jsx";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCustomers()
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SidebarWithHeader>
        <Spinner />
      </SidebarWithHeader>
    );
  }

  if (customers.length <= 0) {
    return (
      <SidebarWithHeader>
        <Text>No customers available</Text>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <Wrap justify={"center"} spacing={"30"}>
        {customers.map((customer, index) => (
          <WrapItem key={index}>
            <CardWithImage {...customer} imageNumber={index} />
          </WrapItem>
        ))}
      </Wrap>
    </SidebarWithHeader>
  );
};

export default App;
