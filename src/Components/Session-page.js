import { Home } from "./Home-page";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import spinner from "./Assets/imgs/spinner.gif";
import {
	AssentoTemplade,
	LabelTemplade,
	FormTemplade,
	BottomTemplade,
} from "./Session-templades";

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

	let seats = movieSeat.seats;
	const [idsSelected, setIdsSelected] = useState([]);
	const [seatsSelected, setSeatsSelected] = useState([]);

	return (
		<>
			{movieSeat.length === 0 ? (
				<Home>
					<img src={spinner} alt="spinner" />
				</Home>
			) : (
				<>
					<Home>
						<h2>Selecione o(s) assento(s)</h2>
						<SeatStyle>
							{seats.map((item, index) => {
								return (
									<AssentoTemplade
										item={item}
										key={`seatKey${index}`}
										idsSelected={idsSelected}
										setIdsSelected={setIdsSelected}
										seatsSelected={seatsSelected}
										setSeatsSelected={setSeatsSelected}
									/>
								);
							})}
							<LabelTemplade />
						</SeatStyle>
						<FormTemplade
							idsSelected={idsSelected}
							seatsSelected={seatsSelected}
							movieSeat={movieSeat}
						/>
					</Home>
					<BottomTemplade movieSeat={movieSeat} />
				</>
			)}
		</>
	);
}

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
