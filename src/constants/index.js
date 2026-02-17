// Customer data
export const CUSTOMERS = [
    { id: 'C001', name: 'John Doe' },
    { id: 'C002', name: 'Jane Smith' },
    { id: 'C003', name: 'Mike Johnson' },
    { id: 'C004', name: 'Sarah Williams' },
    { id: 'C005', name: 'Robert Brown' },
    { id: 'C006', name: 'Emily Davis' },
    { id: 'C007', name: 'Michael Wilson' },
    { id: 'C008', name: 'Jessica Moore' },
    { id: 'C009', name: 'David Taylor' },
    { id: 'C010', name: 'Amanda Anderson' },
    { id: 'C011', name: 'James Martinez' },
    { id: 'C012', name: 'Lisa Jackson' },
    { id: 'C013', name: 'Christopher White' },
    { id: 'C014', name: 'Jennifer Harris' },
    { id: 'C015', name: 'Daniel Martin' },
    { id: 'C016', name: 'Ashley Thompson' },
    { id: 'C017', name: 'Joseph Garcia' },
    { id: 'C018', name: 'Karen Rodriguez' },
    { id: 'C019', name: 'Matthew Lee' },
    { id: 'C020', name: 'Nancy Perez' },
];

// Pagination config
export const PAGINATION_CONFIG = {
    PAGE_SIZE: 6,
    CUSTOMERS_PER_PAGE: 6,
};

// App messages
export const MESSAGES = {
    LOADING: 'Loading rewards data...',
    ERROR: 'Failed to load transactions',
    API_ERROR: 'API Error: Failed to fetch transactions',
};

// Points calculation rules
export const POINTS_RULES = {
    TIER_1_THRESHOLD: 100,
    TIER_1_MULTIPLIER: 2,
    TIER_2_THRESHOLD_MIN: 50,
    TIER_2_THRESHOLD_MAX: 100,
    TIER_2_MULTIPLIER: 1,
};

// Date format
export const DATE_FORMAT = Object.freeze({
    LOCALE: 'en-US',
    OPTIONS: Object.freeze({
        month: 'long',
        year: 'numeric',
    }),
});
