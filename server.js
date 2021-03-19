const express = require('express');
app = express();
cors = require('cors');
faker = require('faker');
port = 8000;


// Enables cors.
app.use(cors());
// Enables sending and recieving in json format.
app.use(express.json());

class User {
    constructor() {
        this._id = faker.random.number();
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.phoneNumber = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
    }
}

const makeNewUser = () => {
    return newUser = new User();
}

const users = []

class Company {
    constructor() {
        this._id = faker.random.number();
        this.name= faker.company.companyName();
        this.address = {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country(),
        }
    }
}

const makeNewCompany = () => {
    return newCompany = new Company();
}

const companies = []

app.post('/api/users/new', (req,res) => {
    const user = makeNewUser();
    users.push(user);
    res.json({user});
})

app.post('/api/companies/new', (req,res) => {
    const company = makeNewCompany();
    companies.push(company);
    res.json({company})
})

app.post('/api/user/company', (req,res) => {
    const newUser = makeNewUser();
    const newCompany= makeNewCompany();
    users.push(newUser);
    companies.push(newCompany);
    res.json({user: newUser, company: newCompany});
})

app.get('/api/companies', (req,res) => {
    res.json({results:companies});
})

app.get('/api/users', (req,res) => {
    res.json({results:users});
})

server = app.listen(port, () => console.log(`Listening on port ${port}`));