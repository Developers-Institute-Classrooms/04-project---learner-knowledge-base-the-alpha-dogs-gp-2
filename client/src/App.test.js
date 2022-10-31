import { render, screen } from "@testing-library/react";
import App from "./App.js";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});

afterAll(() => setTimeout(() => process.exit(), 1000));
