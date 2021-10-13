***Microservices project exercise***

This is the second exercise in the microservices course. 

https://www.udemy.com/course/microservices-with-node-js-and-react


***Creating secrets***
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_asdf...
```

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

***Auth service***
| *Route*                | *Method* | *Body*                              | *Purpose*              |
|------------------------|----------|-------------------------------------|------------------------|
| /api/users/signup      | POST     | { email: string, password: string } | Sign up for an account |
| /api/users/signin      | POST     | { email: string, passwod            | Sign in to an existing account |
| /api/users/signout     | POST     | {}                                  | Sign out                |
| /api/users/currentuser | GET      | -                                   | Return info about the user |

***Tickets service***
| *Route*                | *Method* | *Body*                              | *Purpose*              |
|------------------------|----------|-------------------------------------|------------------------|
| /api/tickets           | GET      | -                                   | Retrieve all tickets   |
| /api/tickets/:id       | GET      | -                                   | Retrieve ticket with specific ID |
| /api/tickets           | POST     | { title: string, price: string }    | Create a ticket          |
| /api/tickets           | PUT      | { title: string, price: string }    | Update a ticket          |

***Orders service***
| *Route*                | *Method* | *Body*                              | *Purpose*              |
|------------------------|----------|-------------------------------------|------------------------|
| /api/orders           | GET      | -                                   | Retrieve all orders for the given user |
| /api/orders/:id       | GET      | -                                   | Get details about a specific order     |
| /api/orders           | POST     | { ticketId: string }                | Create a order to purchase the specified ticket  |
| /api/orders           | DELETE   | -                                   | cancel the order          |
