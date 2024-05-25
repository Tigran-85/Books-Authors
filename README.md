# NestJS Fictional Book Management System API

This is a NestJS-based API for managing books and authors, with authentication functionalities using JWT. The API supports creating, updating, deleting, and retrieving books and authors, as well as user registration and login.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Endpoints](#endpoints)
  - [Books](#books)
  - [Authors](#authors)
  - [Auth](#auth)
- [Running Tests](#running-tests)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Tigran-85/Books-Authors.git
    cd Books-Authors
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables. Create a `.env` file in the root of your project and add the following:
    ```env
    #DB credentials

    DATABASE_HOST=localhost
    DATABASE_PORT=3306
    DATABASE_USERNAME=root
    DATABASE_PASSWORD=root
    DATABASE_NAME=books

    #JWT CREDENTIALS

    JWT_SECRET=jwtsecret
    JWT_EXP=2h
    ```

## Running the Application

1. Start the application:
    ```bash
    npm run start
    ```
2. Start the application in development mode:
    ```bash
    npm run start:dev
    ```    

3. The application will be running at `http://localhost:3000`.

## Endpoints

### Books

- **Create a Book**

    ```http
    POST /books
    ```
    Headers:
    ```json
    Authorization: Bearer jwt_token
    ```
    Request Body:
    ```json
    {
      "title": "Book Title",
      "authorId": 1,
      "ISBN": "123-456-789",
      "publishedDate": "2024-05-25"
    }
    ```
    Response:
    ```json
    {
      "id": 9,
      "authorId": 3,
      "title": "Book Title",
      "ISBN": "123-456-789",
      "publishedDate": "2024-05-06T00:00:00.000Z",
      "updatedAt": "2024-05-25T15:39:19.621Z",
      "createdAt": "2024-05-25T15:39:19.621Z"
    }
    ```
    Unauthorized Response:
    ```json
    {
      "statusCode": 401,
      "message": "Unauthorized"
    }
    ```

- **Get All Books**

    ```http
    GET /books
    ```
    Response:
    ```json
    [
      {
        "id": 8,
        "title": "Book Title",
        "ISBN": "ISBN-test",
        "publishedDate": "2024-05-06T00:00:00.000Z",
        "authorId": 3,
        "createdAt": "2024-05-25T15:36:43.000Z",
        "updatedAt": "2024-05-25T15:36:43.000Z"
      }
  ]
    ```

- **Get a Book by ID**

    ```http
    GET /books/:id
    ```
    Response:
    ```json
    {
      "id": 8,
      "title": "Book Title",
      "ISBN": "ISBN-test",
      "publishedDate": "2024-05-06T00:00:00.000Z",
      "authorId": 3,
      "createdAt": "2024-05-25T15:36:43.000Z",
      "updatedAt": "2024-05-25T15:36:43.000Z"
    }
    ```

- **Update a Book**

    ```http
    PATCH /books/:id
    ```
    Headers:
    ```json
    Authorization: Bearer jwt_token
    ```
    Request Body:
    ```json
    {
      "title": "Updated Book Title",
      "authorId": 1,
      "ISBN": "123-456-789",
      "publishedDate": "2024-05-25"
    }
    ```
    Response:
    ```json
    {
      "id": 8,
      "title": "Book Title",
      "ISBN": "ISBN-test",
      "publishedDate": "2024-05-06T00:00:00.000Z",
      "authorId": 3,
      "createdAt": "2024-05-25T15:36:43.000Z",
      "updatedAt": "2024-05-25T15:36:43.000Z"
    }
    ```
     Unauthorized Response:
    ```json
    {
      "statusCode": 401,
      "message": "Unauthorized"
    }
    ```

- **Delete a Book**

    ```http
    DELETE /books/:id
    ```
    Headers:
    ```json
    Authorization: Bearer jwt_token
    ```
    Response:
    ```json
    Deleted successfully
    ```
     Unauthorized Response:
    ```json
    {
      "statusCode": 401,
      "message": "Unauthorized"
    }
    ```

### Authors

- **Create an Author**

    ```http
    POST /authors
    ```
    Headers:
    ```json
    Authorization: Bearer jwt_token
    ```
    Request Body:
    ```json
    {
      "name": "Author Name",
      "biography": "Author Biography",
      "dateOfBirth": "1970-01-01"
    }
    ```
    Response:
    ```json
    {
      "id": 6,
      "name": "Author Name",
      "biography": "Author Biography",
      "dateOfBirth": "1985-07-07T00:00:00.000Z",
      "updatedAt": "2024-05-25T15:36:07.679Z",
      "createdAt": "2024-05-25T15:36:07.679Z"
    }
    ```
     Unauthorized Response:
    ```json
    {
      "statusCode": 401,
      "message": "Unauthorized"
    }
    ```

- **Get All Authors**

    ```http
    GET /authors
    ```
    Response:
    ```json
    [
      {
        "id": 4,
        "name": "test2",
        "biography": "biography",
        "dateOfBirth": "1985-07-07T00:00:00.000Z",
        "createdAt": "2024-05-20T22:27:03.000Z",
        "updatedAt": "2024-05-20T22:27:03.000Z"
      }
  ]
    ```

- **Get an Author by ID**

    ```http
    GET /authors/:id
    ```
     Response:
    ```json
    {
      "id": 6,
      "name": "test4",
      "biography": "biography",
      "dateOfBirth": "1985-07-07T00:00:00.000Z",
      "updatedAt": "2024-05-25T15:36:07.679Z",
      "createdAt": "2024-05-25T15:36:07.679Z"
    }
    ```

- **Update an Author**

    ```http
    PATCH /authors/:id
    ```
    Headers:
    ```json
    Authorization: Bearer jwt_token
    ```
    Request Body:
    ```json
    {
      "name": "Updated Author Name",
      "biography": "Updated Biography",
      "dateOfBirth": "1970-01-01"
    }
    ```
     Response:
    ```json
    {
      "id": 6,
      "name": "Updated Author Name",
      "biography": "Updated Biography",
      "dateOfBirth": "1970-01-01T00:00:00.000Z",
      "updatedAt": "2024-05-25T15:36:07.679Z",
      "createdAt": "2024-05-25T15:36:07.679Z"
    }
    ```
    Unauthorized Response:
    ```json
    {
      "statusCode": 401,
      "message": "Unauthorized"
    }
    ```

- **Delete an Author**

    ```http
    DELETE /authors/:id
    ```
    Headers:
    ```json
    Authorization: Bearer jwt_token
    ```
    Response:
    ```json
    Deleted successfully
    ```
    Unauthorized Response:
    ```json
    {
      "statusCode": 401,
      "message": "Unauthorized"
    }
    ```

### Auth

- **Sign Up**

    ```http
    POST /auth/signUp
    ```

    Request Body:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "test@example.com",
      "password": "Password123!"
    }
    ```
     Response:
    ```json
    {
      "statusCode": 201,
      "data": {
        "user": {
            "id": 14,
            "firstName": "John",
            "lastName": "Doe",
            "email": "test@example.com",
            "updatedAt": "2024-05-25T18:27:48.580Z",
            "createdAt": "2024-05-25T18:27:48.580Z"
        },
        "accessToken": "accessTokenCode"
      }
    }
    ```

- **Sign In**

    ```http
    POST /auth/signIn
    ```

    Request Body:
    ```json
    {
      "email": "test@example.com",
      "password": "Password123!"
    }
    ```
     Response:
    ```json
    {
      "statusCode": 201,
      "data": {
        "user": {
            "id": 14,
            "firstName": "John",
            "lastName": "Doe",
            "email": "test@example.com",
            "updatedAt": "2024-05-25T18:27:48.580Z",
            "createdAt": "2024-05-25T18:27:48.580Z"
        },
        "accessToken": "accessTokenCode"
      }
    }
    ```

## Running Tests

1. To run all tests:
    ```bash
    npm test
    ```

2. To run tests for a specific controller, use the following command:
    ```bash
    npm test -- src/books/books.controller.spec.ts
    ```

    Replace `src/books/books.controller.spec.ts` with the path to the test file you want to run.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
