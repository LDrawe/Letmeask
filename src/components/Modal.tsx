import ReactModal from 'react-modal';

import xCircle from '../assets/images/x-circle.svg';
import trashimg from '../assets/images/trash.svg';

import { ModalProps } from '../types/Components';

import '../styles/modal.scss';

export default function Modal ({
    title = 'Excluir',
    subTitle,
    buttonLabel = 'Sim, excluir',
    image = 'x-circle',
    callback,
    closeModal,
    ...rest
}: ModalProps) {
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        content: {
            backgroundColor: 'var(--pure-white)',
            border: 0,
            borderRadius: 10,
            maxWidth: '590px',
            maxHeight: '362px',
            margin: 'auto',
            padding: 0
        }
    };

    return (
        <ReactModal style={customStyles} {...rest} >
            <div className="modal-content">
                <img src={image === 'trash' ? trashimg : xCircle} alt="Excluir" height={40} />
                <h2>
                    {title}
                </h2>
                <p>
                    {subTitle}
                </p>
                <div>
                    <button onClick={closeModal}>
                        Cancelar
                    </button>
                    <button onClick={callback}>
                        Sim, excluir
                    </button>
                </div>
            </div>
        </ReactModal>
    );
}
