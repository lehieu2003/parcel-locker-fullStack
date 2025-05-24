import { useState } from "react";
import { TextField, Button } from "@mui/material";
import LockerService from "../../../services/LockerService";
import { Locker } from "../../../models/locker";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { LatLngExpression } from "leaflet";

const LockerDetail = () => {
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [locker, setLocker] = useState<Locker>({
    address: "",
    cells: {
      length: "",
      cell_id: 0,
      occupied: false,
      size: "",
    },
    latitude: 0,
    locker_id: 0,
    longitude: 0,
  });

  const handleSearch = async () => {
    setErrorMessage("");
    setLocker({
      address: "",
      cells: {
        length: "",
        cell_id: 0,
        occupied: false,
        size: "",
      },
      latitude: 0,
      locker_id: 0,
      longitude: 0,
    });
    try {
      const lockerRes = await LockerService.get(searchQuery);

      if (lockerRes && lockerRes.length > 0) {
        const fetchedLocker = lockerRes[0];
        if (fetchedLocker) {
          setLocker(fetchedLocker);
        } else {
          setErrorMessage("Locker not found. Please check the locker ID.");
        }
      } else {
        setErrorMessage("Locker not found. Please check the locker ID.");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred while fetching locker details.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-h-0">
      <div className="flex flex-col mb-4">
        <div className="mb-3">
          <div className="flex flex-row gap-1">
            <h1 className="text-2xl font-bold">Locker &gt; </h1>
            <h1
              className="text-2xl font-bold"
              style={{
                color: "#FF8A00",
              }}
            >
              Locker detail
            </h1>
          </div>
          <div
            style={{
              backgroundColor: "#F24E1E",
              height: 1,
              width: 260,
            }}
          />
        </div>
        <div className="flex flex-row gap-10 mb-4 p-2 items-start space-y-2 sm:space-y-0 sm:space-x-2">
          <h2 className="font-bold self-center">Locker ID</h2>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter locker ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-row gap-5">
            <Button
              style={{
                borderRadius: 12,
                backgroundColor: "#FF8A00",
                color: "black",
                fontWeight: '700',
              }}
              onClick={() => {
                if (searchQuery.trim() === "") {
                  alert("Please enter a locker ID.");
                } else {
                  handleSearch();
                }
              }}
            >
              Search
            </Button>
          </div>
        </div>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {locker && (
          <>
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-row bg-[#D9D9D9] rounded-tl-xl rounded-tr-xl gap-40 px-10 py-3">
                <div className="flex flex-row gap-2 px-10">
                  <div className="font-bold">Locker ID:</div>
                  <div>{locker.locker_id}</div>
                </div>
                <div className="flex flex-row gap-2 px-10">
                  <div className="font-bold">Status:</div>
                  <div> </div>
                </div>
              </div>
              <div className="flex flex-row bg-[#D9D9D9] gap-2 px-20 py-3">
                <div className="font-bold">Locker Address:</div>
                <div>{locker.address}</div>
              </div>
              <div className="flex flex-row bg-[#D9D9D9] gap-5 px-10 py-3">
                <div className="flex flex-row gap-2 px-10">
                  <div className="font-bold">Longitude:</div>
                  <div>{locker.longitude?.toString()}</div>
                </div>
                <div className="flex flex-row gap-2 px-10">
                  <div className="font-bold">Latitude:</div>
                  <div>{locker.latitude?.toString()}</div>
                </div>
              </div>
              <div className="flex flex-row bg-[#D9D9D9] rounded-bl-xl rounded-br-xl gap-28 px-10">
                <div className="flex flex-row gap-2 px-10 py-3">
                  <div className="font-bold">Total cells:</div>
                  <div>{locker.cells.length}</div>
                </div>
              </div>
            </div>

            {/* {locker.latitude && locker.longitude && (
              <div className="mt-6 ">
                <h2 className="text-lg font-bold mb-4">Locker Location</h2>
                <div className="rounded-xl overflow-hidden border-4 border-gray-300">
                  <MapContainer
                    center={[locker.latitude, locker.longitude] as LatLngExpression}
                    zoom={20}
                    style={{ height: "400px", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[locker.latitude, locker.longitude]}>
                      <Popup>
                        <p>
                          Locker Address: {locker.address}.
                          <br />
                          Total cells: {locker.cells.length}.
                          <br />
                          Status: {locker.locker_status}.
                        </p>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )} */}


          </>
        )}
      </div>
    </div>
  );
};

export default LockerDetail;
