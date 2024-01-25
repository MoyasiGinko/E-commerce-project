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

  render() {
    const { healthData, error } = this.state;

    if (error) {
      return <div>Error fetching health data: {error.message}</div>;
    }

    if (!healthData) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <style>
          {`
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }

            .container {
              max-width: 1200px;
              margin: 0 auto;
              padding: 20px;
            }

            h1 {
              color: #333;
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
              border-bottom: 1px solid #ddd;
            }

            th {
              background-color: #f2f2f2;
            }

            .navbar {
              background-color: #333;
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
        <div dangerouslySetInnerHTML={{ __html: healthData }} />
      </div>
    );
  }
}

export default HealthComponent;
