import React from "react";
import css from './footer.module.css'
const Footer = () => {


  return (
    <div className={css.footerbasic}>
      <footer>
        <div className="social"><a href="/"><i className={css.icon}></i></a><a href="/"><i className={css.icon}></i></a>
          <a href="/"><i className={css.icon}></i></a>
          <a href="/"><i className={css.icon}></i></a>
        </div>
        <ul className={css.listinline}>
          <li className={css.item}><a href="/">Home</a></li>
          <li className={css.item}><a href="/">Services</a></li>
          <li className={css.item}><a href="/">About</a></li>
          <li className={css.item}><a href="/">Terms</a></li>
          <li className={css.item}><a href="/">Privacy Policy</a></li>
        </ul>
        <p className={css.copyright}>NEGI © 2024</p>
      </footer>
    </div>
  )
}



export default Footer
