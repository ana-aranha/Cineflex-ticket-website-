import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function HomePage() {
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
		<Home>
			<p>Selecione o Filme</p>
			{
				<Movies>
					{movies.map((item, index) => {
						return (
							<div key={index}>
								<Link to="/sessoes">
									<img src={item.posterURL} alt="movie" />
								</Link>
							</div>
						);
					})}
				</Movies>
			}{" "}
		</Home>
	);
}

export const Home = styled.div`
	margin-top: 70px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	p {
		font-size: 24px;
		margin: 40px 0;
		color: #293845;
	}
`;

const Movies = styled.div`
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	margin: 0 5%;

	div {
		box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
		width: 42%;
		height: 25%;
		padding: 8px;
		margin-bottom: 5%;
	}

	img {
		width: 100%;
		height: 100%;
	}
`;
