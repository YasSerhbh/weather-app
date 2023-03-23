import React , {Component} from "react"
import Form from "./components/Form"
import Info from "./components/Info"


var key = "2c43c75b1a67fcaa0d19b3e65078fac4";

// https://api.openweathermap.org/data/2.5/weather?q={city}%2C{country}&appid={api}

class App extends Component {

    state = {
        temperature: "",
        country: "",
        city: "",
        humidity: '',
        description: "",
        error: ""
    }

    getLocation = async (e) => {
        e.preventDefault()
        var city = e.target.elements.city.value
        var api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        var data = await api.json()
        console.log(data)
        console.log(data.message)
        if (city && typeof data.message == 'undefined') {
        this.setState({
            temperature: data.main.temp,
            country: data.sys.country,
            city: data.name,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: ""
        })}else if (data.message === "city not found") {
            this.setState({
                temperature: "",
                country: "",
                city: "",
                humidity: '',
                description: "",
                error: data.message
            })
        }
        else {
            this.setState({
                temperature: "",
                country: "",
                city: "",
                humidity: '',
                description: "",
                error: "You Didn't Enter City"
            })
        }
    }


    render() {
  return (
    <div className="wrapper">
        <div className="form-container">
        <h2>Weather App</h2>
            <Form getlocation={this.getLocation} />
            <Info temperature={this.state.temperature} country={this.state.country} city={this.state.city} humidity={this.state.humidity} description={this.state.description} error={this.state.error} />
        </div>
    </div>
  );
    }
}

export default App;
