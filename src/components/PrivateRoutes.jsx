import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

const PrivateRoutes = (props) => {
  return props.DUMMY_LOGGED_IN ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
