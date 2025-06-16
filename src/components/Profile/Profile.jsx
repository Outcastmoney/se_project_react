import "./Profile.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ clothingItems, onCardClick, onAddItem, onLogout }) {
  console.log("Profile component rendering with items:", clothingItems);
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <div className="profile">
      <SideBar 
        onLogout={onLogout}
      />
      <ClothesSection
        clothingItems={clothingItems} 
        onCardClick={onCardClick}
        onAddItem={onAddItem}
      />
    </div>
  );
}

export default Profile;
