import cx from 'classnames';

import { ButtonProps } from '../types/Components';

import '../styles/button.scss';

export default function Button ({ isOutlined = false, ...props }: ButtonProps) {
	return (
		<button className={cx('button', { outlined: isOutlined })} {...props}>
			{props.title}
		</button>
	);
}