const jwtSecret = process.env.SECRET || 'secret';

const LABOUR_WORK_STATUS = {
  PENDING: 'PENDING',
  INPROGRESS:'INPROGRESS',
  COMPLETED:"COMPLETED"
}
export {
  LABOUR_WORK_STATUS,
  jwtSecret,
};
