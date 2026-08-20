# URL SHORTENER : create the URL in shorte from 

design a URL shortener service theat takes in a valid URL and returns a shortenerd url. redirecting  the user to the previously provided URL. 

also, keep track of total visits/clicks on the URL. 

> **routes :** 
>> 1. POST/URL - generates a new short url and returns the shortened url in the fromat example.com/random-id
>> 2. GET/:ID - redirects the user to the otiginal url
>> 3. GET/URL/ANALYTICS/:ID - returns the click for the provided short id. 