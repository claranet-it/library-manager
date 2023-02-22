# Library Manager

Library Manager is an application in development that will be used as a management system for large book catalogs. Currently, Library Manager is in development, with students from Claranet Italy's classroom working on its realization under the careful supervision of their teachers.

## Teachers

- Daniele Rastelli (Backend)
- Luca Ferri (Backend)
- Giorgio Mandolini (Frontend)
- Giorgio Boa (Frontend)

## Students

- Paolo Rabbito (Backend)
- Simone Richini (Backend)
- Federico Siddi (Backend)
- Maria Teresa Graziano (Frontend)
- Francesco Santi (Frontend)
- Oleksandr Semykin (Frontend)
- Emanuele Gurini (Frontend)

## Requirements

- Backend: PHP 8.1.13, Docker 20.10.22, Symfony
- Frontend: Node.js version 18 or higher

## Project Configuration

### Backend:

Enter inside backend folder

```
$ cd ./backend
```

Build and setup database

```
$ make build
$ make migrate-diff
```

Backend requires creating an empty `.env.local` file.

### Frontend:

Enter inside frontend folder:

```
$ cd ./frontend
```

```
$ npm install
$ npm run dev
```

Frontend requires creating `.env.local`, `.env.production`, and `.env.development` files with the following instructions:

```
VITE_BASE_URL=http://localhost:8080/api/
VITE_LIMIT=5
```

## Rules to make changes

1. Clone the repo
2. Checkout develop branch `git checkout develop`
3. Create new branch from develop `git checkout -b <branch_name>`
4. At the end merge changes from your new branch into develop

## API Endpoints

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
  "description": "Books description's",
  "price": 34.99
}
```

#### Response

```json
{
  "response": "book stored"
}
```

#### Errors

- `400 Bad Request`: if the request body is malformed or missing required fields.

### Get a book by its identifier

`GET /api/books/:id`

Gets a book by its unique identifier.

#### Response

```json
{
  "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "title": "Clean Code",
  "author": "Robert Cecil Martin",
  "description": "Books description's",
  "price": 34.99
}
```

#### Errors

- `404 Not Found`: if the book with the specified `id` does not exist.

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
    "description": "Books description's",
    "price": 34.99
  },
  {
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0852",
    "title": "Design Patterns: Elements of Reusable Object-Oriented Software",
    "author": "Erich Gamma",
    "description": "Books description's",
    "price": 44.99
  }
]
```

---

### Update a book completely or partially

`PUT /api/books/:id`

Updates a book completely by its unique identifier.

#### Request body

```json
{
  "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
  "author": "Robert Cecil Martin",
  "description": "Books description's",
  "price": 39.99
}
```

#### Response

```json
{
  "response": "book updated"
}
```

#### Errors

- `404 Not Found`: if the book with the specified `id` does not exist.
- `400 Bad Request`: if the request body is malformed or missing required fields.

---

### Delete a book

`DELETE /api/books/:id`

Deletes a book by its unique identifier.

#### Response

```json
{
  "response": "book deleted"
}
```

#### Errors

- `404 Not Found`: if the book with the specified `id` does not exist.

---

## Tips and best practices

- Use proper HTTP request methods for each endpoint (e.g. `GET` for retrieving data, `POST` for creating new resources, etc.)
- Format request bodies as JSON and include the `Content-Type: application/json` header in the request.
- Handle error responses by checking the HTTP status code and reading the error message in the response body.
