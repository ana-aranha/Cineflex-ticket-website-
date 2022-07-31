import { Home } from "./Home-page";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

export default function MoviePage() {
	const { idMovie } = useParams();
	const [movieSession, setMovieSession] = useState([]);

	useEffect(() => {
		const requisicao = axios.get(
			`https://mock-api.driven.com.br/api/v7/cineflex/movies/${idMovie.slice(
				1,
			)}/showtimes`,
		);
		requisicao.then((resposta) => {
			setMovieSession(resposta.data);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let days = movieSession.days;

	return (
		<>
			<Home>
				<h2>Selecione o horário</h2>
				{movieSession.length === 0
					? ""
					: days.map((item, index) => {
							return (
								<Session key={`session key${index}`}>
									<p>
										{item.weekday} - {item.date}
									</p>
									<div>
										{item.showtimes.map((time, index) => {
											return (
												<Link
													to={`/assentos/:${time.id}`}
													key={`hour key${index}`}
												>
													<OrangeButton AlignDiv={true}>
														{time.name}
													</OrangeButton>
												</Link>
											);
										})}
									</div>
								</Session>
							);
					  })}
			</Home>
			<Bottom>
				<div>
					<img src={movieSession.posterURL} alt="movie" />
				</div>
				<p>{movieSession.title}</p>
			</Bottom>
		</>
	);
}

export const Session = styled.div`
	font-size: 20px;
	display: flex;
	flex-direction: column;
	justify-content: left;
	width: 100%;
	padding: 0 25px;
	color: #293845;

	p {
		margin-bottom: 15px;
	}

	div {
		display: flex;
		margin-bottom: 10px;
		gap: 5%;
	}
`;

export const OrangeButton = styled.div`
	background-color: #e8833a;
	color: #ffffff;
	border-radius: 3px;
	padding: 8px 10px;
	font-size: 18px;
	min-width: 50px;
	display: flex;
	justify-content: center;
	margin: ${(props) => (props.AlignDiv ? "0" : "0 20vw")};

	span {
		color: #ffffff;
	}
`;

export const Bottom = styled.div`
	position: fixed;
	bottom: 0;
	background-color: #dfe6ed;
	width: 100%;
	min-height: 117px;
	padding: 14px 10px;
	border: 1px solid #9eadba;
	display: flex;
	justify-content: left;
	align-items: center;
	color: #293845;
	font-weight: 400;
	font-size: 26px;

	div:nth-child(1) {
		display: flex;
		flex-direction: collum;
		height: 89px;
		padding: 7px;
		margin-right: 20px;
		background-color: #ffffff;
	}
`;
