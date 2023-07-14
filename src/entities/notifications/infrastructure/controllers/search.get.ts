import STATUS_CODES from 'http-status-codes';
import { TExpressHandler } from '../../../../core/interfaces';
import SearchLogsUseCase from '../../application/useCases/SearchLogs';

const SearchCtrllr: TExpressHandler = async (req, reply, next) => {
  try {
    const { query } = req;

    const searchLogsUseCase = new SearchLogsUseCase();
    const result = await searchLogsUseCase.exec(query);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default SearchCtrllr;
