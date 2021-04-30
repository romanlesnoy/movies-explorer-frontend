import React from "react";
import "./Portfolio.css";

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__heading">Портфолио</h2>
            <ul className="portfolio__links-list">
                <li className="portfolio_list-item">
                    <a className="portfolio__link" href="#">
                        <button
                            className="portfolio__link-button"
                            type="button"
                            aria-label="Link Button"
                        >
                            Статичный сайт
                            <svg
                                className="portfolio__link-icon"
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                            >
                                <path
                                    d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </a>
                </li>
                <li className="portfolio_list-item">
                    <a className="portfolio__link" href="#">
                        <button
                            className="portfolio__link-button"
                            type="button"
                            aria-label="Link Button"
                        >
                            Адаптивный сайт
                            <svg
                                className="portfolio__link-icon"
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                            >
                                <path
                                    d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </a>
                </li>
                <li className="portfolio_list-item">
                    <a className="portfolio__link" href="#">
                        <button
                            className="portfolio__link-button"
                            type="button"
                            aria-label="Link Button"
                        >
                            Одностраничное приложение
                            <svg
                                className="portfolio__link-icon"
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                            >
                                <path
                                    d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
