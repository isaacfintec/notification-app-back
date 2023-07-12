import STATUS_CODES from 'http-status-codes';
import { TExpressHandler } from '../../../../core/interfaces';
import SearchNotifications from '../../application/useCases/Search';

const SearchCtrllr: TExpressHandler = async (req, reply, next) => {
  try {
    const { query } = req;

    const searchNotifications = new SearchNotifications();
    const result = await searchNotifications.exec(query);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default SearchCtrllr;
