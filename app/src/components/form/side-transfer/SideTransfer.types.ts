import { TransferItem } from "antd/lib/transfer";

export interface SideTransferProps {
    dataSource: TransferItem[];
    name: string;
    disabled?: boolean;
    showSearch?: boolean;
    pagination?: boolean;
    label?: string;
    required?: boolean;
    style?: React.CSSProperties | undefined;
    renderItem: (value:any) => string;
    rowKey: (value:any) => string;
}