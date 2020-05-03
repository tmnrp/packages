import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import App from "../App";

describe("App.js", () => {
  test("Should render properly", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("myid")).toMatchSnapshot();
  });
});
