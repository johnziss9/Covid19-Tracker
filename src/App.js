import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import covid19Image from './images/image.png';

import cx from 'classnames';

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
                
                <nav className={cx(styles.navbar, "navbar navbar-expand-lg justify-content-center")}>
                    <div>
                        <ul className={cx(styles.navbarNav, "navbar-nav")}>
                            <li className={cx(styles.navbarItem, "nav-item")} onClick={this.handleCardsLink}>
                                <a className={cx(styles.navbarLink, "nav-link")} href="/">Cards</a>
                            </li>
                            <li className={cx(styles.navbarItem, "nav-item")} onClick={this.handleChartLink}>
                                <a className={cx(styles.navbarLink, "nav-link")} href="/">Chart</a>
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