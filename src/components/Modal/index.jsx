import styles from "./index.module.css";

export default function Modal({ isOpen, onClose, children, title }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2 className={styles.title}>{title}</h2>
                <span className={styles.close} onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
}
