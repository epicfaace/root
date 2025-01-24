import { IFormState } from "../store/form/types";
import { IAdminState } from '../store/admin/types';
import { getApplicationList, getExportedApplications } from "src/store/admin/actions";
import { IBaseState } from "src/store/base/types";

export interface IReactTableState {
    page: number,
    pageSize: number,
    sorted: { id: string, desc: string }[] | any,
    filtered: { id: string, value: boolean }[]
}

export interface IAdminTableProps extends IAdminState {
    getApplicationList: (state: IReactTableState) => void
    changeApplicationStatus: (string) => void,
    getApplicationEmails: (state: IReactTableState) => void,
    getExportedApplications: (state: IReactTableState, columns?: IReactTableHeader[]) => void,
    setSelectedForm: (e: { id: string, name: string }) => void,
    editRow?: (endpoint: string, id: string, data: any) => Promise<any>,
    getExportedApplicationsCSV: (state: IReactTableState, columns: IReactTableHeader[], sheets?: boolean) => void,
    base: IBaseState,
    pages: any
}

export interface IStatsWrapperProps extends IAdminState {
    getApplicationStats: () => void,
}

export interface IStatsProps {
    applicationStats: { [x: string]: any };
}

export interface IBulkChangeProps extends IAdminState {
    performBulkChange: () => void,
    setBulkChangeStatus: (x: string) => void,
    setBulkChangeIds: (x: string) => void,
    userId: string
}

export interface IBulkCreateProps extends IAdminState {
    performBulkCreate: () => void,
    setBulkCreateGroup: (x: string) => void,
    setBulkCreateEmails: (x: string) => void,
    setBulkCreatePassword: (x: string) => void
}

export interface IBulkImportHacksProps extends IAdminState {
    performBulkImportHacks: () => void,
    setBulkImportHacks: (e: any) => void,
    setBulkImportHacksFloor: (e: number) => void
}

export interface ILiveNotificationsProps extends IAdminState {
    getLiveStats: () => void,
    sendNotification: () => void,
    setNotificationData: (data: {title: string, body: string}) => void,
}
export interface IReactTableHeader {
    Header?: string,
    id?: string,
    accessor: any
}