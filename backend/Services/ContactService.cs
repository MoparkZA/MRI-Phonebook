using Microsoft.EntityFrameworkCore;

public interface IContactService
{
    Task<IEnumerable<Contact>> GetAllContactsAsync();
    Task<Contact?> GetContactByIdAsync(string id);
    Task<Contact> CreateContactAsync(Contact contact);
    Task<Contact?> UpdateContactAsync(string id, Contact contact);
    Task<bool> DeleteContactAsync(string id);
}

public class ContactService : IContactService
{
    private readonly ContactDbContext _context;

    public ContactService(ContactDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Contact>> GetAllContactsAsync()
    {
        return await _context.Contacts.ToListAsync();
    }

    public async Task<Contact?> GetContactByIdAsync(string id)
    {
        return await _context.Contacts.FindAsync(id);
    }

    public async Task<Contact> CreateContactAsync(Contact contact)
    {
        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();
        return contact;
    }

    public async Task<Contact?> UpdateContactAsync(string id, Contact contact)
    {
        var existingContact = await _context.Contacts.FindAsync(id);
        if (existingContact == null) return null;

        existingContact.Name = contact.Name;
        existingContact.PhoneNumber = contact.PhoneNumber;
        existingContact.Email = contact.Email;

        await _context.SaveChangesAsync();
        return existingContact;
    }

    public async Task<bool> DeleteContactAsync(string id)
    {
        var contact = await _context.Contacts.FindAsync(id);
        if (contact == null) return false;

        _context.Contacts.Remove(contact);
        await _context.SaveChangesAsync();
        return true;
    }
}