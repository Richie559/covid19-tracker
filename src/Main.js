import { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import {
	Card,
	CardContent,
	FormControl,
	MenuItem,
	Select,
} from '@material-ui/core';
import Table from './components/Table';
import { sortData, prettyPrintStat } from './util';
import numeral from 'numeral';
import LineGraph from './components/LineGraph';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components'

const Main = (props) => {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
	const [mapZoom, setMapZoom] = useState(3);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState('cases');
	useEffect(() => {
		const getData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((item) => ({
						name: item.country,
						value: item.countryInfo.iso2,
					}));
					const sortedData = sortData(data);
					setTableData(sortedData);
					setMapCountries(data);
					setCountries(countries);
				});
		};
		getData();
	}, []);

	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			.then((response) => response.json())
			.then((data) => setCountryInfo(data));
	}, []);
	const onCountryChange = async (e) => {
		const url =
			e.target.value === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${e.target.value}`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				//console.log(data)
				setCountry(e.target.value);
				setCountryInfo(data);
				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
				setMapZoom(4);
			});

		console.log(e.target);
		props.onCountry(e.target.value);
	};

	const BodyWrapper = styled.main`
	background-color: white;
	  display: flex;
	  justify-content: space-evenly;
	  padding: 20px;
	  width: 100vw;
	  height: 100vh;
  
	app__header{
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  margin-bottom: 20px;
	  
	}
	
	.app__left {
	  flex: 0.9;
	}
	
	.app__stats{
	  display: flex;
	  justify-content: space-between;
	}
	
	@media (max-width: 990px) {
	  .app{
		flex-direction: column;
	  }
	}
	`

	return (
		<BodyWrapper>
			<div className='app__left'>
				<div className='app__header'>
					<h1>COVID-19 tracker</h1>
					<FormControl className='app__dropdown'>
						<Select
							variant='outlined'
							value={country}
							onChange={onCountryChange}
						>
							<MenuItem value='worldwide'>Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className='app__stats'>
					<InfoBox
						onClick={(e) => setCasesType('cases')}
						title='Coronavirus Cases'
						active={casesType === 'cases'}
						cases={prettyPrintStat(countryInfo.cases)}
						total={numeral(countryInfo.todayCases).format('0.0a')}
					/>
					<InfoBox
						onClick={(e) => setCasesType('recovered')}
						title='Recovered'
						isGreen
						active={casesType === 'recovered'}
						cases={prettyPrintStat(countryInfo.recovered)}
						total={numeral(countryInfo.todayRecovered).format('0.0a')}
					/>
					<InfoBox
						onClick={(e) => setCasesType('deaths')}
						title='Deaths'
						active={casesType === 'deaths'}
						cases={prettyPrintStat(countryInfo.deaths)}
						total={numeral(countryInfo.todayDeath).format('0.0a')}
					/>
				</div>
				<Map
					countries={mapCountries}
					casesType={casesType}
					center={mapCenter}
					zoom={mapZoom}
				/>
			</div>
			<Card className='app__right'>
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
					
					<h3 style={{ marginTop: '25px' }}>World wide new {casesType}</h3>
					{/* <LineGraph casesType={casesType} /> */}
				</CardContent>
			</Card>
		</BodyWrapper>
	);
};

export default Main;
