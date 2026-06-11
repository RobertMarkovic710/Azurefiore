import "./Reviews.css";
import { reviews } from "../../data/reviews";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Reviews() {
    return (
        <section className="reviews" id="reviews">
            <div className="reviews-header">
                <span className="reviews-eyebrow">
                    Iskustva vlasnika
                </span>

                <h2 className="reviews-title">
                    Priče iz novih domova
                </h2>

                <p className="reviews-subtitle">
                    Pogledajte kako su se naši Ragdoll mačići uklopili u svoje nove obitelji.
                </p>

                <p className="reviews-swipe-hint">
                    Povucite u stranu za više iskustava
                </p>
            </div>

            <div className="reviews-container">
                {reviews.map((r, i) => (
                    <article className="review-card" key={i}>
                        <div className="review-image">
                            <img
                                src={r.image}
                                alt={r.name}
                                loading="lazy"
                                decoding="async"
                            />

                            <span className="cat-name">
                                {r.name}
                            </span>
                        </div>

                        <p className="review-text">
                            “{r.text}”
                        </p>

                        <div className="review-footer">
                            <span>{r.owner}</span>

                            <span className="review-location">
                                <FaMapMarkerAlt className="location-icon" />
                                {r.city}
                            </span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}