var openWheater = {
  api: {
    apikey: "eee758dd41fdd4b920b7593d41776493",
    city: "3871336",
    interval: 1000 * 10 * 60 // 10 minutes
  },
  url: function() {
    return "http://api.openweathermap.org/data/2.5/weather?id=" + this.api.city + "&appid=" + this.api.apikey
  }
};
