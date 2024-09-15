import SignIn from "@/pages/auth/SignIn";
import Home from "@/pages/public/Home";
import {
  ArrowLeftCircleIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import Tasks from "./pages/public/Tasks";

const icon = {
  className: "w-5 h-5 text-inherit",
};
export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        name: "Home",
        path: "/home",
        element: <Home />,
        icon: <HomeIcon {...icon} />,
      },
      {
        name: "Tasks",
        path: "/tasks",
        element: <Tasks />,
        icon: <ClipboardDocumentCheckIcon {...icon} />,
      },
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        icon: <ArrowLeftCircleIcon {...icon} />,
        name: "Logout",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];
