import { enableRipple } from '@syncfusion/ej2-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { InfTreeViewProps, InfTreeViewMethods } from './types';
import { useImperativeHandle, forwardRef, useRef } from 'react';

import './index.css'
import { v4 as uuidv4 } from 'uuid';
enableRipple(true);
const InfTreeView = forwardRef<InfTreeViewMethods, InfTreeViewProps>((props: InfTreeViewProps, ref) => {

    const selectedNodeId = useRef("");
    const fields = {
        dataSource: props.data || [],
        id: props.fields?.id || 'id',
        text: props.fields?.text || 'name',
        child: props.fields?.children || 'children',
    };

    let treeRef: TreeViewComponent;
    useImperativeHandle(ref, () => ({
        expandAll: () => treeRef?.expandAll(),
        collapseAll: () => treeRef?.collapseAll(),
        getJson: () => treeRef?.getTreeData(),
        updateSelectedNodeText: (text: string) => treeRef?.updateNode(selectedNodeId.current, text),
    }));


 
    const nodeTemplate = (data: any) => {
        return (
            <div className='nodeContainer' key={data[fields.id]}>
                <span>{data[fields.text]}</span>
                <button className={'plusButton'} onClick={() => {
                    const newNode: any = {};
                    newNode[fields.id] = uuidv4();
                    newNode[fields.text] = "nome";
                    treeRef?.addNodes([newNode], data.id);
                }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0  0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                </button>

                <button className='plusButton' onClick={() => treeRef?.removeNodes([data.id])}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" /></svg>
                </button>
            </div>
        );
    };



    return (
        <TreeViewComponent
            fields={fields}
            allowEditing={false}
            nodeTemplate={nodeTemplate}
            ref={(tree: TreeViewComponent) => { treeRef = tree; }}
            nodeClicked={(args) => {
                const id = args.node.dataset.uid;
                selectedNodeId.current = id;
                if(props.onNodeSelected) {
                    props.onNodeSelected(args.event.target.innerText)
                }
            }}
        />
    );
})

export default InfTreeView;
