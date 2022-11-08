/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Dashboard from "./Dashboard";
import EditAnswer from "./EditAnswer";
import { BrowserRouter as Router } from "react-router-dom";
// import userEvent from "@testing-library/user-event";
// import { getByLabelText } from "@testing-library/react";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders topic data", async () => {
  const fakeTopicsData = [
    [
      {
        questionid: 1,
        questiondesc: "What is HTML?",
        isstarred: false,
        isreviewed: false,
      },
      {
        questionid: 2,
        questiondesc: "What is CSS?",
        isstarred: false,
        isreviewed: false,
      },
    ],
    [
      {
        questionid: 5,
        answerid: 10,
        questiondesc: "When do i run npm Install?",
        answerdesc:
          "Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.",
        isstarred: false,
        isreviewed: false,
      },
      {
        questionid: 5,
        answerid: 9,
        questiondesc: "When do i run npm Install?",
        answerdesc:
          "Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.",
        isstarred: false,
        isreviewed: false,
      },
    ],
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeTopicsData),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(
      <Router>
        <Dashboard />
        {/* <EditAnswer /> */}
      </Router>,
      container
    );
  });

  //   const input = container.getByLabelText("What is HTML?");
  //   console.log(input);

  //   expect(true).toBe(true);
  //   let button = container.getByText("[key=1]");
  //   expect(getByText("What is HTML?")).toBeInTheDocument();
  //   expect(button.textContent).toBe("What is HTML?");

  //   act(() => {
  //     button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  //   });

  const button = container.querySelector(".list-item");
  expect(button.textContent).toBe("What is HTML?");

  // act(async () => {
  //   button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  // });

  // expect(container.querySelector(".list-item").textContent).toEqual("What is HTML?");

  //   button = container.querySelector("button");
  //   expect(button.textContent).toBe("HTML");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
