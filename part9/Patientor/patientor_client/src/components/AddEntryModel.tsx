import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import AddNewEntryForm, { EntryFromValue } from "./AddNewEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFromValue) => void;
  error?: string;
}

const AddEnryModel = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add New Entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        <AddNewEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEnryModel;
