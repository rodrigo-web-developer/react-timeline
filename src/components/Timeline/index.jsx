import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.css';
import { formatDate, getMaxDate, getMinDate } from '../../utils';
import { assignLanes } from '../../assignLanes';

const Timeline = memo(({ items, onChangeName }) => {

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

    return (
        <div className={styles.rowsContainer} style={{
            minWidth: `${totalDays * 30}px` // put 100px for minimum date width 
        }}>
            <TimelineHeader items={items} min={minDate} max={maxDate} totalDays={totalDays} />
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
    );
});

export function TimelineHeader({ items, min, max, totalDays }) {

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
            current.setDate(current.getDate() + Math.max(1, Math.floor(totalDays / 10)));
        }
        return markers;
    }, [items]);

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

    const handleBlur = () => {
        setEditing(false);
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
                />
            ) : (
                <span>{item.name} #{item.id}</span>
            )}
        </div>
    </div>)
};

export default Timeline;
