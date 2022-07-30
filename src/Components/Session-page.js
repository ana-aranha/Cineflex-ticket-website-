import { Home } from "./Home-page";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Bottom, OrangeButton } from "./Movie-page";

export default function SessionPage() {
	const { idSessao } = useParams();
	const [movieSeat, setMovieSeat] = useState([]);

	useEffect(() => {
		const requisicao = axios.get(
			`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao.slice(
				1,
			)}/seats`,
		);
		requisicao.then((resposta) => {
			setMovieSeat(resposta.data);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log(movieSeat);

	let seats = movieSeat.seats;

	return (
		<>
			{movieSeat.length === 0 ? (
				""
			) : (
				<>
					<Home>
						<h2>Selecione o(s) assento(s)</h2>
						<SeatStyle>
							{seats.map((item, index) => {
								return (
									<SeatOption
										colorSeat={item.isAvailable}
										key={`seatKey${index}`}
									>
										<p>{item.name}</p>
									</SeatOption>
								);
							})}
							<div>
								<Selected></Selected>
								<p>Selecionado</p>
							</div>
							<div>
								<SeatOption colorSeat={true}></SeatOption>
								<p>Disponível</p>
							</div>
							<div>
								<SeatOption colorSeat={false}></SeatOption>
								<p>Indisponível</p>
							</div>
						</SeatStyle>
						<OrangeButton>
							<p>Reservar assento(s)</p>
						</OrangeButton>
					</Home>
					<Bottom>
						<div>
							<img src={movieSeat.movie.posterURL} alt="movie" />
						</div>
						<TitleInfo>
							<p>{movieSeat.movie.title}</p>
							<p>
								{movieSeat.day.weekday} - {movieSeat.day.date}
							</p>
						</TitleInfo>
					</Bottom>
				</>
			)}
		</>
	);
}

const TitleInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const SeatStyle = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	gap: 2%;
	padding: 0 3vw;
	max-width: 670px;

	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 13px;
	}
`;

const SeatOption = styled.div`
	height: 7vw;
	max-height: 48px;
	width: 7vw;
	max-width: 48px;
	border-radius: 50px;
	border: 1px solid ${(props) => (props.colorSeat ? "#808f9d" : "#F7C52B")};
	background-color: ${(props) => (props.colorSeat ? `#c3cfd9` : `#FBE192`)};
	font-size: 12px;
	font-weight: 400;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 5%;
`;

const Selected = styled.div`
	height: 7vw;
	max-height: 48px;
	width: 7vw;
	max-width: 48px;
	border-radius: 50px;
	border: 1px solid #1aae9e;
	background-color: #8dd7cf;
	margin-bottom: 5%;
`;