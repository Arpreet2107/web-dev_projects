📦 dto Package – Data Transfer Objects
This package contains Data Transfer Objects (DTOs), which are simple Java classes used to transfer data between different layers of the application (such as between the controller and service layers) without exposing the internal entity models.

✅ Why use DTOs?

To control the data exposed via APIs (e.g., hide sensitive fields like passwords)

To simplify request/response payloads

To reduce tight coupling between layers

To support validation logic at the boundary

Example use cases:

UserRequestDTO → Data received from client (for POST/PUT)

UserResponseDTO → Data sent to client (for GET)

AuthDTO → Login or token response object

