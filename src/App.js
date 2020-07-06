import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import './StylesOverwrite.css';
import { fetchData } from './api';

import covid19Image from './images/image.png';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.selectCards = this.selectCards.bind(this);
        this.selectChart = this.selectChart.bind(this);

        this.state = {
            data: {},
            country: '',
            activeCards: false,
            activeChart: false,
            showCards: false,
            showChart: false,
            hideCards: false,
            hideChart: false
        }
    }

    selectCards() {
        const activeCurrentState = this.state.activeCards;
        const currentHideChartState = this.state.hideChart;
        const currentShowCardsState = this.state.showCards;

        if (!activeCurrentState)
            this.setState({ activeCards: !activeCurrentState, 
                            activeChart: activeCurrentState, 
                            hideChart: !currentHideChartState, 
                            showCards: !currentShowCardsState,
                            showChart: currentHideChartState,
                            hideCards: currentShowCardsState 
                        });
    };

    selectChart() {
        const activeCurrentState = this.state.activeChart;
        const currentHideCardsState = this.state.hideCards;
        const currentShowChartState = this.state.showChart;

        if (!activeCurrentState)
            this.setState({ activeChart: !activeCurrentState, 
                            activeCards: activeCurrentState, 
                            hideCards: !currentHideCardsState, 
                            showChart: !currentShowChartState,
                            showCards: currentHideCardsState,
                            hideChart: currentShowChartState
                        });
    };

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });

        this.selectCards();
    }

    handleCountryChange = async (country) => {

        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country });
    }

    render() {

        const { data, country, showCards, hideCards, showChart, hideChart } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={covid19Image} alt="COVID-19" />
                <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-light bg-light justify-content-center`}>
                    <div>
                        <ul className={`${styles.navbarNav} navbar-nav`}>
                            <li onClick={this.selectCards} className={this.state.activeCards ? `${styles.navbarItem} active`: `${styles.navbarItem}`}>                            
                                <a className={`${styles.navbarLink} nav-link`} href="#">Cards</a>
                            </li>
                            <li onClick={this.selectChart} className={this.state.activeChart ? `${styles.navbarItem} active`: `${styles.navbarItem}`}>
                                <a className={`${styles.navbarLink} nav-link`} href="#">Chart</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                {hideChart && showCards && <Cards data={data} />}
                {hideCards && showChart && <Chart data={data} country={country} />}
            </div>
        )
    }
}

export default App;