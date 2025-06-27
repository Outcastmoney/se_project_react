import "./Profile.css";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ clothingItems, weatherData, onCardClick, onAddItem, onLogout, onEditProfile, isLoggedIn, onLikeClick }) {
  console.log("Profile component rendering with:", {
    itemCount: Array.isArray(clothingItems) ? clothingItems.length : 'Not an array',
    items: clothingItems,
    hasWeatherData: !!weatherData
  });
  
  const currentUser = useContext(CurrentUserContext);
  
  const userClothingItems = Array.isArray(clothingItems) ? 
    clothingItems.filter(item => item.owner === currentUser._id) : 
    [];
  
  useEffect(() => {
    console.log("Profile auth status:", {
      isLoggedIn: !!currentUser,
      userData: currentUser,
      hasToken: !!localStorage.getItem('jwt')
    });
  }, [currentUser]);

  if (!currentUser) {
    console.warn("Profile access attempted without valid user");
    return (
      <div style={{padding: '40px', textAlign: 'center', color: '#FF4B4B'}}>
        <h3>Authentication Required</h3>
        <p>You must be logged in to view your profile.</p>
        <p>Please check your login credentials and try again.</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <SideBar 
        onLogout={onLogout}
        onEditProfile={onEditProfile}
        currentUser={currentUser}
      />
      <ClothesSection
        clothingItems={userClothingItems}
        weatherData={weatherData}
        onCardClick={onCardClick}
        onAddItem={onAddItem}
        isLoggedIn={isLoggedIn}
        onLikeClick={onLikeClick}
      />
    </div>
  );
}

export default Profile;
