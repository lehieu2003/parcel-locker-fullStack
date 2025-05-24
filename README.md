# IU Parcel Locker System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Project Overview

The IU Parcel Locker System is a comprehensive solution for secure and convenient package delivery and storage. This system allows users to store and retrieve parcels through automated lockers, providing a flexible and secure alternative to traditional delivery methods.

The project consists of four main components:

- Backend API (FastAPI)
- Mobile Application (React Native/Expo)
- Shipper Application (React Native/Expo)
- Admin Dashboard (Web)

## Components

### Backend (BE)

The backend is built with Python and FastAPI, providing a robust API for all the applications to interact with the parcel locker system.

**Tech Stack:**

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic (for database migrations)

[Learn more about the Backend](./be-parcel-locker/README.md)

### Mobile Application

The mobile application allows users to find lockers, book them, manage deliveries, and track their parcels.

**Tech Stack:**

- React Native with Expo
- NativeWind (TailwindCSS)
- React Native Reanimated (for animations)
- Expo Vector Icons

[Learn more about the Mobile App](./mobile-parcel-locker/README.md)

### Shipper Application

The shipper application is designed for delivery personnel to manage and track the parcels they deliver to the lockers.

**Tech Stack:**

- React Native with Expo

[Learn more about the Shipper App](./shipper-parcel-locker/README.md)

### Admin Dashboard

The admin dashboard is a web application for administrators to manage the entire parcel locker system, including users, lockers, and deliveries.

[Learn more about the Admin Dashboard](./admin-parcel-locker/README.md)

## Features

### Core Features (Must-Have)

- **Account & Authentication**: Secure user accounts with ID verification and two-factor authentication
- **Locker Management**: Find, book, and manage lockers with different sizes and locations
- **Delivery Management**: Receive parcels with delivery instructions and access codes
- **Payment & Billing**: Secure payment options for booking lockers and additional services
- **Tracking & Notifications**: Track parcels and receive notifications about deliveries and pickups

### Additional Features (Should-Have)

- **Account Management**: View delivery history, update preferences, and manage payment methods
- **Map Integration**: View locker locations on a map with directions
- **Size and Price Variations**: Different locker sizes with varying prices
- **Customer Support**: Support chat or hotline for assistance

### Future Enhancements (Could/Won't-Have)

- **Community Features**: Ratings, reviews, and issue reporting
- **Group Locker Sharing**: Share lockers for joint deliveries
- **Rewards Program**: Loyalty points for frequent use
- **Advanced Security**: Tamper-proof locks, video surveillance
- **Temperature-Controlled Lockers**: For sensitive items
- **Smart Features**: Interactive screens, drone delivery integration, voice assistance

## Getting Started

Each component has its own setup instructions. Please refer to the individual README files for detailed instructions.

## Demo

Check out our video demonstration of the IU Parcel Locker System:
[Video Demo](https://drive.google.com/drive/folders/1C5NvZTe9c8imZqWmGcoNvX1kBNEzmWp9?fbclid=IwAR23yPWGbn9SrAdxa6RJx5zilX8FMsBiCAck9shA8KUpEI8zRQAw_hhdvqg)

## Schema Design

The database schema can be found in the backend documentation.

## Team

### Frontend Team

- UI/UX Designers: Pham Nguyen Quynh Anh, Nguyen Ngoc Gia Linh
- Mobile App Developers: TBD

### Backend Team

- Backend Developers: Nguyen Hoang Hong An, Nguyen Minh Quan, Pham Thi Cam Nhung

## License

This project is licensed under the [MIT License](LICENSE).
