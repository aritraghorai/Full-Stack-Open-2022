import express from 'express';
import EntriesService from '../Services/Entries.service';

const router = express.Router({ mergeParams: true });

router.post('/', EntriesService.addNewEntry);

export default router;
