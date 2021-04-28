import React from "react";
import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="about-project__heading">О проекте</h2>
            <div className="about-project__grid">
                <div>
                    <h3 className="about-project__subheading">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__paragraph">
                        Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div>
                    <h3 className="about-project__subheading">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__paragraph">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые
                        нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="about-project__progressbar">
                <p className="about-project__text about-project__green">1 неделя</p>
                <p className="about-project__text about-project__grey">4 недели</p>
                <span className="about-project__text">Back-end</span>
                <span className="about-project__text">Front-end</span>
            </div>
        </section>
    );
}

export default AboutProject;
