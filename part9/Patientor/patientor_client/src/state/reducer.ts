import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_DETAIL_BY_ID";
      payload: Patient;
    }
  | {
      type: "ADD_ALL_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_NEW_ENTRY";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_PATIENT_DETAIL_BY_ID":
      return {
        ...state,
        patientDetail: action.payload,
      };
    case "ADD_ALL_DIAGNOSES":
      return {
        ...state,
        allDiagnoses: action.payload,
      };
    case "ADD_NEW_ENTRY":
      return {
        ...state,
        patientDetail: action.payload,
      };
    default:
      return state;
  }
};
