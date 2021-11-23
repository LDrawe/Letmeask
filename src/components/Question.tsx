import cx from 'classnames';

import { QuestionProps } from '../types/Components';

import '../styles/question.scss';

export default function Question ({
	content,
	author,
	isAnswered = false,
	isHighLighted = false,
	children
}: QuestionProps) {
	return (
		<div className={cx('question',
			{ answered: isAnswered },
			{ highlighted: isHighLighted && !isAnswered }
		)}>
			<p>
				{content}
			</p>
			<footer>
				<div className="user-info">
					<img src={author.avatar} alt={author.name} />
					<span>
						{author.name}
					</span>
				</div>
				<div>
					{children}
				</div>
			</footer>
		</div>
	);
}
