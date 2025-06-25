import AddNewProperty from "../pages/property_owner/AddNewProperty";
import AddNewRoom from "../pages/property_owner/AddNewRoom";
import Dashboard from "../pages/property_owner/Dashboard";
import PropertyDetails from "../pages/property_owner/PropertyDetails";
import PropertyOwnerEarnings from "../pages/property_owner/PropertyOwnerEarnings";
import PropertyOwnerManage from "../pages/property_owner/PropertyOwnerManage";
import PropertyOwnerMetrics from "../pages/property_owner/PropertyOwnerMetrics";
import PropertyOwnerReferAHost from "../pages/property_owner/PropertyOwnerReferAHost";
import PropertyOwnerResources from "../pages/property_owner/PropertyOwnerResources";
import Settings from "../pages/property_owner/Settings";

export const propertyOwnerRoutes = [
  {
    path: "/dashboard",
    element: Dashboard,
    title: "Dashboard",
  },

  {
    path: "/metrics",
    element: PropertyOwnerMetrics,
    title: "Metrics",
  },

  {
    path: "/manage",
    element: PropertyOwnerManage,
    title: "Manage",
  },

  {
    path: "/manage/property/:id/view",
    element: PropertyDetails,
    title: "Property Details",
  },
  {
    path: "/manage/property/add",
    element: AddNewProperty,
    title: "Add New Property",
  },
  {
    path: "/manage/room/add",
    element: AddNewRoom,
    title: "Add New Room",
  },

  {
    path: "/earnings",
    element: PropertyOwnerEarnings,
    title: "Earnings",
  },

  {
    path: "/resources",
    element: PropertyOwnerResources,
    title: "Resources",
  },

  {
    path: "/refer-host",
    element: PropertyOwnerReferAHost,
    title: "Refer A Host",
  },

  {
    path: "/settings",
    element: Settings,
    title: "Settings",
  },
  
];
