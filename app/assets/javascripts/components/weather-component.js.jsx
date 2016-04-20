var weather = React.createClass({
  getInitialState: function() {
    return {
      weatherMain: "none", // Group of weather parameters (Rain, Snow, Extreme etc.)
      weatherDescription: "none", // Weather condition within the group
      mainTemp: 0, // Temperature. Unit Celsius
      mainTemp_min: 0, // Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Celsius
      mainTemp_max: 0, // Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Celsius
      name: "none" // City name
    };
  },
  tick: function() {
    var tmp = {};
    $.ajax({
      dataType: "json",
      url: openWheater.url(),
      async: false,
      success: function(response, textStatus) {
        tmp = {
          weatherMain: response.weather[0].main,
          weatherDescription: response.weather[0].description,
          mainTemp: response.main.temp,
          mainTemp_min: response.main.temp_min,
          mainTemp_max: response.main.temp_max,
          name: response.name
        };
      }
    });
    this.setState(tmp);
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, openWheater.api.interval);
    this.tick();
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-7">
              <p className="city-name">{this.state.name}</p>
            </div>
            <div className="col-xs-5">
              <p className="main-temperature">{this.state.mainTemp}ºK</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p className="temperature">Temperature: {this.state.mainTemp_min}/{this.state.mainTemp_max}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p className="main">{this.state.weatherMain}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p>{this.state.weatherDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
