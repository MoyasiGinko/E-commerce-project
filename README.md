<br>
<div align='center'>
	<h1>Micro Commerce App Front-end (API)</h1>
  </div>
<a name="readme-top"></a>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [🔭 Added Features](#added-features)
- [⭐️ Show your support](#support)
- [📝 License](#license)

# 🖥️ "Micro Commerce" Front-end <a name="about-project"></a>

**Micro Commerce App Front-end** is an application that aims to revolutionize the e-commerce industry by providing a seamless and user-friendly online shopping experience. With a wide range of products and intuitive features, our app makes it easy for customers to browse, explore, and purchase their favorite items. Whether you're a fashion enthusiast, a tech geek, or a home decor lover, MicroCommerce has something for everyone. Start exploring our virtual marketplace today and discover the joy of online shopping like never before.

## ⚙️ Integration with Back-End

This front-end project is designed to seamlessly integrate with its counterpart _back-end project_. The Back-end project provides the API endpoints and database for the front-end project.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Client</summary>
  <br>
  <ul>
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
      <img alt="ruby" width="90px"  height="35px" src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
    </a>
    <br>
    <a href="https://babeljs.io/">
      <img alt="ruby" width="100px"  height="35px" src="https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black" />
    </a>
    <br>
      <img alt="ruby" width="130px"  height="35px" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
    <br>
      <img alt="ruby" width="145px"  height="35px" src="https://img.shields.io/badge/stylelint-000?style=for-the-badge&logo=stylelint&logoColor=white" />
    <br>
    <a href="https://webpack.js.org/">
      <img alt="ruby" width="140px"  height="35px" src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black" />
    </a>
    <br>
    <a href="https://reactjs.org/">
      <img alt="ruby" width="120px"  height="35px" src="https://img.shields.io/badge/React-0075A8?style=for-the-badge&logo=react&logoColor=61DAFB" />
    </a>
    <br>
    <a href="https://redux.js.org/">
      <img alt="ruby" width="120px"  height="35px" src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
    </a>
    <br>
    <a href="https://tailwind.com/">
      <img alt="ruby" width="100px"  height="35px" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    </a>
    <br>
  </ul>
</details>
<details>
  <summary>Server</summary>
  <br>
  <ul>
      <img alt="ruby" width="90px"  height="35px" src="https://img.shields.io/badge/api-F37626?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
    <br>
  </ul>
</details>

#### Key Features <a name="key-features"></a>

- Seamless Online Shopping: Experience a revolutionized e-commerce industry with our Micro Commerce app. Browse, explore, and purchase your favorite items with ease.

- Wide Range of Products: Whether you're a fashion enthusiast, a tech geek, or a home decor lover, Micro Commerce has something for everyone. Discover a diverse collection of products.

- User-Friendly Interface: Enjoy a visually appealing and intuitive user interface that ensures a seamless shopping experience for users of all backgrounds.

- Integration with Back-End: Our front-end project seamlessly integrates with the back-end project, providing API endpoints and a database for a complete e-commerce solution.

- Responsive Design: MicroCommerce is designed to be responsive, providing a consistent and enjoyable shopping experience on both mobile devices and desktops.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Live Demo <a name="live-demo"></a>

N/A

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>

Prerequisites and setup instructions for the project are listed below.

### Prerequisites <a name="prerequisites"></a>

In order to run this project you need:

- Computer running MacOS, Linux or Windows
- Terminal (MacOS/Linux) or Command Line (Windows)
- Git ([Download](https://git-scm.com/downloads))
- Web browser ([Chrome](https://www.google.com/chrome/), [Firefox](https://www.mozilla.org/en-US/firefox/new/), etc.)
- Source code editor ([VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/), etc.)
- Node.js (version 14.15.4 or higher) ([Download](https://nodejs.org/en/download/))
- NPM (version 6.14.10 or higher) ([Download](https://www.npmjs.com/get-npm))
- React ([Create React App](https://create-react-app.dev/docs/getting-started/))
- Redux ([React Redux](https://react-redux.js.org/))
- Postman ([Download](https://www.postman.com/downloads/))

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Setup <a name="setup"></a>

1. Clone the repository: if the project is in GitHub or a Github repository, then follow the instructions below.

_Example: on your computer:_

```bash
open git bash
git clone https://github.com/AbdulHamidA/E-Microservice.git
cd E-Microservice-main\frontend
```

2. Install the dependencies: To install your `npm packages` please follow the instructions below.

- _Note: If the packages are outdated and throwing errors, make sure to identify and update them before running `npm install`. Here's what you can do by running the command `npm outdated`, you will see a list of packages that needs to be updated and following the commands below will update all your packages to their optimal version._

```
npm update
npm install
```

3. Modify your local environment: To set your environment variables, you need to create a `.env` file in the root directory of the project and add the following line:

- For development: PORT is optional, if not provided, the app will run on port 3000.

```bash
REACT_APP_API_AUTH_URL=http://localhost:3001/api/v1/auth
REACT_APP_API_URL=http://localhost:3001/api/v1
REACT_APP_PAYPAL_CLIENT_ID="your-client-id"
```

- For production:

```bash
REACT_APP_API_AUTH_URL="your-auth-url"
REACT_APP_API_URL="your-api-url"
REACT_APP_PAYPAL_CLIENT_ID="your-client-id"
```

- In the root directory of the project go to the folder `./public/index.html`and open the `index.html` file. Find the line and make the necessary changes to put your PayPal `client-id` as shown below. You can set a default currency parameter if you want, for example `USD/CAD/NOK`etc. Use the one that works for you or you can leave it empty after the `your-client-id`.

with default currency paramemter:

```bash
<script src="https://www.paypal.com/sdk/js?client-id={your-client-id}&currency={set-your-default-currency}"></script>
```

without default currency parameter:

```bash
<script src="https://www.paypal.com/sdk/js?client-id={your-client-id}"></script>
```

4. Start the app in a Power Shell/bash terminal:

```bash
npm start
```

5. Open your web browser and navigate to: http://localhost:3000/ to access the application.

6. **Back End**: You need to have the back-end running to see the run on your frontend server, please read the backend documentation and follow the instructions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Added Features <a name="added-features"></a>

- [x] **Add user authentication**
- [x] **Add user authorization**
- [x] **Add user role; CUSTOMER, VENDOR and ADMIN**

- [x] **Add products**
- [x] **Add edit product details**
- [x] **Add delete product**

- [x] **Add product categories**
- [x] **Add edit product categories**
- [x] **Add delete product categories**

- [x] **Add shopping cart**
- [x] **Add checkout process**
- [x] **Add payment processing**
- [x] **Add paypal integration**

- [x] **Add user profiles**
- [x] **Add product inventory**
- [x] **Add navbar**

- [x] **Add check application health**
- [x] **Add responsive design**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

- If you like this project please give it a ⭐️!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
