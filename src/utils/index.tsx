export const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export const getMinDate = (items) => {
    const dates = items.map(item => new Date(item.start));
    return new Date(Math.min(...dates));
};

export const getMaxDate = (items) => {
    const dates = items.map(item => new Date(item.end));
    return new Date(Math.max(...dates));
};
