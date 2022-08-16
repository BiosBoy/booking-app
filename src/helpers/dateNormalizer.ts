import { format } from 'date-fns';

const dateNormalizer = (date: Date): string => format(date, 'MM/dd/yyyy');

export default dateNormalizer;