import http from 'k6/http';
import { check, sleep, group } from 'k6';

export let options = {
    vus: 2,
    duration: '3s',
    thresholds: {
        // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
        'http_req_duration': ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],  
    }
}; 

export default function() {
    const BASE_URL = 'https://reqres.in/api';
    let params = {
        headers: { 'Content-Type': 'application/json'}
    };
    var chosenPage = '2'
    var payloadLogin = JSON.stringify({
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
    });
    var payloadInvalidLogin = JSON.stringify({
        email: 'eve.holt@reqres.in'
    });
    var payloadUpdate = JSON.stringify({
        name: 'morpheus',
        job: 'zion resident',
    });
    var payloadCreate = JSON.stringify({
        name: 'ariana',
        job: 'singer',
    });
    group('user flow: returning user', function () {
        group('list of users', function () {
            let listOfUsers = http.get(
                `${BASE_URL}/users?page=${chosenPage}`, params);
            check(listOfUsers, {
                'list of users status code request was 200': r => r.status === 200,
                'list of users response time was less than 100ms': r => r.timings.duration < 100,
            });
            console.log(listOfUsers.body);
        });

        group('login page', function () {
            let successfullyLogin = http.post(
                `${BASE_URL}/login`, payloadLogin, params);
            check(successfullyLogin, {
                'successfully login status request was 200': r => r.status === 200,
                'successfully login response time was less than 100ms': r => r.timings.duration < 100,
            });
            console.log(successfullyLogin.body);
        
            let unsuccessfullyLogin = http.post(
                `${BASE_URL}/login`, payloadInvalidLogin, params);
            check(unsuccessfullyLogin, {
                'unsuccessfully login status request was 400': r => r.status === 400,
                'unsuccessfully login response time was less than 100ms': r => r.timings.duration < 100,
            });
            console.log(unsuccessfullyLogin.body);
        });

        group('update user', function () {
            let updateUser = http.put(
                `${BASE_URL}/users`, payloadUpdate, params);
            check(updateUser, {
                'update user status request was 200': r => r.status === 200,
                'update user response time was less than 100ms': r => r.timings.duration < 100,
            });
            console.log(updateUser.body);
        });

        group('create user', function () {
            let createUser = http.post(
                `${BASE_URL}/users`, payloadCreate, params);
            check(createUser, {
                'create user status request was 200': r => r.status === 201,
                'create user response time was less than 100ms': r => r.timings.duration < 100,
            });
            console.log(createUser.body);
        }); 
        sleep(10);
    });
}