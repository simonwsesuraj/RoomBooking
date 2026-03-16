import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



import AllRooms from "./components/AllRooms.jsx";
import BookingComponent from "./components/BookingComponent.jsx";
import AuthForm from "./components/AuthForm.jsx";
import { UserProvider } from "./components/UserContext.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import OccupiedDatesDisplay from "./components/OccupiedDatesDisplay.jsx";

// let roomData = [
//   {
//     roomId: "101",
//     roomName: "Deluxe Suite",
//     roomType: "Suite",
//     isOccupied: true,
//     occupiedDates: [
//       {
//         date: "2024-11-10",
//       },
//       {
//         date: "2024-11-11",
//       },
//     ],
//     pricePerNight: 150,
//     currency: "USD",

//     maxOccupancy: 2,
//     images: [deluxe1, deluxe2],
//     description: "A spacious suite with a beautiful view.",
//   },
//   {
//     roomId: "102",
//     roomName: "Standard Room",
//     roomType: "Standard",
//     isOccupied: false,
//     occupiedDates: [],
//     pricePerNight: 100,
//     currency: "USD",

//     maxOccupancy: 2,
//     images: [standard1, standard2],
//     description: "A cozy room ideal for single travelers or couples.",
//   },
//   {
//     roomId: "201",
//     roomName: "Family Suite",
//     roomType: "Suite",
//     isOccupied: false,
//     occupiedDates: [
//       {
//         date: "2024-11-25",
//         occupierInfo: {
//           uid: "guest789",
//           name: "Jane Smith",
//           contact: "janesmith@example.com",
//         },
//       },
//     ],
//     pricePerNight: 200,
//     currency: "USD",
//     maxOccupancy: 4,
//     images: [family_suite1, family_suite2, family_suite3],
//     description:
//       "Perfect for families, with spacious living and a kitchenette.",
//   },
// ];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <BookingComponent></BookingComponent>,
      },
      {
        path: "/all-rooms",
        element: <AllRooms></AllRooms>,
      },
      {
        path: "/auth",
        element: (
          <GuestRoute>
            <AuthForm></AuthForm>
          </GuestRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: <OccupiedDatesDisplay></OccupiedDatesDisplay>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);