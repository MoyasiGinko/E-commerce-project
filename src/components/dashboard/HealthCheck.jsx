/* eslint-disable no-console, react/no-danger */
import React, { Component } from 'react';

class HealthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      healthData: null,
      error: null,
    };
  }

  componentDidMount() {
    // Fetch health data when the component mounts
    fetch('http://localhost:3001/index.html') // Use the URL of your health endpoint http://localhost:8761
      .then((response) => response.text()) // Use response.text() instead of response.json()
      .then((data) => this.setState({ healthData: data }))
      .catch((error) => this.setState({ error }));
  }

  handleButtonClick = () => {
    // Open the link when the button is clicked
    window.open('http://localhost:8761', '_blank');
  };

  render() {
    const { healthData, error } = this.state;

    if (error) {
      return (
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
          }}
        >
          <div>
            <span>If the page does not render, </span>
            <button
              className="text-red-500"
              type="button"
              onClick={this.handleButtonClick}
            >
              click here
            </button>
          </div>
          Error fetching health data:
          {error.message}
        </div>
      );
    }

    if (!healthData) {
      return (
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'rgba(25, 25, 255, 1)',
          }}
        >
          <div>
            <span>If the page does not render, </span>
            <button
              className="text-red-500"
              type="button"
              onClick={this.handleButtonClick}
            >
              click here
            </button>
          </div>
          Loading...
        </div>
      );
    }

    return (
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'rgba(25, 25, 255, 1)',
        }}
      >
        <style>
          {`
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: rgba(255, 255, 255, 0.1); /* Set background color here */
            }

            .container {
              max-width: 1200px;
              margin: 0 auto;
              padding: 20px;
            }

            h1 {
              color: white; /* Set text color here */
              margin-bottom: 20px;
            }

            table {
              width: 100%;
              margin-bottom: 20px;
              border-collapse: collapse;
              border-spacing: 0;
            }

            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid  rgba(255, 255, 255, 0.1);
            }

            th {
              background-color:  rgba(255, 255, 255, 0.1);
            }

            .navbar {
              background-color:  rgba(255, 255, 255, 0.1);
              padding: 10px 0;
            }

            .navbar a {
              color: white;
              text-decoration: none;
              margin: 0 15px;
            }

            .navbar a:hover {
              text-decoration: underline;
            }
          `}
        </style>
        <div>
          <span>If the page does not render, </span>
          <button
            className="text-red-500"
            type="button"
            onClick={this.handleButtonClick}
          >
            click here
          </button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: healthData }} />
      </div>
    );
  }
}

export default HealthComponent;
