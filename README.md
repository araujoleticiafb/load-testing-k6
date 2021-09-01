# Load Testing with K6

For installation follow [https://k6.io/docs/getting-started/installation](https://k6.io/docs/getting-started/installation)

## Running 


### Running local tests
> No graphics results.

Go to folder where is your tests and execute: 
```sh
$ k6 run script.js
```

### Running cloud tests
> Graphics results.
 1. Create a user at [https://k6.io/cloud](https://k6.io/cloud);
 2. Copy token, which is shown at https://k6.io/cloud, and paste to terminal;
 3.  Then go to folder where is your tests and execute: 
```sh
$ k6 run -o cloud script.js
```
