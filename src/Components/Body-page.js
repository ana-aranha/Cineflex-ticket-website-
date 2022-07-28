import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

export default function BodyPage() {
	const requisicao = axios.get(
		"https://mock-api.driven.com.br/api/v5/cineflex/movies",
	);

	requisicao.then((resposta) => {
		console.log(resposta.data);
	});

	return (
		<Body>
			<p>Selecione o Filme</p>
		</Body>
	);
}

const Body = styled.div`
	margin-top: 70px;
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		font-size: 24px;
		margin: 40px 0;
		color: #293845;
	}
`;

const Movies = styled.div`
	flex-direction: row;
	flex-wrap: wrap;
`;
