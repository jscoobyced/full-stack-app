import { AUTHOR, COPYRIGHT, RELEASE_YEAR } from '../../../config/constants';
import dateUtil from '../../../utils/dateUtil';
import './footer.css';

export const Footer = () => {
  const currentYear = dateUtil.getCurrentDate().getFullYear();

  const copyrightYear = (currentYear === RELEASE_YEAR ? '' : `-${currentYear}`);
  const version = process.env.REACT_APP_VERSION;
  const copyright = <span>
    {COPYRIGHT} &copy; {AUTHOR} - {RELEASE_YEAR}{copyrightYear} - {version}
  </span>

  return (
    <footer>
      {copyright}
      <img src='elephants.png' alt='Elephants couple'></img>
    </footer>
  );
};
