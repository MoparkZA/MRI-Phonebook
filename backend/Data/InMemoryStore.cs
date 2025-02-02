// Data/InMemoryStore.cs
namespace backend.Data;

public static class InMemoryStore
{
    public static List<Contact> Contacts { get; set; } = new List<Contact>
    {
        new Contact { Id = "1", Name = "John Doe", PhoneNumber = "123-456-7890", Email = "john@example.com" },
        new Contact { Id = "2", Name = "Jane Smith", PhoneNumber = "098-765-4321", Email = "jane@example.com" }
    };
}