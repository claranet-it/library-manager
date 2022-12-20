# Library Manager API documentation

This API allows users to perform CRUD operations on books in a library. Each book has a unique identifier, a title, an author, and a price.

## Endpoints

### Create a book

`POST /api/books`

Creates a new book.

#### Request body

```json
{
    "title": "Clean Code",
    "author": "Robert Cecil Martin",
    "price": 34.99
}
```

#### Response

```json
{
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "title": "Clean Code",
    "author": "Robert Cecil Martin",
    "price": 34.99
}
```

#### Errors

-   `400 Bad Request`: if the request body is malformed or missing required fields.

---

### Update a book partially

`PATCH /api/books/:id`

Updates a book partially by its unique identifier.

#### Request body

```json
{
    "price": 29.99
}
```

#### Response

```json
{
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "author": "Robert Cecil Martin",
    "price": 29.99
}
```

#### Errors

-   `404 Not Found`: if the book with the specified `id` does not exist.
-   `400 Bad Request`: if the request body is malformed or missing required fields.

---

### Get a book by its identifier

`GET /api/books/:id`

Gets a book by its unique identifier.

#### Response

```json
{
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "author": "Robert Cecil Martin",
    "price": 34.99
}
```

#### Errors

-   `404 Not Found`: if the book with the specified `id` does not exist.

---

### Get all books

`GET /api/books`

Gets a list of all books in the library.

#### Response

```json
[
    {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
        "author": "Robert Cecil Martin",
        "price": 34.99
    },
    {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0852",
        "title": "Design Patterns: Elements of Reusable Object-Oriented Software",
        "author": "Erich Gamma",
        "price": 44.99
    }
]
```

---

### Update a book completely

`PUT /api/books/:id`

Updates a book completely by its unique identifier.

#### Request body

```json
{
    "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "author": "Robert Cecil Martin",
    "price": 39.99
}
```

#### Response

```json
{
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "author": "Robert Cecil Martin",
    "price": 39.99
}
```

#### Errors

-   `404 Not Found`: if the book with the specified `id` does not exist.
-   `400 Bad Request`: if the request body is malformed or missing required fields.

---

### Delete a book

`DELETE /api/books/:id`

Deletes a book by its unique identifier.

#### Response

```json
{
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "author": "Robert Cecil Martin",
    "price": 39.99
}
```

#### Errors

-   `404 Not Found`: if the book with the specified `id` does not exist.

---

## Tips and best practices

-   Use proper HTTP request methods for each endpoint (e.g. `GET` for retrieving data, `POST` for creating new resources, etc.)
-   Format request bodies as JSON and include the `Content-Type: application/json` header in the request.
-   Handle error responses by checking the HTTP status code and reading the error message in the response body.
