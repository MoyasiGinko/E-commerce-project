import React, { Component } from 'react';

class HealthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      healthData: null,
      error: null,
    };
  }

  // componentDidMount() {
  //   // Fetch health data when the component mounts
  //   fetch('http://localhost:3001/index.html') // Use the URL of your health endpoint http://localhost:8761
  //     .then((response) => response.text()) // Use response.text() instead of response.json()
  //     .then((data) => this.setState({ healthData: data }))
  //     .catch((error) => this.setState({ error }));
  // }

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
            <span>
              Check your applications health. If the page does not render,
              please
              {' '}
            </span>
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
            <span>
              Check your applications health. If the page does not render,
              please
              {' '}
            </span>
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
      <div>
        <div>
          <span>
            Check your applications health. If the page does not render, please
            {' '}
          </span>
          <button
            className="text-red-500"
            type="button"
            onClick={this.handleButtonClick}
          >
            click here
          </button>
        </div>
      </div>
    );
  }
}

export default HealthComponent;
