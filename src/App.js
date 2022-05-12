// import React, { useState } from 'react';
// import Main from './Main.js';
// import { Routes, Route, useNavigate, } from 'react-router-dom';
// import { countries } from './data/countries.js';
// import Test from './Test.js';

// function App() {
// 	//const [path, setPath] = useState('wordlwide');
// 	const [country, setCountry] = useState('worldwide');
// 	//const [countryName, setCountryName] = useState('');
// 	const navigate = useNavigate();

// 	const countryChangeHandler = (countryName) => {
// 		//setPath('/worldwide/' + countryName);
// 		setCountry(countryName);

// 		let myCountry = countries.find((c) => c.Code === countryName);
// 		setCountry(myCountry.Name);
// 		navigate('/worldwide/' + myCountry.Name);
// 	};

// 	return (
// 		<Routes>
// 			<Route
// 				path='/worldwide'
// 				element={<Main onCountry={countryChangeHandler} />}
// 			>
// 				<Route path={country} element={<Test />}></Route>
// 			</Route>
// 		</Routes>
// 	);
// }

// export default App;
import React, { useState } from "react";
import Main from "./Main.js";
import { Routes, Route, useNavigate } from "react-router-dom";

import { countries } from "./data/countries.js";

import Test from "./Test.js";

function App() {
  //const [path, setPath] = useState('wordlwide');
  const [country, setCountry] = useState("worldwide");
  //const [countryName, setCountryName] = useState('');

  const navigate = useNavigate();

  const countryChangeHandler = (countryName) => {
    //setPath('/worldwide/' + countryName);
    setCountry(countryName);

    let myCountry = countries.find((c) => c.Code === countryName);
    setCountry(myCountry.Name);
    navigate("/worldwide/" + myCountry.Name);
  };
  return (
    <Routes>
      <Route path="/" element={<Main onCountry={countryChangeHandler} />} />
      <Route
        path="/worldwide"
        element={<Main onCountry={countryChangeHandler} />}
      >
        <Route path={country} element={<Test />}></Route>
      </Route>
    </Routes>
  );
}
export default App;
