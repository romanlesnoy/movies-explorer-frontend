import React from "react";
import "./Techs.css";

function Techs() {
    return (
        <section className="techs">
            <h2 className="techs__heading">Технологии</h2>
            <div className="tech__content">
                <h3 className="techs__subheading">7 технологий</h3>
                <p className="techs__paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__list">
                    <li className="techs_item">HTML</li>
                    <li className="techs_item">CSS</li>
                    <li className="techs_item">JS</li>
                    <li className="techs_item">React</li>
                    <li className="techs_item">Git</li>
                    <li className="techs_item">Express.js</li>
                    <li className="techs_item">mongoDB</li>
                </ul>
            </div>
            
        </section>
    );
}

export default Techs;