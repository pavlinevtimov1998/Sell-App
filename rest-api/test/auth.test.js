const express = require("express");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const expressConfig = require("../config/express");
const { COOKIE_NAME } = require("../config/config");
const { createToken } = require("../server");

const User = require("../Models/User");

const app = express();
expressConfig(app, express);

chai.use(chaiHttp);

describe("Auth testing", () => {
    describe("/register endpoint", () => {
        beforeEach((done) => {
            User.deleteMany({}, (err) => {
                done();
            });
        });

        afterEach((done) => {
            User.deleteMany({}, (err) => {
                done();
            });
        });

        it("should throw error if email is invalid", (done) => {
            const data = {
                email: "testuser",
                password: "123123",
                rePassword: "123123",
            };

            chai.request(app)
                .post("/api/auth/register")
                .send(data)
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.message).to.be.equal(
                        "Incorrect input. Invalid email!"
                    );
                    done();
                });
        });

        it("should register user", (done) => {
            const data = {
                email: "testuser@gmail.com",
                password: "123123",
                rePassword: "123123",
            };

            chai.request(app)
                .post("/api/auth/register")
                .send(data)
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    expect(res.body).to.be.a("object");
                    expect(res.body).to.haveOwnProperty("email");
                    expect(res.header["set-cookie"][0]).to.include(COOKIE_NAME);
                    done();
                });
        });

        it("should throw error if email exist", (done) => {
            const data = {
                email: "testuser@gmail.com",
                password: "123123",
                rePassword: "123123",
            };

            chai.request(app)
                .post("/api/auth/register")
                .send(data)
                .end((err, res) => {});

            chai.request(app)
                .post("/api/auth/register")
                .send(data)
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.message).to.include(
                        "Please try with different!"
                    );
                    done();
                });
        });

        it("should throw error if password is less than 6 characters!", (done) => {
            const data = {
                email: "testuser2@gmail.com",
                password: "12312",
                rePassword: "12312",
            };

            chai.request(app)
                .post("/api/auth/register")
                .send(data)
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.message).to.include(
                        "Password should be at least 6 characters!"
                    );
                    done();
                });
        });

        it("should throw error if passwords don't match!", (done) => {
            const data = {
                email: "testuser2@gmail.com",
                password: "123121",
                rePassword: "12312",
            };

            chai.request(app)
                .post("/api/auth/register")
                .send(data)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body.message).to.be.equal(
                        "Passwords don't match!"
                    );
                    done();
                });
        });
    });
});
