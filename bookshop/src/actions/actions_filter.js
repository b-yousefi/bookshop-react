export const FILTER_ACTIONS = {
    SET: 'FILTER_SET', CLEAR: 'FILTER_CLEAR',
};

export function setFilter(publicationIds, categoryIds, authorIds) {
    return {
        type: FILTER_ACTIONS.SET,
        data: {
            publicationIds,
            categoryIds,
            authorIds
        }
    }
}

export function clearFilter() {
    return {
        type: FILTER_ACTIONS.CLEAR,
        data: {
            publicationIds: [],
            categoryIds: [],
            authorIds: []
        }
    }
}
