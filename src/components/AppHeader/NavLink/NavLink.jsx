import linkStyles from "./link.module.css";
import PropTypes from 'prop-types';

const navLinkPropTypes = PropTypes.shape({
  value: PropTypes.PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  iconPrimary: PropTypes.elementType.isRequired,
  iconSecondary: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired
});

NavLink.propTypes = {
  props: PropTypes.objectOf(navLinkPropTypes.isRequired)
}

function NavLink(props) {
  return (
    <li className={linkStyles.container}
      onClick={() => {
        props.onClick(props.value)
      }}>
      {props.active === true ? props.iconPrimary : props.iconSecondary}
      <h3 className={props.active === true ?
        `text text_type_main-default ${linkStyles.title_active}`
        : `text text_type_main-default ${linkStyles.title}`} >
        {props.children}
      </h3>
    </li>
  );
}

export default NavLink;
