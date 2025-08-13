import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Profile from "./Profile/Profile";
import AddItemModal from "./AddItemModal/AddItemModal";
import ItemModal from "./ItemModal/ItemModal";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal";
import api from "../utils/Api";
import * as auth from "../utils/auth";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { coordinates, apiKey, defaultClothingItems } from "../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnit";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: false,
    condition: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const navigate = useNavigate();


  const sortItemsByNewest = (items) => {
    return [...items].sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
  };
  
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const processedWeatherData = filterWeatherData(data);
        setWeatherData(processedWeatherData);
        return api.getItems();
      })
      .then((items) => {
        if (items && Array.isArray(items)) {
          const filteredItems = items.filter(item => {
            const imageUrl = item.imageUrl || item.link || '';
            return !imageUrl.includes('example.com');
          });
          
          if (filteredItems.length > 0) {
            setClothingItems(sortItemsByNewest(filteredItems));
          } else {
            setClothingItems(defaultClothingItems);
          }
        } else {
          setClothingItems(defaultClothingItems);
        }
      })
      .catch(() => {
        setClothingItems(defaultClothingItems);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    
    if (token) {
      auth.checkToken(token)
        .then((user) => {

          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error('App - Token check failed:', err);
          localStorage.removeItem('jwt');
          setCurrentUser(null);
          setIsLoggedIn(false);
          setClothingItems(defaultClothingItems);
        });
    } else {
      setClothingItems(defaultClothingItems);
    }
  }, []);

  const handleLogin = (token) => {
    // Use the token that was passed in directly - don't rely on localStorage

    
    if (token) {
      // Store token in localStorage for future use
      localStorage.setItem('jwt', token);
      
      // Use the token directly to check validity
      auth.checkToken(token)
        .then((user) => {

          setCurrentUser(user);
          setIsLoggedIn(true);
          
          return api.getItems();
        })
        .then((items) => {


          const filteredItems = items.filter(item => {
            const imageUrl = item.imageUrl || item.link || '';
            return !imageUrl.includes('example.com');
          });
          
          if (filteredItems.length === 0) {
            setClothingItems(defaultClothingItems);
          } else {
            setClothingItems(sortItemsByNewest(filteredItems));
          }
          
          setIsLoginModalOpen(false);
          // Use setTimeout to ensure state updates complete before navigation
          setTimeout(() => navigate('/profile'), 0);
        })
        .catch((err) => {
          console.error('Login check failed:', err);
          handleLogout();
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate('/');
    
    api.getItems()
      .then(items => {
        const filteredItems = items.filter(item => {
          const imageUrl = item.imageUrl || item.link || '';
          return !imageUrl.includes('example.com');
        });
        
        setClothingItems(sortItemsByNewest(filteredItems));
      })
      .catch(err => {
        console.error('Error fetching items after logout:', err);
      });
  };

  const handleLoginClick = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsEditProfileModalOpen(false);
    setActiveModal('');
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  
  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    api.updateProfile({ name, avatar })
      .then((updatedUser) => {
        // Update current user with the new data
        setCurrentUser(updatedUser);
        // Close the modal using the existing function
        setIsEditProfileModalOpen(false);
        closeActiveModal();
      })
      .catch((err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile. Please try again.');
      });
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);
  

  // Removed redundant useEffect that was fetching items unnecessarily when array length changed

  const handleCardLike = (cardId, isLiked) => {
    // Only process likes if user is logged in
    if (!isLoggedIn) return;
    
    // The API expects true to add a like, false to remove a like
    // But our isLiked is the current state, so we need to pass the opposite
    const shouldLike = !isLiked;
    

    
    api.changeLikeStatus(cardId, shouldLike)
      .then((updatedCard) => {

        
        // Update the card in the state immediately after successful API call
        setClothingItems((prevItems) => {
          return prevItems.map((c) => {
            if (c._id === updatedCard._id) {
              return updatedCard;
            }
            return c;
          });
        });
      })
      .catch((err) => {
        console.error('Error updating like status:', err);
      });
  };
  
  const openConfirmationModal = (card) => {
    setIsDeleteModalOpen(true);
    setCardToDelete(card);
  };

  const handleCardDelete = (card) => {
    api
      .deleteItem(card._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        );
        setIsDeleteModalOpen(false);
        setCardToDelete(null);
        closeActiveModal();
      })
      .catch((err) => {
        console.error('Error deleting item:', err);

        if (err.status === 403) {
          alert('You do not have permission to delete this item.');
        }
        setIsDeleteModalOpen(false);
        setCardToDelete(null);
        closeActiveModal();
      });
  };

  const handleAddItemModalSubmit = (name, imageUrl, weather) => {
    api
      .addItem({ name, imageUrl, weather })
      .then((res) => {
        const newItems = [res.data, ...clothingItems];
        setClothingItems(newItems);
        closeActiveModal();
      })
      .catch((err) => {
        console.error('Error adding item:', err);
        alert('Failed to add item. Please try again.');
      });
  };



  // Fetch weather data initially and when returning to home page
  useEffect(() => {
    // Create a flag to track if component is mounted
    let isMounted = true;
    
    getWeather(coordinates, apiKey)
      .then((data) => {
        // Only update state if component is still mounted
        if (isMounted) {
          const filterData = filterWeatherData(data);
          setWeatherData(filterData);
        }
      })
      .catch(() => {
        // Error handling for failed weather data fetch
      });
      
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  // We removed duplicate useEffect hook that was causing navigation issues
  // The necessary data fetching is handled in the other useEffect hook that depends on isLoggedIn and currentUser

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header 
              handleAddClick={isLoggedIn ? handleAddClick : handleLoginClick} 
              weatherData={weatherData} 
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              onLogin={handleLoginClick}
              onRegister={handleRegisterClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    isLoggedIn={isLoggedIn}
                    onLikeClick={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      weatherData={weatherData}
                      onSelectCard={handleCardClick}
                      onCardClick={handleCardClick}
                      onAddItem={handleAddClick}
                      onLogout={handleLogout}
                      onEditProfile={handleEditProfileClick}
                      isLoggedIn={isLoggedIn}
                      onLikeClick={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/debug-profile"
                element={
                  <div className="debug-container">
                    <h1>Debug Profile Page</h1>
                    <div>
                      <h2>Auth State:</h2>
                      <p>isLoggedIn: {isLoggedIn ? 'true' : 'false'}</p>
                      <p>JWT exists: {localStorage.getItem('jwt') ? 'true' : 'false'}</p>
                      <p>Current User: {currentUser ? JSON.stringify(currentUser) : 'null'}</p>
                    </div>
                    <button 
                      onClick={() => navigate('/profile')}
                      className="debug-button"
                    >
                      Go to Profile Page
                    </button>
                  </div>
                }
              />
            </Routes>

            <Footer />
          </div>
          
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onSubmit={handleAddItemModalSubmit}
          />
          
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={openConfirmationModal}
            isLoggedIn={isLoggedIn}
          />
          
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleCardDelete}
            card={cardToDelete}
          />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeAllModals}
            onSubmit={handleLogin}
            onRegisterClick={handleRegisterClick}
          />
          
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeAllModals}
            onSubmit={handleLogin}
            onLoginClick={handleLoginClick}
          />
          
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
            onSubmit={handleEditProfileSubmit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
