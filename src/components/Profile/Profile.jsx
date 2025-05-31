import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, weatherData, onCardClick, onAddItem }) {
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
          onAddItem={onAddItem}
        />
      </section>
    </div>
  );
}

export default Profile;
