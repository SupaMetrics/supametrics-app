"use client";

import { Form } from "../../components/form";

import React from "react";

export const Main = () => {
  return (
    <main>
      <Form type="project" onSubmit={(data) => console.log(data)} />
    </main>
  );
};
