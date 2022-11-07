import JoditEditor from "jodit-react";

export interface TextEditorProps {
    name: string;
    label?: string;
    itensButtons?: ItensButtons;
    required?: boolean;
    clearBorder?: boolean;
    ref?: React.LegacyRef<JoditEditor> | undefined;
    personConfig?: any;
    // https://xdsoft.net/jodit/doc/
}


export enum ItensButtons {
    COMPLETE,
    SIMPLE,
    EMPTY
}

export const completeButtons = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'eraser',
    '|',
    'superscript',
    'subscript',
    '|',
    'ul',
    'ol',
    '|',
    'indent',
    'outdent',
    'left',
    '|',
    'font',
    'fontsize',
    // 'paragraph', 
    // 'classSpan', 
    '|',
    'brush',
    '|',
    'image',
    // 'video',
    // 'file',
    '|',
    // '\n',
    // 'copyformat',
    // 'cut',
    // 'copy',
    // 'paste',
    // 'selectall',
    '|',
    'hr',
    'table',
    'link',
    'symbol',
    '|',
    'undo',
    'redo',
    '|',
    // 'find',
    // '|',
    // 'source',
    // 'fullsize',
    'preview',
    // 'print',
    // '|',
    // 'about',
];

export const simpleButtons = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'ul',
    'ol',
    '|',
    'image',
    '|',
    'table',
    'link',
    '|',
    'undo',
    'redo',
]