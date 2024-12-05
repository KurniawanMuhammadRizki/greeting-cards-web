import GreetingCardForm from "@/components/GreetingCardForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("GreetingCardForm", () => {
  it("renders the main elements correctly", () => {
    render(<GreetingCardForm />);

    expect(screen.getByText("Gift Card")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Dear...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your message...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("From...")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Download/i })
    ).toBeInTheDocument();
  });

  it("displays validation errors when form is submitted with empty fields", async () => {
    const user = userEvent.setup();
    render(<GreetingCardForm />);

    const submitButton = screen.getByRole("button", { name: /Download/i });
    await user.click(submitButton);

    expect(screen.getByText("Dear is required")).toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByText("From is required")).toBeInTheDocument();
  });
});
