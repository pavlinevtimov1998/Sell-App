process.env.NODE_ENV = "TEST";
console.log(process.env.NODE_ENV);
const express = require("express");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const expressConfig = require("../config/express");
const { COOKIE_NAME } = require("../config/config");
const { createToken } = require("../server");

const User = require("../Models/User");
const { getToken } = require("../Utils/jwtConfig");

const app = express();
expressConfig(app, express);

chai.use(chaiHttp);

describe("Auth testing", () => {
    // describe("/register endpoint", () => {
    //     beforeEach((done) => {
    //         User.deleteMany({}, (err) => {
    //             done();
    //         });
    //     });

    //     afterEach((done) => {
    //         User.deleteMany({}, (err) => {
    //             done();
    //         });
    //     });

    //     it("should throw error if email is invalid", (done) => {
    //         const data = {
    //             email: "testuser",
    //             password: "123123",
    //             rePassword: "123123",
    //         };

    //         chai.request(app)
    //             .post("/api/auth/register")
    //             .send(data)
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(400);
    //                 expect(res.body.message).to.be.equal(
    //                     "Incorrect input. Invalid email!"
    //                 );
    //                 done();
    //             });
    //     });

    //     it("should register user", (done) => {
    //         const data = {
    //             email: "testuser@gmail.com",
    //             password: "123123",
    //             rePassword: "123123",
    //         };

    //         chai.request(app)
    //             .post("/api/auth/register")
    //             .send(data)
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(201);
    //                 expect(res.body).to.be.a("object");
    //                 expect(res.body).to.haveOwnProperty("email");
    //                 expect(res.header["set-cookie"][0]).to.include(COOKIE_NAME);
    //                 done();
    //             });
    //     });

    //     it("should throw error if email exist", (done) => {
    //         const data = {
    //             email: "testuser@gmail.com",
    //             password: "123123",
    //             rePassword: "123123",
    //         };

    //         chai.request(app)
    //             .post("/api/auth/register")
    //             .send(data)
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(201);
    //                 expect(res.body).to.be.a("object");
    //                 expect(res.body).to.haveOwnProperty("email");
    //                 expect(res.header["set-cookie"][0]).to.include(COOKIE_NAME);
    //             });

    //         chai.request(app)
    //             .post("/api/auth/register")
    //             .send(data)
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(400);
    //                 expect(res.body.message).to.include(
    //                     "Please try with different!"
    //                 );
    //                 done();
    //             });
    //     });

    //     it("should throw error if password is less than 6 characters!", (done) => {
    //         const data = {
    //             email: "testuser2@gmail.com",
    //             password: "12312",
    //             rePassword: "12312",
    //         };

    //         chai.request(app)
    //             .post("/api/auth/register")
    //             .send(data)
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(400);
    //                 expect(res.body.message).to.include(
    //                     "Password should be at least 6 characters!"
    //                 );
    //                 done();
    //             });
    //     });

    //     it("should throw error if passwords don't match!", (done) => {
    //         const data = {
    //             email: "testuser2@gmail.com",
    //             password: "123121",
    //             rePassword: "12312",
    //         };

    //         chai.request(app)
    //             .post("/api/auth/register")
    //             .send(data)
    //             .end((err, res) => {
    //                 expect(res.status).to.be.equal(400);
    //                 expect(res.body.message).to.be.equal(
    //                     "Passwords don't match!"
    //                 );
    //                 done();
    //             });
    //     });
    // });

    // describe("/login endpoint", () => {
    //     let data;

    //     beforeEach((done) => {
    //         data = {
    //             email: "testuser@gmail.com",
    //             password: "123123",
    //         };

    //         User.create(data, (err, result) => {
    //             done();
    //         });
    //     });

    //     afterEach((done) => {
    //         User.deleteMany({}, (err) => {
    //             done();
    //         });
    //     });

    //     it("should login successfully with correct data", (done) => {
    //         chai.request(app)
    //             .post("/api/auth/login")
    //             .send(data)
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(200);
    //                 expect(res.body).to.be.a("object");
    //                 expect(res.body).to.haveOwnProperty("email");
    //                 expect(res.header["set-cookie"][0]).to.include(COOKIE_NAME);
    //                 done();
    //             });
    //     });

    //     it("should throw error if email is incorrect", (done) => {
    //         data.email = "differentemail@gmail.com";

    //         chai.request(app)
    //             .post("/api/auth/login")
    //             .send(data)
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(401);
    //                 expect(res.body.message).to.be.equal(
    //                     "Email or password don't match!"
    //                 );
    //                 done();
    //             });
    //     });

    //     it("should throw error if password is incorrect", (done) => {
    //         data.password = "different-pass";

    //         chai.request(app)
    //             .post("/api/auth/login")
    //             .send(data)
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(401);
    //                 expect(res.body.message).to.be.equal(
    //                     "Email or password don't match!"
    //                 );
    //                 done();
    //             });
    //     });
    // });

    // describe("/register and login endpoints requests already logged in user", () => {
    //     let data;
    //     let token;

    //     beforeEach((done) => {
    //         data = {
    //             email: "testuser@gmail.com",
    //             password: "123123",
    //             rePassword: "123123",
    //         };

    //         User.create(data, (err, result) => {
    //             getToken({
    //                 _id: result._id,
    //                 email: result.email,
    //                 isAdmin: result.isAdmin,
    //             }).then((createdToken) => {
    //                 token = createdToken;
    //                 done();
    //             });
    //         });
    //     });

    //     afterEach((done) => {
    //         User.deleteMany({}, (err) => {
    //             done();
    //         });
    //     });

    //     it("should stop request to /register", (done) => {
    //         chai.request(app)
    //             .post("/api/auth/register")
    //             .set("Cookie", `${COOKIE_NAME}=${token}`)
    //             .send(data)
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(400);
    //                 expect(res.body.message).to.include(
    //                     "You are already logged in!"
    //                 );
    //                 done();
    //             });
    //     });

    //     it("should stop request to /login", (done) => {
    //         chai.request(app)
    //             .post("/api/auth/login")
    //             .set("Cookie", `${COOKIE_NAME}=${token}`)
    //             .send({ email: data.email, password: data.password })
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(400);
    //                 expect(res.body.message).to.include(
    //                     "You are already logged in!"
    //                 );
    //                 done();
    //             });
    //     });
    // });

    describe("/remove-account endpoint", () => {
        let data;
        let token;

        beforeEach((done) => {
            data = {
                email: "testuser@gmail.com",
                password: "123123",
                rePassword: "123123",
            };

            User.create(data, (err, result) => {
                getToken({
                    _id: result._id,
                    email: result.email,
                    isAdmin: result.isAdmin,
                }).then((createdToken) => {
                    token = createdToken;
                    done();
                });
            });
        });

        afterEach((done) => {
            User.deleteMany({}, (err) => {
                done();
            });
        });

        it("should remove account", (done) => {
            chai.request(app)
                .delete("/api/auth/remove-account")
                .set("Cookie", `${COOKIE_NAME}=${token}`)
                .end((err, res) => {
                    const cookie = res.header["set-cookie"][0].split(";")[0];

                    expect(res.status).to.equal(204);
                    expect(cookie).to.be.equal(`${COOKIE_NAME}=`);
                    User.find().then((result) => {
                        expect(result.length).to.be.equal(0);
                        done();
                    });
                });
        });

        it("should stop request if user is unauthorized", (done) => {
            chai.request(app)
                .delete("/api/auth/remove-account")
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                    expect(res.body.message).to.equal("Unauthorized!");

                    User.find().then((result) => {
                        expect(result.length).to.be.equal(1);
                        done();
                    });
                });
        });
    });

    describe("/logout endpoint", () => {
        let data;
        let token;

        beforeEach((done) => {
            data = {
                email: "testuser@gmail.com",
                password: "123123",
                rePassword: "123123",
            };

            User.create(data, (err, result) => {
                getToken({
                    _id: result._id,
                    email: result.email,
                    isAdmin: result.isAdmin,
                }).then((createdToken) => {
                    token = createdToken;
                    done();
                });
            });
        });

        afterEach((done) => {
            User.deleteMany({}, (err) => {
                done();
            });
        });

        it("should logout successfully", (done) => {
            chai.request(app)
                .get("/api/auth/logout")
                .set("Cookie", `${COOKIE_NAME}=${token}`)
                .end((err, res) => {
                    const cookie = res.header["set-cookie"][0].split(";")[0];

                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal("Successfull logout!");
                    expect(cookie).to.be.equal(`${COOKIE_NAME}=`);
                    done();
                });
        });

        it("should stop request if is guest", (done) => {
            chai.request(app)
                .get("/api/auth/logout")
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                    expect(res.body.message).to.equal("Unauthorized!");

                    done();
                });
        });
    });
});
