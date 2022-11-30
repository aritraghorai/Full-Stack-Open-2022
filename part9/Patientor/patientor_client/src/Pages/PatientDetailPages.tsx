import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import MaleIcon from "@mui/icons-material/Male";
import { Diagnosis, Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetail from "../components/EtriesDetail";
import AddEnryModel from "../components/AddEntryModel";
import { EntryFromValue } from "../components/AddNewEntryForm";
import { Button } from "@material-ui/core";

// type ServerForm = Omit<Entry, "id">;
export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetail }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitNewEntry = async (data: EntryFromValue) => {
    try {
      console.log(data);

      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        data
      );
      dispatch({
        type: "ADD_NEW_ENTRY",
        payload: newPatient,
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id as string}`
        );
        const { data: diagnosesDetail } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch({
          type: "ADD_PATIENT_DETAIL_BY_ID",
          payload: patientListFromApi,
        });
        dispatch({
          type: "ADD_ALL_DIAGNOSES",
          payload: diagnosesDetail,
        });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);
  return patientDetail ? (
    <div>
      <h2>
        {patientDetail.name}{" "}
        {patientDetail.gender == "male" ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <p>ssh:{patientDetail.ssn}</p>
      <p>occupation:{patientDetail.occupation}</p>

      <div>
        <h3>Entries</h3>
        {patientDetail.entries?.map((enti) => (
          <EntryDetail key={enti.id} entry={enti} />
        ))}
      </div>
      <div>
        <AddEnryModel
          modalOpen={modalOpen}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
