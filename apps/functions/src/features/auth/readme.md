## Auth Process 🔐

### 1. Call `generateAuthCode`

  - Receives an `email` as parameter
  - Generates a random six-digit `code`
  - Save the `code` and the `email` in the DB (collection `authCodes`).
       The object should look like:
       ```
         "johndoe@example.com": {
           code: "123456",
           attempts: 3
         }
       ```
  - If there is another `code` already generated for this client (it may happen if the client calls `generateAuthCode` several times, and it re-sends several emails without login with any of it), remove it.
  - The client need to transition to a page to enter the `code`. The `email` needs to be saved to send it in the Step 2

### 2. Call `validateAuthCode`
  - The client receives the email with the generated `code`.
  - The client enters the code in the page he was redirected, and `validateAuthCode` is called.
  - Verify against the `code` we have in DB.

#### 2.1. If the `code` is correct

  - Generate an `auth token` and send it to the client.
  - Frontend receives the `token` and log in the client.
  - Clean the `email` from wherever was saved.

#### 2.2. If the `code` is incorrect

  - If `authAttempts < 2`
    - Update `authAttempts` and send an error to the client with the amount of attempts left.
    - Frontend should restart the form and show the error, along with the attempts left.
  - If `authAttempts >= 2` 
    - Return another error to the client and delete the entry in the DB.
    - Frontend should redirect the client back to the login page and show the error in a toast.
    - Clean the email from wherever is saved
