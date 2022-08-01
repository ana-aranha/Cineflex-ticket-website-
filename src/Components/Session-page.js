import { Home } from "./Home-page";
import { useParams, useNavigate } from "react-router-dom";
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
	const [seatsSelected, setSeatsSelected] = useState([]);

	console.log(movieSeat, idsSelected, seatsSelected);
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

//Templades

function AssentoTemplade({
	item,
	idsSelected,
	setIdsSelected,
	seatsSelected,
	setSeatsSelected,
}) {
	const [selected, setSelected] = useState(false);

	return (
		<SeatOption
			colorSeat={item.isAvailable}
			isSelected={selected}
			onClick={() => {
				if (item.isAvailable === true && selected === false) {
					setSelected(!selected);
					let aux = [...idsSelected];
					aux.push(item.id);
					setIdsSelected(aux);
					let newAux = [...seatsSelected];
					newAux.push(item.name);
					setSeatsSelected(newAux);
				} else if (item.isAvailable === true && selected === true) {
					setSelected(!selected);
					let aux = idsSelected.filter((el) => el !== item.id);
					setIdsSelected(aux);
					let newAux = seatsSelected.filter((el) => el !== item.name);
					setSeatsSelected(newAux);
				} else {
					alert("Esse assento não está disponível");
				}
			}}
		>
			<p>{item.name}</p>
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

function FormTemplade({ idsSelected, seatsSelected, movieSeat }) {
	const [buyerName, setBuyerName] = useState("");
	const [cpf, setCpf] = useState("");
	const navigate = useNavigate();

	function defineBuyerInfo(event) {
		event.preventDefault();
		if (buyerName === "" || cpf === "") {
			alert("preencha seus dados corretamente");
		} else if (idsSelected.length === 0) {
			alert("Selecione pelo menos um assento");
		} else {
			console.log(buyerName, cpf, idsSelected);
			const requisicao = axios.post(
				"https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many",
				{
					ids: idsSelected,
					name: buyerName,
					cpf: cpf,
				},
			);
			requisicao.then(
				navigate("/sucesso", {
					state: {
						buyer: buyerName,
						seats: { seatsSelected },
						buyerCpf: cpf,
						title: movieSeat.movie.title,
						date: movieSeat.day.date,
						hour: movieSeat.name,
					},
				}),
			);
		}
	}

	return (
		<Form onSubmit={defineBuyerInfo}>
			<p>Nome do comprador</p>
			<input
				type="text"
				placeholder="Digite seu nome..."
				value={buyerName}
				onChange={(e) => setBuyerName(e.target.value)}
			/>
			<p>CPF do comprador</p>
			<input
				type="number"
				placeholder="Digite seu CPF..."
				value={cpf}
				onChange={(e) => setCpf(e.target.value)}
			/>
			<button type="submit">Reservar assento(s)</button>
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
	cursor: pointer;
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
