import { OrangeButton } from "./Movie-page";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SucessPage() {
	return (
		<SucessStyle>
			<h3>Pedido feito com sucesso!</h3>
			<h4>Filme e Sessão</h4>
			<p>Filme</p>
			<p>Data</p>
			<h4>Ingressos</h4>
			<p>Assento</p>
			<h4>Comprador</h4>
			<p>Nome:</p>
			<p>CPF</p>
			<Link to="/">
				<OrangeButton alignDiv={true}>
					<span>Voltar para Home</span>
				</OrangeButton>
			</Link>
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
		margin: 10px 0;
	}

	p {
		color: #293845;
		font-size: 22px;
		margin-top: 10px;
	}
`;
