import Chatting from "../pages/chating/Chating";
import NotificationsPage from "../pages/notification/NotificationsPage";
import AddNewProperty from "../pages/property_owner/AddNewProperty";
import AddNewRoom from "../pages/property_owner/AddNewRoom";
import AiModels from "../pages/property_owner/AiModels";
import Dashboard from "../pages/property_owner/Dashboard";
import HostDashboard from "../pages/property_owner/HostDashboard";
import MarketingManagment from "../pages/property_owner/MarketingManagment";
import PropertyDetails from "../pages/property_owner/PropertyDetails";
import PropertyOwnerEarnings from "../pages/property_owner/PropertyOwnerEarnings";
import PropertyOwnerManage from "../pages/property_owner/PropertyOwnerManage";
import PropertyOwnerMetrics from "../pages/property_owner/PropertyOwnerMetrics";
import PropertyOwnerReferAHost from "../pages/property_owner/PropertyOwnerReferAHost";
import PropertyOwnerResources from "../pages/property_owner/PropertyOwnerResources";
import Settings from "../pages/property_owner/Settings";
import SmartLocks from "../pages/property_owner/SmartLocks";
import Utilities from "../pages/property_owner/Utilities";

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
    path: "/manage/property/:id/edit",
    element: AddNewProperty,
    title: "Edit A Property",
  },
  {
    path: "/manage/room/add",
    element: AddNewRoom,
    title: "Add New Room",
  },
  {
    path: "/manage/room/:slug/edit",
    element: AddNewRoom,
    title: "Edit Room",
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
    path: "/smart-locks",
    element: SmartLocks,
    title: "Smart Locks",
  }, 
  {
    path: "/utilities-expense",
    element: Utilities,
    title: "Utilities Expense",
  },
  {
    path: "/host-dashboard",
    element: HostDashboard,
    title: "Host Dashboard",
  },
  {
    path: "/marketing-managment",
    element: MarketingManagment,
    title: "Host Dashboard",
  },
  {
    path: "/chat",
    element: Chatting,
    title: "Chatting",
  },
   {
    path: "/notifications",
    element: NotificationsPage,
    title: "Notifications",
  },
  {
    path:"/ai-tools",
    element:AiModels,
    title:"Ai Tools"
  },
  {
    path: "/settings",
    element: Settings,
    title: "Settings",
  },
];
