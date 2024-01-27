// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './cards.module.css'
import Person from '../../assets/Person.png'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './Swiper.css'

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const Card = ({ data }) => {
    return (
        <>
            <div className={css.container}>
                {
                    data.map((data,i) => {
                        return (
                            <div className={css.card} key={i}>
                            <img src={Person} width="100" alt="" />
                                <p className={css.comment}><span className={css.mark}>&ldquo;</span>{data.comment}<span className={css.mark}>&rdquo;</span></p>
                                <h1 className={css.name}>{data.name} - {data.position}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Card



{/* <Swiper pagination={true}
    modules={[Pagination,Autoplay]}
    className="mySwiper"
    spaceBetween={30}
    slidesPerView={1}
    autoplay={{ delay: 5000 }}>
    {
        data.map((data, m) => {
            return <SwiperSlide key={m}>
                <h1 className={css.name}>{data.name}</h1>
                <p className={css.comment}>"{data.comment}"</p>
                <p className={css.position}>({data.position})</p>
            </SwiperSlide>
        })
    }
</Swiper> */}
