import SecDeals from "./SecDeals";
import SecRecentNews from "./SecRecentNews";
import SecRecentReviews from "./SecRecentReviews";
import SecUpcoming from "./SecUpcoming";
//Styles
import "./HomePage.css";

export default function HomePage(){
    return (
        <section className="app-page">
            <div className="home-hero">
                <SecRecentReviews/>
                <SecRecentNews/>
                <SecUpcoming/>
                <SecDeals/>
            </div>
            
        </section>
    )
}
