# Back-End

## Login/Register

| Route    | Method | Endpoint         | Returns                         | Parameters                                                                            |
| -------- | ------ | ---------------- | ------------------------------- | ------------------------------------------------------------------------------------- |
| Register | POST   | `/auth/register` | `201` with the registered user  | All fields required. State and availability for volunteers is filtered for just them. |
| Login    | POST   | `/auth/login`    | `200` with Welcome 'user email' | email and password required, can filter by userType                                   |

## Admin

- Admin routes can get all tasks and all volunteers. Can create, edit, delete tasks.

| Method | Endpoint                            | Returns                              | Parameters                                                        |
| ------ | ----------------------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| GET    | `/dashboard/assignTasks`            | `200` returns list of all tasks      | none                                                              |
| GET    | `/dashboard/assignTasks/volunteers` | `200` returns list of all volunteers | none                                                              |
| POST   | `/dashboard/assignTasks`            | `201` with the created task          | volunteer email, title, and description. Auth token in the header |
| PUT    | `/dashboard/assignTasks/:id`        | `200` with the updated task          | volunteer email, title, and description. Auth token in the header |
| DELETE | `/dashboard/assignTasks/:id`        | `204` with no content                | Auth token in the header                                          |

## Volunteers

- Volunteer routes can get a list of volunteers, a list of their tasks, and update/delete their information.

| Method | Endpoint                          | Returns                                           | Parameters                                                                        |
| ------ | --------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------- |
| GET    | `/dashboard/volunteers`           | `200` returns all volunteers                      | none                                                                              |
| GET    | `/dashboard/volunteers/:id`       | `200` returns a volunteers                        | none                                                                              |
| GET    | `/dashboard/volunteers/:id/tasks` | `200` returns list of all tasks for the volunteer | none                                                                              |
| PUT    | `/dashboard/volunteers/:id`       | `200` updates the volunteers information          | volunteer email, firstname, lastname, password, availability, state. All required |
| DELETE | `/dashboard/volunteers/:id`       | `204` deletes volunteer. with no return content   | Auth token in the header                                                          |

## Students

- Students can get a list of Volunteers

| Method | Endpoint              | Returns                      | Parameters |
| ------ | --------------------- | ---------------------------- | ---------- |
| GET    | `/dashboard/students` | `200` returns all volunteers | none       |
