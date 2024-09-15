import { Routes, Route, Navigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import DashboardNavbar from "@/components/navbar/Navbar";
import Sidenav from "@/components/navbar/Sidenav";
import { routes } from "@/routes";
import store from "@/context/store";

export function Dashboard() {
  const userRole = store((state) => state.user?.role);
  const [visibleSideNav, setVisibleSideNav] = useState(false);
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
      <Sidenav
        routes={filteredRoutes}
        sidenav={visibleSideNav}
        toggleSideNav={() =>
          visibleSideNav ? setVisibleSideNav(false) : setVisibleSideNav(true)
        }
      />
      <div className="p-4 ml-0 xl:ml-[8%]">
        <DashboardNavbar
          toggleSideNav={() =>
            visibleSideNav ? setVisibleSideNav(false) : setVisibleSideNav(true)
          }
        />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>

        <div className="ml-0 xl:ml-32">
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
