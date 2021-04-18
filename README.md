# Railway-Commodity-Reservation-System

*It is a web based application through which we can book online cargo , choose a train and pay for that cargo and send our cargo to destination.*

**Backend :- Nodejs,Expressjs, MongoDB . 
Frontend : HTML,CSS, Bootstrap .**

project video link :  https://drive.google.com/file/d/1I_GgJAsSN1XgdsxhV1Z0D6PjDnqJHUov/view?usp=sharing


*About Our Application...................... *

![rcs1](https://user-images.githubusercontent.com/61588604/115148382-e9924c00-a07c-11eb-99d1-89a4ec2602d1.png)



*About US page :*

![rcs2](https://user-images.githubusercontent.com/61588604/115148421-1b0b1780-a07d-11eb-921e-c7160eb3373c.png)   


*Contact US page :*

![rcs3](https://user-images.githubusercontent.com/61588604/115148469-61f90d00-a07d-11eb-86bc-02f62f5cd078.png)



*Login page :*

![rcs4](https://user-images.githubusercontent.com/61588604/115149861-9d96d580-a083-11eb-8481-207597d89679.png)



*1) Admin can login. Admin can add new trains, update and delete (information) and can see all the informations abouts Trains, Users, Bookings.....*

![rcs5](https://user-images.githubusercontent.com/61588604/115149981-126a0f80-a084-11eb-8f83-419ab80d6382.png)

![rcs6](https://user-images.githubusercontent.com/61588604/115149983-1433d300-a084-11eb-92d5-ca3cc5b15ef5.png)

![rcs7](https://user-images.githubusercontent.com/61588604/115149984-14cc6980-a084-11eb-90d0-eaa2351850d7.png)



*2) User first has go to register page and then he will login. After that he can book kargo and pay the money. User can see his booking history algo.*

![rcs8](https://user-images.githubusercontent.com/61588604/115150153-ce2b3f00-a084-11eb-9d61-0264a262f5a8.png)

![rcs9](https://user-images.githubusercontent.com/61588604/115150156-d08d9900-a084-11eb-889f-30c4d419db8b.png)

![rcs10](https://user-images.githubusercontent.com/61588604/115150158-d1262f80-a084-11eb-884c-6c6ac1d1376d.png)

![rcs11](https://user-images.githubusercontent.com/61588604/115150159-d2575c80-a084-11eb-8222-b05bafa92420.png)


**Technologies : HTML, CSS, Bootstrap, Nodejs, Expressjs
Database : MongoDB**


*About Database* : 
Database name : *railways*
collections :  main three collections used... :
  1) *registerlists* : This collection consists user register information.
        attributes :  name, email, username, password, date of birth, contact number.
        
  2) *trainlists* : This collection consists  train information.
        attributes :  train number, train name, source, destination, total available space, capacity of train, price per kg for cargo booking.
  
  3) *cargolists* : This collection consists cargo booking information.
        attributes :  sender name, usrname, contact, receiver address, weight which we have to shift, total price to pay, card number which is used to done the payment.
