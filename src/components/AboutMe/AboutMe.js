import React from "react";
import "./AboutMe.css";
import portfolioPhoto from "../../images/portfolioPhoto.jpg";

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__heading">Студент</h2>
            <div className="about-me__content">
                <div className="about-me__profile">
                    <h3 className="about-me__name">Роман</h3>
                    <p className="about-me__description">Веб-разработчик</p>
                    <p className="about-me__bio">
                        Проживаю в Ростове-на-Дону. Недавно закончил курс веб разработки Яндекса.
                        Сейчас нахожусь в поиске работы. В свободное время играю в
                        видеоигры, читаю книги по истории искусств.
                    </p>
                    <ul className="about-me__links-list">
                        {/* <li className="about-me_list-item">
                            <a className="about-me__link" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </li> */}
                        <li className="about-me_list-item">
                            <a
                                className="about-me__link"
                                href="https://github.com/romanlesnoy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
                <img
                    className="about-me__photo"
                    src={portfolioPhoto}
                    alt="Portfolio"
                />
            </div>
        </section>
    );
}

export default AboutMe;
