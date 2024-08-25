import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";

HighchartsMap(Highcharts);

const CustomerLocation = () => {
  const [mapOptions, setMapOptions] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const customerResponse = await fetch(
        "http://localhost:5000/api/customers/location"
      );
      const customerData = await customerResponse.json();
      console.log(customerData);

      const mapData = customerData?.data?.map((location) => ({
        code3: location._id,
        value: location.totalCustomers,
      }));

      const topologyResponse = await fetch(
        "https://code.highcharts.com/mapdata/custom/world.topo.json"
      );
      const topology = await topologyResponse.json();
      console.log(topology);

      setMapOptions({
        chart: {
          map: topology,
        },
        title: {
          text: "Geographical Distribution of Customers",
        },
        mapNavigation: {
          enabled: true,
          enableDoubleClickZoomTo: true,
        },
        colorAxis: {
          min: 0,
          stops: [
            [0, "#EFEFFF"],
            [0.5, "#4444FF"],
            [1, "#000022"],
          ],
        },
        series: [
          {
            data: mapData,
            mapData: topology,
            joinBy: ["iso-a3", "code3"],
            name: "Total Customers",
            states: {
              hover: {
                color: "#BADA55",
              },
            },
            tooltip: {
              pointFormat: "{point.name}: {point.value} customers",
            },
          },
        ],
      });
    };

    fetchCustomerData();
  }, []);

  if (!mapOptions) return <div>Loading...</div>;

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={mapOptions}
        constructorType={"mapChart"}
      />
    </div>
  );
};

export default CustomerLocation;
