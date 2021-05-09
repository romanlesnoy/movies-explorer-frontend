import React from "react";
import "./AboutMe.css";
import portfolioPhoto from "../../images/portfolioPhoto.png"

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__heading">Студент</h2>
            <div className="about-me__content">
                <div className="about-me__profile">
                    <h3 className="about-me__name">Виталий</h3>
                    <p className="about-me__description">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__bio">
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. 
                        У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
                        Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
                        После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <ul className="about-me__links-list">
                        <li className="about-me_list-item">
                            <a className="about-me__link" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </li>
                        <li className="about-me_list-item">
                            <a className="about-me__link" href="https://github.com/" target="_blank" rel="noopener noreferrer">Github</a>
                        </li>
                    </ul>
                </div>
                <img className="about-me__photo" src={portfolioPhoto} alt="Portfolio"/>
            </div>
        </section>
    );
}

export default AboutMe;