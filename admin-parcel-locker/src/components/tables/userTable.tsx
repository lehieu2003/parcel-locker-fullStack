import React, { useEffect, useState, useMemo } from "react";
import {
	Button,
	// Checkbox,
	IconButton,
	TextField,
	CircularProgress,
} from "@mui/material";
import {
	Search,
	FilterList,
	Edit,
	ArrowLeft,
	ArrowRight,
} from "@mui/icons-material";
import { RxReset } from "react-icons/rx";
import EditUser from "../pages/user/editUser";
import FilterUser from "../pages/user/filterUser";
import UserService from "../../services/UserService";
import { User } from "../../models/user";

const UserTable: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	// const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
	const usersPerPage = 10;
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isEditUserOpen, setIsEditUserOpen] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [isFilterUserOpen, setIsFilterUserOpen] = useState(false);
	const [filter, setFilter] = useState<{ [key: string]: string | number }>({});
	const [isFilterChange, setIsFilterChange] = useState(false);
	useEffect(() => {
		fetchUsers();
	}, [currentPage, usersPerPage]);

	const fetchUsers = async () => {
		setLoading(true);
		setError(null);
		try {
			const respond = await UserService.getUserPage(currentPage, usersPerPage);
			const listUser: User[] = respond[0]?.data || [];
			const totalPages = respond[0]?.total_pages || 0;
			if (currentPage == 1) {
				setUsers(listUser);
			  }
			  else setUsers(users.concat(listUser));
			setTotalPages(totalPages);
		} catch (e) {
			console.error("Error fetching users:", e);
			setError("Failed to load users. Please try again later.");
		} finally {
			setLoading(false);
		}
	};
	const onModalClose = () => {
		setIsEditUserOpen(false);
		setIsFilterUserOpen(false);
		fetchUsers();

	}

	// const handleSelectAllClick = () => {
	// 	if (selectedUsers.length === filteredUsers.length) {
	// 		setSelectedUsers([]);
	// 	} else {
	// 		const allUserIds = filteredUsers.map((user) => user.user_id);
	// 		setSelectedUsers(allUserIds);
	// 	}
	// };

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};


	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};

	// const handleCheckboxChange = (userId: number) => {
	// 	const selectedIndex = selectedUsers.indexOf(userId);
	// 	let newSelected: number[] = [];

	// 	if (selectedIndex === -1) {
	// 		newSelected = [...selectedUsers, userId];
	// 	} else {
	// 		newSelected = selectedUsers.filter((id) => id !== userId);
	// 	}

	// 	setSelectedUsers(newSelected);
	// };

	const handleFilterUser = (criteria: { [key: string]: string | number }) => {
		setFilter(criteria);
		setIsFilterChange((prev) => !prev);
		setIsFilterUserOpen(false);
	};


	const handleResetFilter = () => {
		setSearchQuery("");
		setFilter({});
		setIsFilterChange((prev) => !prev);
	};


	const filteredUsers = useMemo(() => {
		const normalizedQuery = searchQuery.toLowerCase();


		const searched = users.filter((user) => {
			return (
				user.user_id.toString().includes(normalizedQuery) ||
				user.name.toLowerCase().includes(normalizedQuery) ||
				user.phone.toString().includes(normalizedQuery) ||
				user.address.toLowerCase().includes(normalizedQuery) ||
				user.email.toLowerCase().includes(normalizedQuery) ||
				user.username.toLowerCase().includes(normalizedQuery) ||
				user.age.toString().includes(normalizedQuery) ||
				user.role.name.toLowerCase().includes(normalizedQuery)
			);
		});


		const filtered = searched.filter((user) =>
			Object.keys(filter).every((key) => {
				if (!filter[key]) return true;
				if (key === "role") return user.role.name === filter[key];
				return user[key as keyof User]?.toString() === filter[key]?.toString();
			})
		);

		return filtered;
	}, [isFilterChange, searchQuery, users, filter]);


	const handleEditUser = (updatedUser: User) => {
		const id = selectedUser?.user_id;

		if (id) {
			const updatedUsers = users.map((user) => {
				if (user.user_id === id) {
					return {
						...user,
						...updatedUser,
					};
				}
				return user;
			});
			setUsers(updatedUsers);
		}
		setIsEditUserOpen(false);
	};

	const handleOpenEditUser = (user: User) => {
		setSelectedUser(user);
		setIsEditUserOpen(true);
	};

	if (loading) {
		return (
			<div className="loader-container">
				<CircularProgress /> Loading users...
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
						<h1 className="text-2xl font-bold">User &gt; </h1>
						<h1
							className="text-2xl font-bold"
							style={{
								color: "#FF8A00",
							}}
						>
							List of Users
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
						placeholder="Search by ID, User, Email, Phone..."
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
					<Button
						variant="contained"
						startIcon={<FilterList />}
						onClick={() => setIsFilterUserOpen(true)}
					>
						Filter
					</Button>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<RxReset />}
						onClick={handleResetFilter}
					>
						Reset Filter
					</Button>
				</div>
			</div>
			<div className="overflow-y-auto max-h-[73vh] flex justify-center">
				<table className="w-full bg-white rounded-lg shadow-md mx-auto">
					<thead>
						<tr>
							{/* <th className="p-4 w-[2%] text-left">
								<Checkbox
									checked={selectedUsers.length === users.length}
									onChange={handleSelectAllClick}
								/>
							</th> */}
							<th className="p-4 pl-10 w-[5%] text-left">ID</th>
							<th className="p-4 w-[15%] text-left">User</th>
							<th className="p-4 w-[15%] text-left">Role</th>
							<th className="p-4 w-[20%] text-left">Phone</th>
							<th className="p-4 w-[5%] text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers
							.slice(
								(currentPage - 1) * usersPerPage,
								currentPage * usersPerPage
							)
							.map((user: User) => (
								<tr key={user.user_id} className="border-t">
									{/* <td className="p-4">
										<Checkbox
											checked={selectedUsers.includes(user.user_id)}
											onChange={() => handleCheckboxChange(user.user_id)}
										/>
									</td> */}
									<td className="p-4 pl-10">{user.user_id}</td>
									<td className="p-4">
										<div>
											<div className="font-bold text-sm">{user.name}</div>
										</div>
									</td>
									<td className="p-4">{user.role.name}</td>
									<td className="p-4">{user.phone}</td>
									<td className="p-4">
										<IconButton onClick={() => handleOpenEditUser(user)}>
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



			{isEditUserOpen && selectedUser && (
				<EditUser
					open={isEditUserOpen}
					onClose={() => onModalClose()}
					selectedUser={selectedUser}
					onEditUser={handleEditUser}
				/>
			)}

			{isFilterUserOpen && (
				<FilterUser
					open={isFilterUserOpen}
					onClose={() => onModalClose()}
					onFilterUser={(user) => handleFilterUser({
						user_id: user.user_id,
						role: user.role.name,
						name: user.name,
						username: user.username,
						gender: user.gender,
						age: user.age,
						email: user.email,
						address: user.address,
						phone: user.phone
					})}
				/>
			)}
		</div>
	);
};

export default UserTable;