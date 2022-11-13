import linkStyles from "./NavLink.module.css";
import PropTypes from 'prop-types';
import { navLinkPropTypes } from '../../../utils/types';
import { Link} from 'react-router-dom';

NavLink.propTypes = {
  props: PropTypes.objectOf(navLinkPropTypes.isRequired)
}

function NavLink(props) {


  return (
    <Link to={props.to}
      className={linkStyles.link}
    >
      <li className={linkStyles.container}>
        {props.active === true ? props.iconPrimary : props.iconSecondary}
        <h3 className={props.active === true ?
          `text text_type_main-default ${linkStyles.title_active}`
          : `text text_type_main-default ${linkStyles.title}`}
        >
          {props.children}
        </h3>
      </li>

    </Link>

  );

}


export default NavLink;

