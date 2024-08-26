import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Loader from "@/lib/Loader";
import { useGetCustomerGeographyQuery } from "@/redux/api/dashboardApi";
import Latitudes from "@/types/Lattitudes";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface GeoData {
  _id: string;
  totalCustomers: number;
}

const CustomerMap = () => {
  const { data: geoData, error, isLoading } = useGetCustomerGeographyQuery({});

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data!</p>;
  if (!geoData || !geoData.data.length) return <p>No data available!</p>;

  const defaultCenter = geoData.data.length
    ? Latitudes[geoData.data[0]._id] || { lat: 23.685, lng: 90.3563 }
    : { lat: 23.685, lng: 90.3563 };

  return (
    <div className="h-[80vh] w-full mx-auto p-2 md:p-4 space-y-4">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-600 text-center">
        Customer Geography
      </h1>
      <MapContainer
        center={[defaultCenter.lat, defaultCenter.lng]}
        zoom={7}
        className="h-[70vh] md:h-full rounded-sm"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {geoData.data.map((item: GeoData) => {
          const coordinates = Latitudes[item._id];
          if (!coordinates) return null;
          return (
            <Marker key={item._id} position={coordinates} icon={customIcon}>
              <Popup>
                {item._id}: {item.totalCustomers} customers
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CustomerMap;
