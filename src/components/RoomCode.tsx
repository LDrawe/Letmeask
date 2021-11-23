import ReactTooltip from 'react-tooltip';
import Toast from 'react-hot-toast';

import { RoomCodeProps } from '../types/Room';

import copy from '../assets/images/copy.svg';

import '../styles/roomcode.scss';

export default function RoomCode ({ code }: RoomCodeProps) {
	function copyCodeToClipBoard () {
		navigator.clipboard.writeText(code);
		return Toast.success(t => (
			<span>
				Copiado para a <br/>Área de Transferência!
			<button onClick={() => Toast.dismiss(t.id)}>
				Fechar
			</button>
			</span>
		));
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
