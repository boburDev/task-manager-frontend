import SignUp from "@/pages/auth/SignUp";
import { routes } from "@/routes";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

export function Auth() {
  return (
    <div>
      <Routes>
        {routes
          .filter(({ layout }) => layout === "auth")
          .flatMap(({ pages }) =>
            pages.map(({ path, element }, index) => (
              <Fragment key={index}>
                <Route path={path} element={element} />
              </Fragment>
            ))
          )}
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}
