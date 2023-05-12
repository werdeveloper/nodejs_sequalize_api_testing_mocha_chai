//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp); // Middleware

const app = require('../server');

beforeEach(() => {
    console.log("Testing Start", new Date());    
});

afterEach(() => {
    console.log("Testing Finish", new Date());
});

describe(`Test the CRUD API's`, () => {
    try {
        // Create User
        it('Create', (done) => {
            let data = {
                name: "Deep", 
                email: "deep3@yopmail.com", 
                password: "Deep@123", 
                confirm_password: "Deep@123"
            }
            chai.request(app)
            .post('/api/v1/user-registration')
            .send(data)
            .end(function(err, res) {
                // console.log(res?.error?.text);
                if (err || res?.error?.text){
                    let respo = (res?.error?.text)? JSON.parse(res?.error?.text)?.errormsg: (err?err:res?.error);
                    return done(respo);
                }
                res.should.have.status(200);
                return done();
            });
        });

        // User Lists
        it('Lists', (done) => {
            chai.request(app)
            .get(`/api/v1/get-user-lists`)
            .end(function(err, res) {
                // console.log(res?.error?.text);
                if (err || res?.error?.text){
                    let respo = (res?.error?.text)? JSON.parse(res?.error?.text)?.errormsg: (err?err:res?.error);
                    return done(respo);
                }
                res.should.have.status(200);
                return done();
            });
        });

        // User Details
        it('Details', (done) => {
            let userId = 3;
            chai.request(app)
            .get(`/api/v1/get-user-details/${userId}`)      
            .end(function(err, res) {
                // console.log(res?.error?.text);
                if (err || res?.error?.text){
                    let respo = (res?.error?.text)? JSON.parse(res?.error?.text)?.errormsg: (err?err:res?.error);
                    return done(respo);
                }
                res.should.have.status(200);
                return done();
            });
        });

        // Update User
        it('Update', (done) => {
            let userId = 3;
            chai.request(app)
            .put(`/api/v1/update-user-details/${userId}`)
            .send({ name: 'Test User' })
            .end(function(err, res) {
                // console.log(res?.error?.text);
                if (err || res?.error?.text){
                    let respo = (res?.error?.text)? JSON.parse(res?.error?.text)?.errormsg: (err?err:res?.error);
                    return done(respo);
                }
                res.should.have.status(200);
                return done();
            });
        });

        // Delete User
        it('should delete the created resource', (done) => {
            let userId = 3;
            chai.request(app)
            .delete(`/api/v1/delete-user/${userId}`)
            .end(function(err, res) {
                // console.log(res?.error?.text);
                if (err || res?.error?.text){
                    let respo = (res?.error?.text)? JSON.parse(res?.error?.text)?.errormsg: (err?err:res?.error);
                    return done(respo);
                }
                res.should.have.status(200);
                return done();
            });
        });
    }
    catch(err){
        console.log(`Final Catch Error!`, err.message);
    }
});
