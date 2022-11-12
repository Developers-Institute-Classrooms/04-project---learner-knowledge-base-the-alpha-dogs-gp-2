import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import EditAnswer from "./EditAnswer";
describe("EditAnswer Page", () => {

  test("Renders an EditAnswer Page with checkboxes and button", async () => {
    render(
      <Router>
        <EditAnswer />
      </Router>
    );
    expect(screen.getByRole("button")).toBeEnabled();
    expect(screen.getByTestId("review-checkbox")).toBeEnabled();
    expect(screen.getByTestId("star-checkbox")).toBeEnabled();
    expect(screen.getByTestId("review-checkbox")).not.toBeNull();
    expect(screen.getByTestId("star-checkbox")).not.toBeNull();
    expect(screen.getByText(/Review/i)).toBeInTheDocument();
    expect(screen.getByText(/Star/i)).toBeInTheDocument();
  });

  test("Alter the value of the Review Checkbox upon click", async () => {
    await act(async () => {
      render(
        <Router>
          <EditAnswer />
        </Router>,
      );
    });

    const beforeClick = screen.getByTestId("review-checkbox").checked;
    const checkbox = screen.getByTestId("review-checkbox");
    act(() => {
      checkbox.dispatchEvent(new MouseEvent("click"));
    });
    const afterClick = screen.getByTestId("review-checkbox").checked;
    expect(beforeClick).toBe(!afterClick);
  });


  test("Alter the value of the Star Checkbox upon click", async () => {
    await act(async () => {
      render(
        <Router>
          <EditAnswer />
        </Router>,
      );
    });

    const beforeClick = screen.getByTestId("star-checkbox").checked;
    const checkbox = screen.getByTestId("star-checkbox");
    act(() => {
      checkbox.dispatchEvent(new MouseEvent("click"));
    });
    const afterClick = screen.getByTestId("star-checkbox").checked;
    expect(beforeClick).toBe(!afterClick);
  });

  
});