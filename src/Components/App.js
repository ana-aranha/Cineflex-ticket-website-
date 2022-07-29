import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import GlobalStyle from "./GlobalStyle";
import Head from "./Head-page";
import HomePage from "./Home-page";
import MoviePage from "./Movie-page";

export default function App() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const requisicao = axios.get(
			"https://mock-api.driven.com.br/api/v7/cineflex/movies",
		);

		requisicao.then((resposta) => {
			setMovies(resposta.data);
		});
	}, []);

	return (
		<>
			<BrowserRouter>
				<GlobalStyle />
				<Head />
				<Routes>
					<Route path="/" element={<HomePage movies={movies} />} />
					<Route path="/sessoes/:idMovie" element={<MoviePage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
