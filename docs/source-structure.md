# Source structure

These document references the differents components, services and classes used in the sources.

## Models

| Name | Description |
| ---- | ----------- |
| `Option` | An option is a possible answer for a question. Defined by a text string, a boolean for indicating if the option is a correct answer, and an array of whom has answered this option. |
| `Question` | A question is defined by a text string, an array of `Option` and a boolean for indicating if the question is opened. |
| `Room` | A room is a collection of `Question` plus other informations. |
| `User` | A user has simply an email and a password. |

The files can be found in `src/app/`.

## Services

| Name | Description |
| ---- | ----------- |
| `Auth` | The communication to the server uses JWT for authentification. This service handles the token to allow an easy use for components and other services. It provides also methods for register/login users. |
| `RoomProxy` | This service handles the current `Room` connected, with creation/answering/update operations. The direct synchronisation is done here too, using socket.io-client. |

The files can be found in `src/app/`, terminated by `.service.ts`.

## Classes

| Name | Description |
| ---- | ----------- |
| `Helper` | This class simply provides static methods for usual tasks. |

The files can be found in `src/app/`.

## Components

| Name | Description |
| ---- | ----------- |
| `App` | Entry component, organizes other components in the HTML/CSS template. |
| `About` | Landing page, just pure HTML/CSS. |
| `Create` | Handle the logic for creating a new `Room`, and manages it afterwards. |
| `InputNumber` | Small component simulating an `<input type="number">` with more possibilities. |
| `Join` | Handle the logic for joining a `Room`, and answering. |
| `QuestionCreation` | Component for creating a `Question`. |
| `QuestionForm` | Component for answering a `Question`. |
| `QuestionResult` | Component showing the result of a `Question`. |
| `RoomHistory` | Component showing a `Room`, with some statistics. |
| `RoomInfo` | Floating component, showed when a `Room` is connected. Simply shows some informations about it. |
| `User` | User account interface, with a history of old `Room` created. |
| `UserLogin` | User login/registration forms. |

The files can be found in `src/app/<component>/`.

### Components hierachy

Here the components hierachy (which component is used by who):

- `App`
  - `About`
  - `Create`
    - `QuestionCreation`
    - `QuestionResult`
  - `Join`
    - `InputNumber`
    - `QuestionForm`
    - `QuestionResult`
  - `User`
    - `UserLogin`
    - `RoomHistory`
      - `QuestionResult`
  - `RoomInfo`

## Resources

- https://angular.io/docs/ts/latest/quickstart.html
- https://github.com/angular/angular-cli
- https://github.com/auth0/angular2-jwt
- https://github.com/Hacklone/angular2-cool-storage
- https://github.com/Stabzs/Angular2-Toaster
- https://github.com/socketio/socket.io-client
- https://github.com/hden/socketio-wildcard
