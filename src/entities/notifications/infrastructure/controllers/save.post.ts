import STATUS_CODES from 'http-status-codes';
import { TExpressHandler } from '../../../../core/interfaces';
import CreateManyNotifications from '../../application/useCases/CreateMany';

const SaveCtrllr: TExpressHandler = async (req, reply, next) => {
  try {
    const { body } = req;

    const createManyNotifications = new CreateManyNotifications();
    const result = await createManyNotifications.exec(body);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default SaveCtrllr;
