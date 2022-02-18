import ReactTooltip from 'react-tooltip';
import Toast from 'react-hot-toast';
import { RoomCodeProps } from '../types/Room';

import copy from '../assets/images/copy.svg';

import '../styles/roomcode.scss';

export default function RoomCode ({ code }: RoomCodeProps) {
	function copyCodeToClipBoard () {
		navigator.clipboard.writeText(code);

		return Toast.success('Copiado para a Área de Transferência!', {
			style: {
				backgroundColor: 'var(--pure-white)',
				border: '1px solid var(--primary-color)',
				padding: '16px',
				color: 'var(--text)'
			}
		});
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
