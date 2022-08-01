import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./Assets/GlobalStyle";
import Head from "./Head-page";
import HomePage from "./Home-page";
import MoviePage from "./Movie-page";
import SessionPage from "./Session-page";
import SucessPage from "./Sucess-page";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<GlobalStyle />
				<Head />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/sessoes/:idMovie" element={<MoviePage />} />
					<Route path="/assentos/:idSessao" element={<SessionPage />} />
					<Route path="/sucesso" element={<SucessPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
