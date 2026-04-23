import "./Reviews.css";
import { reviews } from "../../data/reviews"; 
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Reviews() {
    return(
        <section className="reviews" id="reviews">

            <h2 className="reviews-title">
                Priče iz novih domova
            </h2>

            <div className="reviews-container">

                {reviews.map((r, i) => (
                    <div className="review-card" key={i}>

                        <div className="review-image">
                            <img src={r.image} alt={r.name} />
                            <span className="cat-name">{r.name}</span>
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
                    </div>
                ))}

                
            </div>
        </section>
    )
} 