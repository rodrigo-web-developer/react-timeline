import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.css';
import { formatDate, getMaxDate, getMinDate } from '../../utils';
import { assignLanes } from '../../assignLanes';

const Timeline = memo(({ items, onChangeName }) => {

    const [zoomIn, setZoomIn] = useState(0);

    const refTimeLine = useRef();

    const sortedItems = useMemo(() => {
        const parsedItems = [...items]
            .map(e => ({ ...e, start: new Date(e.start), end: new Date(e.end) }));
        parsedItems.sort((a, b) => a.start.getTime() - b.start.getTime());
        return parsedItems;
    }, [items]);

    const minDate = getMinDate(sortedItems);
    const maxDate = getMaxDate(sortedItems);
    const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const rows = assignLanes(sortedItems);

    const getItemPosition = (item) => {
        const startOffset = Math.ceil((item.start.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
        const duration = Math.ceil((item.end.getTime() - item.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const left = (startOffset / totalDays) * 100;
        const width = (duration / totalDays) * 100;
        return {
            left: `${left}%`,
            width: `${width}%`,
        };
    };

    useEffect(() => {
        // add simple zoomIn on mouse wheel with shift pressed
        const handleWheel = (event) => {
            if (event.shiftKey) {
                if (event.cancelable) event.preventDefault();
                event.stopPropagation();
                setZoomIn((prev) => Math.max(prev + (event.deltaY > 0 ? -1 : 1), 0));
                //get x where the whell occurs inside timeline component
                const wheelX = event.clientX - refTimeLine.current.getBoundingClientRect().left;
                // keeps focus on timeline day
                const timelineWidth = refTimeLine.current.clientWidth;
                const percentScroll = (wheelX / timelineWidth);
                setTimeout(() => {
                    const newPosition = percentScroll * refTimeLine.current.clientWidth;
                    refTimeLine.current.parentElement.scrollLeft = newPosition;
                }, 100);
            }
        };
        refTimeLine.current.addEventListener('wheel', handleWheel);
        return () => {
            refTimeLine.current?.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (<>

        <div className={styles.rowsContainer}
            id="timeline"
            ref={refTimeLine}
            style={{
                minWidth: `${totalDays * (30 * (1 + zoomIn))}px` // put 100px for minimum date width
            }}>
            <TimelineHeader zoom={zoomIn} items={items} min={minDate} max={maxDate} totalDays={totalDays} />
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                    {row.map((item) => {
                        const position = getItemPosition(item);
                        return (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                style={position}
                                formatDate={formatDate}
                                styles={styles}
                                onChangeName={(newName) => onChangeName(item.id, newName)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    </>
    );
});

export function TimelineHeader({ items, min, max, totalDays, zoom }) {

    const generateDateMarkers = useCallback(() => {
        const markers = [];
        const current = new Date(min);
        while (current <= max) {
            const offset = (current.getTime() - min.getTime()) / (1000 * 60 * 60 * 24);
            const left = (offset / totalDays) * 100;
            markers.push(
                <div
                    key={current.toISOString()}
                    className={styles.dateMarker}
                    style={{ left: `${left}%` }}
                >
                    <div className={styles.dateMarkerText}>
                        {formatDate(current)}
                    </div>
                </div>
            );
            current.setDate(current.getDate() + Math.max(1, Math.floor(totalDays / (10 * (1 + zoom)))));
        }
        return markers;
    }, [items, zoom]);

    return (
        <div className={styles.dateMarkersContainer}>
            {generateDateMarkers()}
        </div>
    );
}

// TimelineItem component separated for clarity
export function TimelineItem({ item, style, formatDate, styles, onChangeName }) {
    const [editing, setEditing] = useState(false);

    const itemRef = useRef();

    const handleDoubleClick = useCallback(() => setEditing(true), []);

    const handleBlur = (e) => {
        setEditing(false);
        onChangeName(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setEditing(false);
            onChangeName(e.target.value);
        }
    };

    useEffect(() => {
        itemRef.current.addEventListener('dblclick', handleDoubleClick);
        return () => {
            // add null propagation to not run error when the element disappears
            itemRef.current?.removeEventListener('dblclick', handleDoubleClick);
        };
    }, [handleDoubleClick])

    return (<div
        key={item.id}
        className={styles.timelineItem}
        style={{
            ...style,
            backgroundColor: item.color || 'var(--color-primary)',
        }}
        title={`${item.name}: ${formatDate(item.start)} - ${formatDate(item.end)}`}
    >
        <div className={styles.itemTitle} ref={itemRef}>
            {editing ? (
                <input
                    type="text"
                    defaultValue={item.name}
                    autoFocus
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={styles.inlineEditInput}
                    onMouseDown={e => e.stopPropagation()}
                />
            ) : (
                <span>{item.name} #{item.id}</span>
            )}
        </div>
    </div>)
};

export default Timeline;
