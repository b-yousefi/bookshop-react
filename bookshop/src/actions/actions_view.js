
export const VIEW_ACTIONS = { CHANGED: 'VIEWCHANGED' };


export function changeView(newView) {
    return {
        type: VIEW_ACTIONS.CHANGED,
        view: newView
    }
}