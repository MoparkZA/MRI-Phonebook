// __tests__/ContactForm.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";
import { createContact, updateContact } from "@/lib/api";

// Mock the next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      refresh: jest.fn(),
    };
  },
}));

// Mock the API calls
jest.mock("@/lib/api", () => ({
  createContact: jest.fn(),
  updateContact: jest.fn(),
}));

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(<ContactForm mode="create" />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add contact/i })
    ).toBeInTheDocument();
  });

  it("submits form with correct data for new contact", async () => {
    render(<ContactForm mode="create" />);

    await userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    await userEvent.type(
      screen.getByLabelText(/phone number/i),
      "123-456-7890"
    );
    await userEvent.type(screen.getByLabelText(/email/i), "john@example.com");

    fireEvent.click(screen.getByRole("button", { name: /add contact/i }));

    expect(createContact).toHaveBeenCalledWith({
      name: "John Doe",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
    });
  });

  it("renders edit mode with initial data correctly", () => {
    const initialData = {
      name: "John Doe",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
    };

    render(<ContactForm mode="edit" initialData={initialData} id="1" />);

    expect(screen.getByLabelText(/name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/phone number/i)).toHaveValue("123-456-7890");
    expect(screen.getByLabelText(/email/i)).toHaveValue("john@example.com");
    expect(
      screen.getByRole("button", { name: /update contact/i })
    ).toBeInTheDocument();
  });

  it("shows error message when submission fails", async () => {
    const error = new Error("Failed to save");
    (createContact as jest.Mock).mockRejectedValueOnce(error);

    render(<ContactForm mode="create" />);

    await userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    await userEvent.type(
      screen.getByLabelText(/phone number/i),
      "123-456-7890"
    );

    fireEvent.click(screen.getByRole("button", { name: /add contact/i }));

    expect(
      await screen.findByText(/failed to save contact/i)
    ).toBeInTheDocument();
  });
});
