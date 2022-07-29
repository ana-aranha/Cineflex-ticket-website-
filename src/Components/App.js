import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Head from "./Head-page";
import HomePage from "./Home-page";
import MoviePage from "./Movie-page";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<GlobalStyle />
				<Head />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/sessoes" element={<MoviePage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
