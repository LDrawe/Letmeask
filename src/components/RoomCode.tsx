import ReactTooltip from 'react-tooltip';

import { RoomCodeProps } from '../types/Room';

import copy from '../assets/images/copy.svg';
import '../styles/roomcode.scss';

export default function RoomCode ({ code }: RoomCodeProps) {
	function copyCodeToClipBoard () {
		return navigator.clipboard.writeText(code);
	}

	return (
		<button onClick={copyCodeToClipBoard} className="room-code" data-tip="Copiar">
			<div className="wrapper">
				<img src={copy} alt="Copiar Código da sala" />
			</div>
			<span> Sala #{code}</span>
			<ReactTooltip />
		</button>
	);
}
