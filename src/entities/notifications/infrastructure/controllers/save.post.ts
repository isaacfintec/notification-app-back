import STATUS_CODES from 'http-status-codes';
import { TExpressHandler } from '../../../../core/interfaces';
import CreateFromMessageUseCase from '../../application/useCases/CreateFromMessage';

const SaveCtrllr: TExpressHandler = async (req, reply, next) => {
  try {
    const { body } = req;

    const createFromMessageUseCase = new CreateFromMessageUseCase();
    const result = await createFromMessageUseCase.exec(body);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default SaveCtrllr;
