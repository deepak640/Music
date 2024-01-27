import React from 'react'
import css from './header.module.css'
const header = () => {
  return (
    <nav className={css.navbar}>
      <ul className={css.navlist}>
        <li className={css.navlinks}><a>Home</a></li>
        <li className={css.navlinks}><a>Playlist</a></li>
        <li className={css.navlinks}><a>Support</a></li>
        <li className={css.navlinks}><a>Login</a></li>
      </ul>
    </nav>
  )
}

export default header
