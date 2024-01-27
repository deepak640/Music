import css from './landingpage.module.css'
import band from '../images/band.png'
import Card from '../cards/Card'
const landingpage = () => {
    const details = [
        {
            id: 1,
            name: "John Doe",
            position: "Music Enthusiast",
            comment: "This music player is a game-changer! The seamless experience and vast music library make it my go-to platform for enjoying music.",
        },
        {
            id: 2,
            name: "Jane Smith",
            position: "Tech Geek",
            comment: "As someone who appreciates good design and functionality, this music player exceeded my expectations. It's not just a player; it's an experience!",
        },
        {
            id: 3,
            name: "Alex Johnson",
            position: "Casual Listener",
            comment: "I'm not a tech-savvy person, but this music player made it easy for me to discover and play my favorite songs. Simple, yet powerful!",
        },
    ];

    return (
        <>
        <main className={css.main}>
         <div className={css.textbox}>
             <h1>Music for everyone</h1>
             <p className={css.subtitle}>Music, once admitted to the soul,<br /> becomes a sort of spirit,and never dies  Ready? Let’s play.</p>
            <a className={css.button} href="/Home">
             <span></span>
             <span></span>
             <span></span>
             <span></span>
             Get Started
            </a>
         </div>
         <div className={css.imgcontainer}>
            <img src={band}/>
         </div>
        </main>
        <section className={css.testimonial}>
        <h1 className={css.heading}>Testimonial</h1>
        <Card data={details}/>
        </section>
        </>
    )
}

export default landingpage
