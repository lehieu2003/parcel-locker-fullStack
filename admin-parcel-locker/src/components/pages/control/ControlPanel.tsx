'use client'

import React, { useState } from 'react'
import { UserPlus, Truck, Package, Grid, X } from 'lucide-react'
import UserService from "../../../services/UserService"
import ShipperService from '../../../services/ShipperService'
import LockerService from '../../../services/LockerService'

const ControlPanel: React.FC = () => {
    const [openModal, setOpenModal] = useState<string | null>(null)
    const [formData, setFormData] = useState<any>({})

    const handleOpenModal = (type: string) => {
        setOpenModal(type)
        setFormData({})
    }

    const handleCloseModal = () => {
        setOpenModal(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            switch (openModal) {
                case 'user':
                    await UserService.createUser(formData)
                    alert('User added successfully')
                    handleCloseModal()
                    break
                case 'shipper':
                    await ShipperService.createShipper(formData)
                    alert('Shipper added successfully')
                    handleCloseModal()
                    break
                case 'locker':
                    await LockerService.post(formData)
                    alert('Locker added successfully')
                    handleCloseModal()
                    break
                case 'cell':
                    await LockerService.postCell(formData?.id, formData?.size, formData?.quantity)
                    alert('Cell added successfully')
                    handleCloseModal()
                    break
                default:
                    break
            }
        } catch (error) {
            console.error('Error adding item:', error)
            alert('Error adding item')
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Control Panel</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                    onClick={() => handleOpenModal('user')}
                    className="h-24 w-full rounded-2xl flex flex-col items-center justify-center gap-2 bg-gray-800 text-white hover:bg-gray-500 transition-colors"
                >
                    <UserPlus className="h-8 w-8" />
                    <span>Add User</span>
                </button>
                <button
                    onClick={() => handleOpenModal('shipper')}
                    className="h-24 w-full rounded-2xl flex flex-col items-center justify-center gap-2 bg-gray-800 text-white hover:bg-gray-500 transition-colors"
                >
                    <Truck className="h-8 w-8" />
                    <span>Add Shipper</span>
                </button>
                <button
                    onClick={() => handleOpenModal('locker')}
                    className="h-24 w-full rounded-2xl flex flex-col items-center justify-center gap-2 bg-gray-800 text-white hover:bg-gray-500 transition-colors"
                >
                    <Package className="h-8 w-8" />
                    <span>Add Locker</span>
                </button>
                <button
                    onClick={() => handleOpenModal('cell')}
                    className="h-24 w-full rounded-2xl flex flex-col items-center justify-center gap-2 bg-gray-800 text-white hover:bg-gray-500 transition-colors"
                >
                    <Grid className="h-8 w-8" />
                    <span>Add Cell</span>
                </button>
            </div>

            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Add {openModal}</h2>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {openModal === 'user' && (
                                <>
                                    <input className="w-full px-3 py-2 border rounded" type="email" name="email" placeholder="Email" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="text" name="username" placeholder="Username" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="password" name="password" placeholder="Password" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="text" name="name" placeholder="Name" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="tel" name="phone" placeholder="Phone" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="text" name="address" placeholder="Address" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="number" name="age" placeholder="Age" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="text" name="role" placeholder="Role" required onChange={handleChange} />
                                </>
                            )}
                            {openModal === 'shipper' && (
                                <>
                                    <input className="w-full px-3 py-2 border rounded" type="email" name="email" placeholder="Email" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="text" name="username" placeholder="Username" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="password" name="password" placeholder="Password" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="password" name="confirm_password" placeholder="Confirm Password" required onChange={handleChange} />
                                </>
                            )}
                            {openModal === 'locker' && (
                                <>
                                    <input className="w-full px-3 py-2 border rounded" type="text" name="address" placeholder="Address" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="number" name="latitude" placeholder="Latitude" step="any" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="number" name="longitude" placeholder="Longitude" step="any" required onChange={handleChange} />
                                </>
                            )}
                            {openModal === 'cell' && (
                                <>
                                    <input className="w-full px-3 py-2 border rounded" type="text" name="id" placeholder="Id" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="text" name="size" placeholder="Size" required onChange={handleChange} />
                                    <input className="w-full px-3 py-2 border rounded" type="number" name="quantity" placeholder="Quantity" required onChange={handleChange} />
                                </>
                            )}
                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ControlPanel

