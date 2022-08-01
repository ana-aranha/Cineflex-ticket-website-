import { Home } from "./Home-page";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Bottom } from "./Movie-page";

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

	console.log(movieSeat, idsSelected);
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
									<AssentoTemplade
										item={item}
										key={`seatKey${index}`}
										idsSelected={idsSelected}
										setIdsSelected={setIdsSelected}
									/>
								);
							})}
							<LabelTemplade />
						</SeatStyle>
						<FormTemplade />
					</Home>
					<BottomTemplade movieSeat={movieSeat} />
				</>
			)}
		</>
	);
}

//Templades

function AssentoTemplade({ item, idsSelected, setIdsSelected }) {
	const [selected, setSelected] = useState(false);

	return (
		<SeatOption colorSeat={item.isAvailable} isSelected={selected}>
			<p
				onClick={() => {
					if (item.isAvailable === true && selected === false) {
						setSelected(!selected);
						let aux = [...idsSelected];
						aux.push(item.id);
						setIdsSelected(aux);
					} else if (item.isAvailable === true && selected === true) {
						setSelected(!selected);
						let aux = idsSelected.filter((el) => el !== item.id);
						setIdsSelected(aux);
					} else {
						alert("Esse assento não está disponível");
					}
				}}
			>
				{item.name}
			</p>
		</SeatOption>
	);
}

function LabelTemplade() {
	return (
		<>
			<div>
				<SeatOption colorSeat={true} isSelected={true}></SeatOption>
				<p>Selecionado</p>
			</div>
			<div>
				<SeatOption colorSeat={true} isSelected={false}></SeatOption>
				<p>Disponível</p>
			</div>
			<div>
				<SeatOption colorSeat={false}></SeatOption>
				<p>Indisponível</p>
			</div>
		</>
	);
}

function FormTemplade() {
	return (
		<Form>
			<p>Nome do comprador</p>
			<input type="text" />
			<p>CPF do comprador</p>
			<input type="number" />
			<Link to={"/sucesso"}>
				<button type="submit">Reservar assento(s)</button>
			</Link>
		</Form>
	);
}

function BottomTemplade({ movieSeat }) {
	return (
		<Bottom>
			<div>
				<img src={movieSeat.movie.posterURL} alt="movie" />
			</div>
			<TitleInfo>
				<p>{movieSeat.movie.title}</p>
				<p>
					{movieSeat.day.weekday} - {movieSeat.name}
				</p>
			</TitleInfo>
		</Bottom>
	);
}

//Styled components

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
	border: 1px solid
		${(props) => {
			if (props.colorSeat === true && props.isSelected === false) {
				return "#808f9d";
			} else if (props.colorSeat === false) {
				return "#F7C52B";
			} else if (props.colorSeat === true && props.isSelected === true) {
				return "#1aae9e";
			}
		}};
	background-color: ${(props) => {
		if (props.colorSeat === true && props.isSelected === false) {
			return "#c3cfd9";
		} else if (props.colorSeat === false) {
			return "#FBE192";
		} else if (props.colorSeat === true && props.isSelected === true) {
			return "#8dd7cf";
		}
	}};
	font-size: 12px;
	font-weight: 400;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 5%;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin: 40px 0;
	width: 100%;
	padding: 0 20px;

	input {
		margin: 10px 0;
		width: 80%;
		height: 40px;
	}

	button {
		width: 100%;
		height: 100%;
		border: none;
		background-color: #e8833a;
		color: #ffffff;
		border-radius: 3px;
		margin: 20px 5% 20px 0;
		padding: 8px 10px;
		font-size: 18px;
	}
`;
