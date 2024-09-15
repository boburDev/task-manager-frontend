import { Routes, Route, Navigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import React from "react";
import DashboardNavbar from "@/components/navbar/Navbar";
import Sidenav from "@/components/navbar/Sidenav";
import { routes } from "@/routes";
import store from "@/context/store";
 

export function Dashboard() {
  const userRole = store((state) => state.user?.role);

  const filteredRoutes = routes.map((route) => {
    if (route.layout === "dashboard") {
      return {
        ...route,
        pages: route.pages.filter((page) => {
          if (page.name === "Home" && userRole !== "admin") {
        
            return false;
          }
          return true;
        }),
      };
    }
    return route;
  });

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav routes={filteredRoutes} />
      <div className="p-4 ml-[4rem] xl:ml-[24rem]">
        <DashboardNavbar />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>

        <div className="xl:ml-0 ml-32">
          <Routes>
            {filteredRoutes.map(({ layout, pages }) =>
              layout === "dashboard"
                ? pages.map(({ path, element }, index) => (
                    <React.Fragment key={path || index}>
                      <Route path={path} element={element} />
                    </React.Fragment>
                  ))
                : null
            )}

            <Route path="*" element={<Navigate to="home" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
