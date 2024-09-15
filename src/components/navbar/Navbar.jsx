import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Input,
} from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";

export function DashboardNavbar({ toggleSideNav }) {
  const { pathname } = useLocation();

  const [layout, page = ""] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color={"white"}
      className="bg-white rounded-xl transition-all top-4 z-40 py-3 shadow-md translate-x-0 xl:translate-x-32 shadow-blue-gray-500/5 w-full xl:w-[90%]"
      blurred={true}
      fullWidth
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={`bg-transparent p-0 transition-all mt-1`}>
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color={"blue-gray"}
                className="font-normal opacity-80 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color={"blue-gray"}
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography
            variant="h6"
            color={"blue-gray"}
            className="hidden xl:block"
          >
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>
          <IconButton
            onClick={toggleSideNav}
            variant="text"
            className="grid xl:hidden"
          >
            <Bars3Icon
              strokeWidth={3}
              className="h-6 w-6 "
              color={"text-blue-gray-500"}
            />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
