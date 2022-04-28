# Brick Shop

## User Registration

In order to better understand the flow of the backend database and user registration,
it is important to distinguish between a *user* and a *customer*.
In the context of ecommerce websites these two terms and generally
synonymous, however there is a conceptual difference between the
two in my implementation. A *user* is anyone who logs in to the
website, this is done through the Auth0 portal ![Auth0 Login Redirect](README-imgs\auth0-login.png)

Upon sign up, the user is assigned a profile containing a userID (by Auth0). It is not until the user makes an order that they become a *customer* and are  [inserted into the customer table.](https://github.com/UP938751/brick-shop/blob/main/server/products.js#L188-L205). Auth0 provides two methods of sign up: using username/email address and password or by using Google Oauth2. The latter provides a first name and surname whereas the former does not. This variation in the sign up process is [checked for](https://github.com/UP938751/brick-shop/blob/main/server/products.js#L188-L212) and the values for the firstname and surname are inserted into the Customer table accordingly.

This implementation works well with using Auth0 as the
authentication client as it provides a smooth login and registration process since the ID provided by Auth0 is the one that is used during insertion in the Customer table.

## Orders

- Orders are inserted into the Order table but stock levels are not updated. Inititally implemented stock change levels on purchase but in reality stock is not affected until the products are shipped to the customer. (out of stock?)


## Future Work

- Admin Auth0 scope
- DB optimisation
- Unnamed account firstname and surname
- Limited/no testing
- More colours