// __tests__/api.test.ts
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "@/lib/api";

describe("API functions", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("fetches contacts successfully", async () => {
    const mockContacts = [{ id: "1", name: "John Doe" }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockContacts,
    });

    const result = await getContacts();
    expect(result).toEqual(mockContacts);
  });

  it("creates contact successfully", async () => {
    const newContact = { name: "John Doe", phoneNumber: "123-456-7890" };
    const mockResponse = { id: "1", ...newContact };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await createContact(newContact);
    expect(result).toEqual(mockResponse);
  });

  it("handles API errors", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getContacts()).rejects.toThrow("Failed to fetch contacts");
  });
});
