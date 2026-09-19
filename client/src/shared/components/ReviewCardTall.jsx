import {EightPointStarIcon} from "../assets/AppSvgs"

export default function ReviewCardTall({reviewCoverUrl, reviewName, reviewType, rating}){
    return(
        <div className="reviewcard-tall">
            <img src={reviewCoverUrl} alt={reviewName + " cover art"}/>
            <div className="reviewcard-info">
                <div className="reviewcard-review">
                   <EightPointStarIcon/>
                   <p> {rating}/10</p>
                </div>
                <h3 className="reviewcard-name">{reviewName}</h3>
                <p className="reviewcard-type">#{reviewType}</p>
                <button className="reviewcard-btn">Review</button>
            </div>
        </div>
    )
}