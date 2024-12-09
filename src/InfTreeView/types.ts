
export interface InfTreeViewProps {
    data: Array<{ [key: string]: any, expanded?: boolean }>,
    fields?: { id?: string, text?: string, children?: string },
    onNodeSelected?: (text: string) => void
}
export interface InfTreeViewMethods {
    expandAll: () => void;
    collapseAll: () => void;
    getJson: () => Object;
    updateSelectedNodeText: (text: string) => void;
}