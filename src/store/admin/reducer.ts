import { IAdminState } from "./types";
import { Reducer } from 'redux';

const initialState: IAdminState = {
  applicationList: [],
  pages: null,
  applicationStats: null,
  liveStats: null,
  liveNotification: {
    title: "",
    body: ""
  },
  selectedForm: null,
  applicationEmails: null,
  exportedApplications: null,
  bulkChange: {
    status: "",
    ids: ""
  },
  bulkCreate: {
    group: "",
    emails: "",
    password: ""
  },
  bulkImportHacks: "",
  bulkImportHacksFloor: null
};

const admin: Reducer<any> = (state: any = initialState, action): any => {
  switch (action.type) {
    case "SET_APPLICATION_LIST":
      return {
        ...state,
        applicationList: action.applicationList,
        pages: action.pages
      };
    case "SET_APPLICATION_EMAILS":
      return {
        ...state,
        applicationEmails: action.applicationEmails
      };
    case "SET_EXPORTED_APPLICATIONS":
      return {
        ...state,
        exportedApplications: action.exportedApplications
      };
    case "SET_SELECTED_FORM":
      return {
        ...state,
        selectedForm: action.selectedForm
      };
    case "SET_APPLICATION_STATS":
      return {
        ...state,
        applicationStats: action.applicationStats
      };
    case "SET_LIVE_STATS":
      return {
        ...state,
        liveStats: action.liveStats
      };
    case "SET_LIVE_NOTIFICATION_DATA":
      return {
        ...state,
        liveNotification: action.data
      };
    case "SET_BULK_CHANGE_STATUS":
      return {
        ...state,
        bulkChange: {
          ...state.bulkChange,
          status: action.status
        }
      };
    case "SET_BULK_CHANGE_IDS":
      return {
        ...state,
        bulkChange: {
          ...state.bulkChange,
          ids: action.ids
        }
      };
    case "SET_BULK_CREATE_GROUP":
      return {
        ...state,
        bulkCreate: {
          ...state.bulkCreate,
          group: action.group
        }
      };
    case "SET_BULK_CREATE_EMAILS":
      return {
        ...state,
        bulkCreate: {
          ...state.bulkCreate,
          emails: action.emails
        }
      };
      case "SET_BULK_CREATE_PASSWORD":
      return {
        ...state,
        bulkCreate: {
          ...state.bulkCreate,
          password: action.password
        }
      };
    case "SET_BULK_IMPORT_HACKS":
      return {
        ...state,
        bulkImportHacks: action.bulkImportHacks
      };
    case "SET_BULK_IMPORT_HACKS_FLOOR":
      return {
        ...state,
        bulkImportHacksFloor: action.bulkImportHacksFloor
      };
    default:
      return state;
  }
};

export default admin;