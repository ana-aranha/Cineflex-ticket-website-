import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ButtonStyle } from "./Session-templades";

export default function SucessPage() {
	const { state } = useLocation();
	return (
		<SucessStyle>
			<h3>Pedido feito com sucesso!</h3>
			<h4>Filme e Sessão</h4>
			<p>{state.title}</p>
			<p>
				{state.date} {state.hour}
			</p>
			<h4>Ingressos</h4>
			{state.seats.seatsSelected.map((el, index) => {
				return <p key={`seats${index}`}>Assento {el}</p>;
			})}
			<h4>Comprador</h4>
			<p>Nome: {state.buyer}</p>
			<p>CPF: {state.buyerCpf}</p>
			<ButtonStyle>
				<Link to="/">
					<button>Voltar para Home</button>
				</Link>
			</ButtonStyle>
		</SucessStyle>
	);
}

const SucessStyle = styled.div`
	margin-top: 100px;
	padding: 0 30px;

	a:link {
		text-decoration: none;
	}

	h3 {
		font-size: 24px;
		font-weight: 700;
		color: #247a6b;
		margin: 40px 0;
		text-align: center;
	}

	h4 {
		font-size: 24px;
		font-weight: 700;
		color: #293845;
		margin: 20px 0;
	}

	p {
		color: #293845;
		font-size: 22px;
		margin-top: 10px;
	}
`;
