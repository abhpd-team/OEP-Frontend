# Online Exam Portal - FRONTEND

![banner-image](https://i.ibb.co/2YY8PfF/Screenshot-2021-04-26-at-11-32-41-AM.png)

[oeportal.herokuapp.com](https://oeportal.herokuapp.com/)

Online Exam Portal is 🔖 a easy-to-use Platform for MCQ-based tests/exams. Helping 👩🏻‍🏫 teachers by making it easier for them to take online tests and having access to a reliable platform for free.

This is a [react](https://reactjs.org/) based frontend created with [create-react-app](https://github.com/facebook/create-react-app). Special ❤️ Thanks to all the contributors on all the dependencies for making this project possible.

## Installation

You will need node and the package manager [npm / npx](https://nodejs.org/en/download/) that comes with node to install.

1. On the root directory run the following:

```bash
npm install
```

2. You will need to create a `.env` file in the root directory with the following environment variables:

```
REACT_APP_API_URI = <api-uri>
REACT_APP_FRONTEND_URL = <frontend-url>
```

-   Incase youre **only working on the frontend** use this deployed api : `https://oep-api.herokuapp.com`
-   For frontend url simply use the url you're running your app on. **By default that is** : `http://localhost:3000`

> Note : Don't include the trailing forward slash. Use `http://localhost:3000` instead of `http://localhost:3000/`

Here is an example for the contents of `.env`

```
REACT_APP_API_URI = https://oep-api.herokuapp.com
REACT_APP_FRONTEND_URL = http://localhost:3000
```

## Usage

1. Run the following in the root of the project and visit your `<frontend-url>` as mentioned above. **By default that is** : `http://localhost:3000`

```
npm start
```

## Contributing

We're eagerly looking for contributors, Even if you're a **Graphics Designer** a **beginner or a pro at open source you're most welcome** ( Please read CONTRIBUTING.md for a much detailed workflow guide of how we manage contributions and releases )
Pull requests and new bug findings are more than welcome. For major changes, please open an issue first to discuss what you would like to change.

> We're also looking for Maintainers who can help us with code reviews and helping others to contribute to our vision for the project.

Though we strongly recommend to use the product first to get a feel of our goals and to really undestand what we're trying achieve.

> To get some Ideas and Inspiration for contribution read the following section.

## Our Goals and Motivation

> Initially we ( [Abhishek Prasad](https://github.com/abhpd) and [Anubhav Sharma](https://github.com/19BCS1114) ) started with this for University project but soon we realized that this will be a real help for many teachers who either find it hard to use current platforms or would like to use a reliable and secure platform for free.

Currently we're planning for futher development and improvement in following sections of the project:

There is no order/priority for the mentioned points

**1. Responsive design**

> Currently we do not have responsive design UI but we would like to move to move onto a resposive design asap since for many students as well as teachers the only device they have is a phone. So all of you frontend people will be a real help here.

**2. Adding more functionality**

> We started this project with only MCQs but would like to extend this to Subjective exams and Assignments aswell.

**3. Proper Prompt for alterts and error message**

> Some of the error messages from backend or alerts for wrong inputs arent implemented completely so if you find any open a issue and link your PR with the fixes.

**4. Form Control**

> Most of the form validations are still left to be implemented which is very important and at high priority to us for improvement.

**5. Improving API codebase**

> We still need a lot of work in the backend aswell since we have a very basic schema for the DB and we have a lot of redundant code either not in use or can be improved and made more efficient and compact.

**6. API documentation**

> We want to make sure that it is easy for the frontend developers to be able to understand the API calls and system so that it will be easier for them to implement a new functionality or alter some. A documentation for the API makes it a lot easier and quicker.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## ❤️ Thanks for the read 😊
