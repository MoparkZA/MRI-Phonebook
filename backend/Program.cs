using backend.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNext", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowNext");
app.UseHttpsRedirection();
app.UseAuthorization();

// Simple API endpoints
app.MapGet("/api/contacts", () => Results.Ok(InMemoryStore.Contacts));

app.MapGet("/api/contacts/{id}", (string id) =>
{
    var contact = InMemoryStore.Contacts.FirstOrDefault(c => c.Id == id);
    return contact != null ? Results.Ok(contact) : Results.NotFound();
});

app.MapPost("/api/contacts", (Contact contact) =>
{
    contact.Id = Guid.NewGuid().ToString();
    InMemoryStore.Contacts.Add(contact);
    return Results.Created($"/api/contacts/{contact.Id}", contact);
});

app.MapPut("/api/contacts/{id}", (string id, Contact updatedContact) =>
{
    var contact = InMemoryStore.Contacts.FirstOrDefault(c => c.Id == id);
    if (contact == null) return Results.NotFound();
    
    contact.Name = updatedContact.Name;
    contact.PhoneNumber = updatedContact.PhoneNumber;
    contact.Email = updatedContact.Email;
    
    return Results.Ok(contact);
});

app.MapDelete("/api/contacts/{id}", (string id) =>
{
    var contact = InMemoryStore.Contacts.FirstOrDefault(c => c.Id == id);
    if (contact == null) return Results.NotFound();
    
    InMemoryStore.Contacts.Remove(contact);
    return Results.NoContent();
});

app.Run();