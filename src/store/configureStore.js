import reducer from "./project";
import { configureStore } from "@reduxjs/toolkit";

export default function() {
  return configureStore({ reducer });
};
