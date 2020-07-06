import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import './StylesOverwrite.css';
import { fetchData } from './api';

import covid19Image from './images/image.png';

class App extends React.Component {

    state = {
        data: {},
        country: ''
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {

        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country });
    }

    render() {

        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={covid19Image} alt="COVID-19" />
                <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-light bg-light justify-content-center`}>
                    <div>
                        <ul className={`${styles.navbarNav} navbar-nav`}>
                            <li className={`${styles.navbarItem} active`}>                            
                                <a className={`${styles.navbarLink} nav-link`} href="/">Cards</a>
                            </li>
                            <li className={`${styles.navbarItem}`}>
                                <a className={`${styles.navbarLink} nav-link`} href="/">Chart</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Cards data={data} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;