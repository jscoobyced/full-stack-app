import { useContext } from 'react';
import { AUTHOR, RELEASE_YEAR } from '../../../config/constants';
import { ServiceContext } from '../../../services/Context';
import dateUtil from '../../../utils/dateUtil';
import './footer.css';

export const Footer = () => {
  const currentYear = dateUtil.getCurrentDate().getFullYear();
  const { getTranslations } = useContext(ServiceContext);
  const translations = getTranslations();

  const copyrightYear = (currentYear === RELEASE_YEAR ? '' : `-${currentYear}`);
  const version = process.env.REACT_APP_VERSION;
  const copyright = <span>
    {translations.Copyright} &copy; {AUTHOR} - {RELEASE_YEAR}{copyrightYear} - {version}
  </span>

  return (
    <footer>
      {copyright}
    </footer>
  );
};
