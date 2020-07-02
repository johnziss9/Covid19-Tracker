import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import CoolTabs from 'react-cool-tabs';

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
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <CoolTabs 
                    leftContent={<Cards data={data} />}
	                rightContent={<Chart data={data} country={country} />}
                    style={{ width:  700, height:  700 }}
                    activeTabStyle={{ background:  'black', color: 'white', fontWeight: 'bold', textDecoration: 'underlined' }}
                    unActiveTabStyle={{ background:  'black', color: 'white' }}
                    activeLeftTabBorderBottomStyle={{ background:  'white', height:  4 }}
                    activeRightTabBorderBottomStyle={{ background:  'white', height:  4 }}
                    leftTabTitle={'Cards'}
                    rightTabTitle={'Chart'}
                    contentTransitionStyle={'transform 0.6s ease-in'}
                    borderTransitionStyle={'all 0.6s ease-in'}
                />
                {/* <Cards data={data} /> */}
                {/* <Chart data={data} country={country} /> */}
            </div>
        )
    }
}

export default App;