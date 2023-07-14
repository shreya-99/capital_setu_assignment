# capital_setu_assignment

These are the points and their implementation:-
1. Used app.js a starting point of the application which will create instace of mongodb and start the server listening for incoming requests.
   
2. Sign up for User through unique mobile number  = this funcitonality is inside authController.js
3. Role base login  a) Admin (full access, Please add admin static entry direct into database )
b) User (Self Write) = this funcitonality is inside authMiddleware.js

4. User can order the product after login = this funcitonality is inside productController.js

5. Admin can upload Multiple images of Product (validation(size, type ) for product [.jpg | .png]) = this funcitonality is inside productController.js using multer. As Multer is imported and configured to use disk storage for storing uploaded files in the uploads/ directory. 

6. Login (JWT token) = this funcitonality is inside authMiddleware.js

7. CRUD Product [Name, Size, Image, Colour, Price, Quantity]. = this funcitonality is inside productController.js

8. CRUD Order User wise [user_id, order_code, order_date, required_date, shipped_date, order_status ] = this funcitonality is inside orderController.js

9. Sorting, pagination, search by Name of Product (In the first page should be 10 records after that 12 records each) = this funcitonality is inside productController.js using method readProducts

10. Admin can manage all products and orders of users. = this is implemented inside routes folder for order and products
