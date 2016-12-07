# Source structure

These document references the differents components, services and classes used in the sources.

## Models

| Name | Description |
| ---- | ----------- |
| `Option` | ... |
| `Question` | ... |
| `Room` | ... |
| `User` | ... |

The files can be found in `src/app/`.

## Services

| Name | Description |
| ---- | ----------- |
| `Auth` | ... |
| `CreateRoom` | ... |
| `JoinRoom` | ... |

The files can be found in `src/app/`, terminated by `.service.ts`.

## Components

| Name | Description |
| ---- | ----------- |
| `App` | ... |
| `About` | ... |
| `Create` | ... |
| `InputNumber` | ... |
| `Join` | ... |
| `QuestionCreation` | ... |
| `QuestionForm` | ... |
| `QuestionResult` | ... |
| `User` | ... |
| `UserLogin` | ... |

The files can be found in `src/app/<component>/`.

### Components hierachy

Here the components hierachy:

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

## Resources

- https://angular.io/docs/ts/latest/quickstart.html
- https://github.com/angular/angular-cli
- https://github.com/auth0/angular2-jwt
- https://github.com/Hacklone/angular2-cool-storage
- https://github.com/Stabzs/Angular2-Toaster
