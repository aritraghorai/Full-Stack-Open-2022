import { Field, Form, Formik } from "formik";
import { TextField, SelectField } from "../AddPatientModal/FormField";
// import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import { useStateValue } from "../state";
import { Diagnosis, Entries, Entry } from "../types";
import { Grid, Button } from "@material-ui/core";
import DiagnosisSelection from "./DiagnosisSelection";

export type EntryFromValue = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFromValue) => void;
  onCancel: () => void;
}
export type EntryOption = {
  value: string;
  label: string;
};

const entryOption: EntryOption[] = [
  { value: Entries.HealthCheck, label: "HealthCheck" },
  { value: Entries.Hospital, label: "Hospital" },
  { value: Entries.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

export default function AddNewEntryForm({ onSubmit, onCancel }: Props) {
  const [{ allDiagnoses }] = useStateValue();
  const OtherOption = (type: string) => {
    switch (type) {
      case Entries.HealthCheck:
        return (
          <Field
            label="HealthCheckRating"
            placeholder="Healthcheck rating"
            name="healthCheckRating"
            component={TextField}
          />
        );
      case Entries.Hospital:
        return (
          <>
            <Field
              label="Discharge Date"
              placeholder="Enter Dischage Date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Enter Dischage Criteria"
              name="discharge.criteria"
              component={TextField}
            />
          </>
        );
      case Entries.OccupationalHealthcare:
        return (
          <>
            <Field
              label="Employer name"
              placeholder="Enter Enpoyer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick levave Start Date"
              placeholder="Enter Stick Start Date"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick levave End Date"
              placeholder="Enter Stick End Date"
              name="sickLeave.endDate"
              component={TextField}
            />
          </>
        );
    }
  };

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.name = requiredError;
        }
        if (!values.description) {
          errors.ssn = requiredError;
        }
        if (!values.specialist) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.type) {
          errors.occupation = requiredError;
        }
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="EntryType" name="type" options={entryOption} />
            <Field
              label="Description"
              placeholder="Enter Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Enter specialist name"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(allDiagnoses as Diagnosis[])}
            />
            {OtherOption(values.type)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}
