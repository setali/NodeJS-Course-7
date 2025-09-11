import React from "react";
import { Route, Routes } from "react-router";
import List from "./List";
import Add from "./Add";
import Show from "./Show";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:id" element={<Show />} />
      <Route path="/add" element={<Add />} />
    </Routes>
  );
}
