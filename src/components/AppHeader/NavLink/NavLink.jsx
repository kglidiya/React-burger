import linkStyles from "./link.module.css";


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
