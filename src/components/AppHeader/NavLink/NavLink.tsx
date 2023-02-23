import { FC, ReactNode } from 'react';
import linkStyles from "./NavLink.module.css";
import { Link } from 'react-router-dom';


interface INavLinkProps {
  to: { pathname: string },
  active: boolean,
  iconPrimary: ReactNode,
  iconSecondary: ReactNode,
  children: string
}


const NavLink: FC<INavLinkProps> = (props: INavLinkProps) => {

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

