import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { getContacts, deleteContact } from "@/lib/api";

jest.mock("@/lib/api", () => ({
  getContacts: jest.fn(),
  deleteContact: jest.fn(),
}));

describe("Home page", () => {
  const mockContacts = [
    {
      id: "1",
      name: "John Doe",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
    },
    {
      id: "2",
      name: "Jane Smith",
      phoneNumber: "098-765-4321",
      email: "jane@example.com",
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders contacts list", async () => {
    (getContacts as jest.Mock).mockResolvedValueOnce(mockContacts);
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("handles contact deletion", async () => {
    (getContacts as jest.Mock).mockResolvedValueOnce(mockContacts);
    window.confirm = jest.fn(() => true);
    (deleteContact as jest.Mock).mockResolvedValueOnce({});

    render(<Home />);

    await waitFor(async () => {
      const deleteButtons = await screen.findAllByRole("button", {
        name: /delete/i,
      });
      fireEvent.click(deleteButtons[0]);
      expect(deleteContact).toHaveBeenCalledWith("1");
    });
  });

  it("shows loading state initially", () => {
    (getContacts as jest.Mock).mockResolvedValueOnce(mockContacts);
    render(<Home />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading contacts"
    );
  });

  it("shows empty state when no contacts", async () => {
    (getContacts as jest.Mock).mockResolvedValueOnce([]);
    render(<Home />);

    await waitFor(() => {
      expect(
        screen.getByText("No contacts found. Add your first contact!")
      ).toBeInTheDocument();
    });
  });

  it("displays error message when fetching fails", async () => {
    (getContacts as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );
    render(<Home />);

    await waitFor(() => {
      const errorMessage = screen.getByRole("alert");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Failed to fetch contacts");
    });
  });
});
