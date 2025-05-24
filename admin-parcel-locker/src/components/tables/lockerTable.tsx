import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  Search,
//   Edit,
  ArrowLeft,
  ArrowRight,
} from "@mui/icons-material";
// import EditLocker from "../pages/locker/editLocker";
import LockerService from "../../services/LockerService";
import { Locker } from "../../models/locker";

const LockerTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const lockersPerPage = 10;
  const [lockers, setLockers] = useState<Locker[]>([]);
//   const [
// 	// selectedLocker
// 	, setSelectedLocker] = useState<Locker | null>(null);
//   const [
// 	// isEditLockerOpen
// 	, setIsEditLockerOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
//   const [, setIsModalOpen] = useState(false);
  const [filter] = useState<{ [key: string]: string | number }>({});
  const [isFilterChange] = useState(false);
  useEffect(() => {
    fetchLockers(currentPage, lockersPerPage);
  }, [currentPage, lockersPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchLockers(page, lockersPerPage);
    }
  };
  const fetchLockers = async (currentPage: number, lockersPerPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await LockerService.getPaging(currentPage, lockersPerPage);
      const listLocker: Locker[] = response.data;
      const totalPages = response.total_pages;
      if (currentPage == 1) {
        setLockers(listLocker);
      }
      else setLockers(lockers.concat(listLocker));
      setTotalPages(totalPages);

    } catch (e) {
      setError("Failed to load lockers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
//   const onModalClose = () => {
//     setIsEditLockerOpen(false);
//     setIsModalOpen(false);
//     fetchLockers(currentPage, lockersPerPage);

//   }



  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };


  const filteredLockers = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();

    const searched = lockers.filter((locker) => {
      return (
        locker.locker_id.toString().includes(normalizedQuery) ||
		locker.address.toLowerCase().includes(normalizedQuery)
      );
    });

    const filtered = searched.filter((locker) =>
      Object.keys(filter).every((key) => {
        if (!filter[key]) return true;
        return locker[key as keyof Locker]?.toString() === filter[key]?.toString();
      })
    );

    return filtered;
  }, [isFilterChange, searchQuery, lockers, filter]);


//   const handleEditLocker = (updatedLocker: Locker) => {
//     const id = selectedLocker?.locker_id;

//     if (id) {
//       const updatedLockers = lockers.map((locker) => {
//         if (locker.locker_id === id) {
//           return {
//             ...locker,
//             ...updatedLocker,
//           };
//         }
//         return locker;
//       });
//       setLockers(updatedLockers);
//     }
//     setIsEditLockerOpen(false);
//   };

//   const handleOpenEditLocker = (locker: Locker) => {
//     setSelectedLocker(locker);
//     setIsEditLockerOpen(true);
//   };

  if (loading) {
    return (
      <div className="loader-container">
        <CircularProgress /> Loading lockers...
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }


  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="mb-3">
          <div className="flex flex-row gap-1">
            <h1 className="text-2xl font-bold">Locker &gt; </h1>
            <h1
              className="text-2xl font-bold"
              style={{
                color: "#FF8A00",
              }}
            >
              List of Lockers
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

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by ID, Locker, Email, Phone..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
          />
        
        </div>
      </div>
      <div className="overflow-y-auto max-h-[73vh] flex justify-center">
        <table className="w-full bg-white rounded-lg shadow-md mx-auto">
          <thead>
            <tr>
              <th className="p-4 pl-10 w-[1%] text-left">ID</th>
              <th className="p-4 w-[40%] text-left">Locker Address</th>
              <th className="p-4 w-[15%] text-left">Cells Count</th>

              <th className="p-4 w-[5%] text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLockers
              .slice(
                (currentPage - 1) * lockersPerPage,
                currentPage * lockersPerPage
              )
              .map((locker: Locker) => (
                <tr key={locker.locker_id} className="border-t">
                  <td className="p-4 pl-10">{locker.locker_id}</td>
                  <td className="p-4">
                    <div>
                      <div className="font-bold text-sm">{locker.address}</div>
                    </div>
                  </td>
                  <td className="p-4 pl-12">{locker.cells.length}</td>

                  {/* <td className="p-4">
                    <IconButton onClick={() => handleOpenEditLocker(locker)}>
                      <Edit />
                    </IconButton>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4">
        {currentPage == 1 ? (
          <Button disabled>
            <ArrowLeft />
          </Button>
        ) : (
          <Button
            sx={{ color: "black" }}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ArrowLeft />
          </Button>
        )}
        <Button >
          {currentPage}
        </Button>
        {currentPage == totalPages ? (
          <Button disabled>
            <ArrowRight />
          </Button>
        ) : (
          <Button
            sx={{ color: "black" }}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ArrowRight />
          </Button>
        )}
      </div>



      {/* {isEditLockerOpen && selectedLocker && (
        <EditLocker
          open={isEditLockerOpen}
          onClose={() => onModalClose()}
          selectedLocker={selectedLocker}
          onEditLocker={handleEditLocker}
        />
      )} */}

    </div>
  );
};

export default LockerTable;