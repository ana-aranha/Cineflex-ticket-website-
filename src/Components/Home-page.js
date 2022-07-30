import { Link } from "react-router-dom";
import styled from "styled-components";

export default function HomePage({ movies }) {
	return (
		<Home>
			<h2>Selecione o Filme</h2>
			{
				<Movies>
					{movies.map((item, index) => {
						const idMovie = `/sessoes/:${item.id}`;
						return (
							<div key={index}>
								<Link to={idMovie}>
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

	h2 {
		font-size: 24px;
		margin: 40px 0;
		color: #293845;
	}

	a:link {
		text-decoration: none;
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
		max-width: 360px;
		height: 25%;
		padding: 8px;
		margin-bottom: 5%;
	}

	img {
		width: 100%;
		height: 100%;
	}
`;
