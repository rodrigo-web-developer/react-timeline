import { useEffect, useRef } from 'react';
import styles from './index.module.css';

export const Scrollable = ({ children }) => {

    const scrollableRef = useRef(null);
    
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    
    useEffect(() => {
        const scrollEl = scrollableRef.current;
        if (!scrollEl) return;

        const onMouseDown = (e) => {
            isDragging.current = true;
            startX.current = e.pageX - scrollEl.offsetLeft;
            scrollLeft.current = scrollEl.scrollLeft;
            scrollEl.style.cursor = 'grabbing';
        };

        const onMouseLeave = () => {
            isDragging.current = false;
            scrollEl.style.cursor = 'grab';
        };

        const onMouseUp = () => {
            isDragging.current = false;
            scrollEl.style.cursor = 'grab';
        };

        const onMouseMove = (e) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = e.pageX - scrollEl.offsetLeft;
            const walk = (x - startX.current) * 1; // scroll speed
            scrollEl.scrollLeft = scrollLeft.current - walk;
        };

        scrollEl.addEventListener('mousedown', onMouseDown);
        scrollEl.addEventListener('mouseleave', onMouseLeave);
        scrollEl.addEventListener('mouseup', onMouseUp);
        scrollEl.addEventListener('mousemove', onMouseMove);

        scrollEl.style.cursor = 'grab';

        return () => {
            scrollEl.removeEventListener('mousedown', onMouseDown);
            scrollEl.removeEventListener('mouseleave', onMouseLeave);
            scrollEl.removeEventListener('mouseup', onMouseUp);
            scrollEl.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div className={styles.horizontalScroll} ref={scrollableRef}>
            {children}
        </div>
    );
}
