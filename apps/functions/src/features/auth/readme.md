

AUTH PROCESS
1. generateAuthCode
  - Receives an email as parameter
  - Generates a random six-digit code
  - Save the code and the email in the DB (collection authCodes).
       object should look like:
       "johndoe@example.com": {
         code: "123456",
         attempts: 3
       }
    - If there is another code already generated for this client (resend several emails without login with any of it), remove it
    - The client need to transition to a page to enter the code, the email needs to be saved to send it in the step 2

2. validateAuthCode
   - Receives client email and code he entered
   - Verify against the code we have in DB
   - 2.1. If the code is correct, generate an auth token and send it to the client
   - 2.2. If the code is incorrect,
        - 2.2.1. If authAttempts < 2, update authAttempts and send an error to the client with the amount of attempts left.
        - 2.2.2. If authAttempts >= 2 return another error to the client and delete the entry in the DB

2.1. Following
   - Frontend receives the token and log in the client
   - Clean the email from wherever is saved
 
2.2.1 Following
   - Frontend should restart the form and show the error, along with the attempts left.

2.2.2 Following
   - Frontend should redirect the client back to the login page and show the error in a toast.
   - Clean the email from wherever is saved
