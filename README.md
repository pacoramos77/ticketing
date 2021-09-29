***Microservices project exercise***

This is the second exercise in the microservices course. 

https://www.udemy.com/course/microservices-with-node-js-and-react

**Services**
- *auth*: Everything related to user dignup/signin/signout
- *tickets*: Ticket creation/editin. Knows whether a ticket can be updated
- *orders*: order creatin/editing
- *expirtation*: Watches for orders to be created, cancels them after 15 minutes
- *payments*: handles credit card payments. Cancels orders if payments fails, completes if payment succeeds


**Events**
- UserCreated, UserUpdated
- OrderCreated, OrderCanceled, OrderExpired
- TicketCreated, TicketUpdated
- ChargeCreated

***Auth***

| *Route*                | *Method* | *Body*                              | *Purpose*              |
|------------------------|----------|-------------------------------------|------------------------|
| /api/users/signup      | POST     | { email: string, password: string } | Sign up for an account |
| /api/users/signin      | POST     | { email: string, passwod            | Sign in to an existing account |
| /api/users/signout     | POST     | {}                                  | Sign out                |
| /api/users/currentuser | GET      | -                                   | Return info about the user |


gcloud init
gcloud container clusters get-credentials ticketing-dev
gcloud auth application-default login



