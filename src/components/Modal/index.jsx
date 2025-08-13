import styles from "./index.module.css";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
}
