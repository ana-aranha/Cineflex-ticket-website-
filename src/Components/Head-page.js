import styled from "styled-components";

export default function Head() {
	return (
		<HeaderPage>
			<h1>CINEFLEX</h1>
		</HeaderPage>
	);
}

const HeaderPage = styled.div`
	background-color: #c3cfd9;
	width: 100%;
	height: 67px;
	position: fixed;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weigth: 400;
	font-size: 34px;
	color: #e8833a;
`;
