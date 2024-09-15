import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { BackwardIcon } from "@heroicons/react/24/outline";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import store from "@/context/store";

export function Sidenav({ routes, sidenav, toggleSideNav }) {
  const signout = useSignOut();
  const logOut = store.getState().logout;

  const handleSignout = () => {
    logOut();
    signout();
  };

  return (
    <aside
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "gray transparent",
      }}
      className={`overflow-y-auto fixed inset-0 z-50 my-4 ml-4 text h-[calc(100vh-32px)] w-[10rem] xl:w-[15%] rounded-xl 
      transition-all  xl:translate-x-0 border bg-blue-gray-50 xl:bg-transparent border-blue-gray-100 xl:visible xl:left-0 ${
        sidenav
          ? "visible left-0 duration-300"
          : "invisible -left-full duration-300"
      }`}
    >
      <div className="relative">
        <Link to="/dashboard" className="py-6 px-8 text-center">
          <Typography variant="h6" color="blue-gray">
            Dashboard
          </Typography>
        </Link>
        <IconButton
          onClick={toggleSideNav}
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 rounded-xl grid rounded-br-none rounded-tl-none xl:hidden"
        >
          <BackwardIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="m-4 mt-0">
        {routes.map(({ layout, pages }, index) => (
          <ul key={index} className="flex flex-col">
            {pages.map(({ icon, name, path }, index) => (
              <li key={index}>
                <NavLink to={`/${layout}${path}`} onClick={toggleSideNav}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color="blue-gray"
                      className={`flex ${
                        isActive ? "text-white" : "text-blue-gray-600"
                      } items-center gap-4 px-4 capitalize`}
                      fullWidth
                      onClick={() => {
                        if (name === "Logout") {
                          handleSignout();
                        }
                      }}
                    >
                      {icon}
                      <Typography
                        variant="lead"
                        className="font-medium capitalize text-base"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

export default Sidenav;
