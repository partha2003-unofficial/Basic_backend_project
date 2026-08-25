# URL SHORTENER : create the URL in shorte from (First part)

design a URL shortener service theat takes in a valid URL and returns a shortenerd url. redirecting  the user to the previously provided URL. 

also, keep track of total visits/clicks on the URL. 

> **routes :** 
>> 1. POST/URL - generates a new short url and returns the shortened url in the fromat example.com/random-id
>> 2. GET/:ID - redirects the user to the otiginal url
>> 3. GET/URL/ANALYTICS/:ID - returns the click for the provided short id. 

# Create full applicaton (second part)

> **routes :**
>> 1. localhost:8000 - go to the home page (ware all details are visiables)
>> 2. localhost:8000/login - go to the login page 
>> 3. /singup - go to the singup page 

# Create authentication (use statefull authenticaton) (third part)

1. create authenticaton using javaScript Map()
2. and tracking the users using random unique id by (import { v4 as uuidv4 } from 'uuid';)
3. Then setting the uniqueID to he cookies to track the user and create login base application 

# converting the applicaiton to a stateless authentication (forth part)

create the applicaiton to a sateless authentication 

# Adding authorization in the applicaion (fifth)

1. Adding some authorization to some routes
2. Adding a admin route that did not access by other , it is use only by the ADMIN