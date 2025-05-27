import ClothesSection from "../../ClothesSection/ClothesSection";
import "./Profile.css";
import SideBar from "../../SideBar/SideBar";


function Profile({ clothingItems, weatherData, onCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sideBar">
        <SideBar 
          clothingItems={clothingItems}
          weatherData={weatherData}
          handleCardClick={onCardClick}
        />
      </section>
      <section className="profile__clothesSection">
        <ClothesSection 
          clothingItems={clothingItems}
          weatherData={weatherData}
          onCardClick={onCardClick}
        />
      </section>
    </div>
  );
}

export default Profile;
