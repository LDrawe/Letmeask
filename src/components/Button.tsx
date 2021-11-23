import { ButtonProps } from '../types/Components';

import '../styles/button.scss';

export default function Button ({ isOutlined = false, ...props }: ButtonProps) {
	return (
		<button className={`button ${isOutlined ? 'outlined' : ''}`} {...props}>
			{props.title}
		</button>
	);
}