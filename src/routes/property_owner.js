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
    path: "/property-owner/dashboard",
    element: Dashboard,
    title: "Dashboard",
  },

  {
    path: "/property-owner/metrics",
    element: PropertyOwnerMetrics,
    title: "Metrics",
  },

  {
    path: "/property-owner/manage",
    element: PropertyOwnerManage,
    title: "Manage",
  },

  {
    path: "/property-owner/manage/property/:id/view",
    element: PropertyDetails,
    title: "Property Details",
  },
  {
    path: "/property-owner/manage/property/add",
    element: AddNewProperty,
    title: "Add New Property",
  },
  {
    path: "/property-owner/manage/room/add",
    element: AddNewRoom,
    title: "Add New Room",
  },

  {
    path: "/property-owner/earnings",
    element: PropertyOwnerEarnings,
    title: "Earnings",
  },

  {
    path: "/property-owner/resources",
    element: PropertyOwnerResources,
    title: "Resources",
  },

  {
    path: "/property-owner/refer-host",
    element: PropertyOwnerReferAHost,
    title: "Refer A Host",
  },

  {
    path: "/property-owner/settings",
    element: Settings,
    title: "Settings",
  },
];
