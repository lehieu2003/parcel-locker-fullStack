import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  Search,
  Edit,
  ArrowLeft,
  ArrowRight,
} from "@mui/icons-material";
import EditOrder from "../pages/order/editOrder";
import OrderService from "../../services/OrderService";
import { Order } from "../../models/order";

const OrderTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditOrderOpen, setIsEditOrderOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [, setIsModalOpen] = useState(false);
  const [filter] = useState<{ [key: string]: string | number }>({});
  const [isFilterChange] = useState(false);
  useEffect(() => {
    fetchOrders(currentPage, ordersPerPage);
  }, [currentPage, ordersPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchOrders(page, ordersPerPage);
    }
  };
  const fetchOrders = async (currentPage: number, ordersPerPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await OrderService.getOrderPage(currentPage, ordersPerPage);
      const listOrder: Order[] = response.data;
      const totalPages = response.total_pages;
      if (currentPage == 1) {
        setOrders(listOrder);
      }
      else setOrders(orders.concat(listOrder));
      setTotalPages(totalPages);

    } catch (e) {
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const onModalClose = () => {
    setIsEditOrderOpen(false);
    setIsModalOpen(false);
    fetchOrders(currentPage, ordersPerPage);

  }



  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };






  const filteredOrders = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();

    const searched = orders.filter((order) => {
      return (
        order.order_id.toString().includes(normalizedQuery) ||
        order.sending_address.addressName.toLowerCase().includes(normalizedQuery) ||
        order.receiving_address.addressName.toLowerCase().includes(normalizedQuery) ||
        order.ordering_date.toLowerCase().includes(normalizedQuery) ||
        order.order_status.toLowerCase().includes(normalizedQuery) ||
        order.parcel.toString().includes(normalizedQuery)
      );
    });

    const filtered = searched.filter((order) =>
      Object.keys(filter).every((key) => {
        if (!filter[key]) return true;
        if (key === "status") return order.order_status === filter[key];
        return order[key as keyof Order]?.toString() === filter[key]?.toString();
      })
    );

    return filtered;
  }, [isFilterChange, searchQuery, orders, filter]);


  const handleEditOrder = (updatedOrder: Order) => {
    const id = selectedOrder?.order_id;

    if (id) {
      const updatedOrders = orders.map((order) => {
        if (order.order_id === id) {
          return {
            ...order,
            ...updatedOrder,
          };
        }
        return order;
      });
      setOrders(updatedOrders);
    }
    setIsEditOrderOpen(false);
  };

  const handleOpenEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsEditOrderOpen(true);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <CircularProgress /> Loading orders...
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
            <h1 className="text-2xl font-bold">Order &gt; </h1>
            <h1
              className="text-2xl font-bold"
              style={{
                color: "#FF8A00",
              }}
            >
              List of Orders
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
            placeholder="Search by ID, Order, Email, Phone..."
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
              <th className="p-4 w-[15%] text-left">From</th>
              <th className="p-4 w-[15%] text-left">To</th>
              <th className="p-4 w-[10%] text-left">Status</th>
              <th className="p-4 w-[15%] text-left">Order Date</th>

              <th className="p-4 w-[5%] text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders
              .slice(
                (currentPage - 1) * ordersPerPage,
                currentPage * ordersPerPage
              )
              .map((order: Order) => (
                <tr key={order.order_id} className="border-t">

                  <td className="p-4 pl-10">{order.order_id}</td>
                  <td className="p-4">
                    <div>
                      <div className="font-bold text-sm">{order.sending_address.addressName}</div>
                    </div>
                  </td>
                  <td className="p-4">{order.receiving_address.addressName}</td>
                  <td className="p-4">{order.order_status}</td>
                  <td className="p-4">{order.ordering_date}</td>

                  <td className="p-4">
                    <IconButton onClick={() => handleOpenEditOrder(order)}>
                      <Edit />
                    </IconButton>
                  </td>
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



      {isEditOrderOpen && selectedOrder && (
        <EditOrder
          open={isEditOrderOpen}
          onClose={() => onModalClose()}
          selectedOrder={selectedOrder}
          onEditOrder={handleEditOrder}
        />
      )}

    </div>
  );
};

export default OrderTable;