import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = () => {
	return <div className={classes.backdrop} />;
};
const Overlay = (props) => {
	return <div className={classes.overlay}>{props.children}</div>;
};

const Modal = (props) => {
	const portalElement = document.getElementById('overlay');
	return (
		<>
			{ReactDOM.createPortal(<Backdrop />, portalElement)}
			{ReactDOM.createPortal(
				<Overlay>{props.children}</Overlay>,
				portalElement
			)}
		</>
	);
};

export default Modal;
