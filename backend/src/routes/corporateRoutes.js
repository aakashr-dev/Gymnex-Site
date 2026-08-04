import express from 'express';
import { submitCorporateProposal, getCorporateProposals } from '../controllers/corporateController.js';

const router = express.Router();

router.post('/', submitCorporateProposal);
router.get('/', getCorporateProposals);

export default router;
