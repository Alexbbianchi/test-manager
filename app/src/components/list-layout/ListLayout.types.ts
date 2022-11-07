import { ColumnsType } from "antd/lib/table";

export interface ListLayoutProps {
    linkTo: string;
    dataSource: any[];
    loading: boolean;
    hiddenNewBtn?: boolean;
    colunas: ColumnsType<any>;
    onSearch: (value: any) => void; 
    draggableBodyRow: (value: any) => JSX.Element;
}