import { StatisticsDiagramAndTable } from 'components/Statistics/StatisticsDiagramAndTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStatisticsUserThunk } from 'redux/statistics/thunkStatictics';

import s from '../StatisticsPage/StatisticsPage.module.css';
const StatisticsPage = () => {
  const dispach = useDispatch();

  useEffect(() => {
    dispach(getStatisticsUserThunk());
    // eslint-disable-next-line
  }, []);

  return (
    <div className={s.statistics__container}>
      <StatisticsDiagramAndTable />
    </div>
  );
};

export default StatisticsPage;
