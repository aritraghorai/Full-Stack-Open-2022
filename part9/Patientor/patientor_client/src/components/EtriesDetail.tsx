import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
// import { useStateValue } from "../state";
import { Entry } from "../types";
import WorkIcon from "@mui/icons-material/Work";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

interface propType {
  entry: Entry;
}

export default function EntryDetail({ entry }: propType) {
  // const [{ allDiagnoses }] = useStateValue();
  return (
    <div>
      <Card style={{ marginBottom: "1rem" }}>
        <CardActionArea>
          <CardContent>
            <Typography>
              {entry.date}{" "}
              {entry.type == "OccupationalHealthcare" ? (
                <WorkIcon />
              ) : (
                <MedicalInformationIcon />
              )}
            </Typography>
            <Typography gutterBottom variant="body2" component="h2">
              {entry.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              By {entry.specialist}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
