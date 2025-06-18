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


  useEffect(() => {
    const token = localStorage.getItem('jwt');
    console.log('App - Token exists:', !!token);
    
    if (token) {
      auth.checkToken(token)
        .then((user) => {
          console.log('App - Token valid, user data:', user);
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
    // Use the token that was passed in, or get it from localStorage if not provided
    const authToken = token || localStorage.getItem('jwt');
    console.log('handleLogin called, token exists:', !!authToken);
    
    if (authToken) {
      auth.checkToken(authToken)
        .then((user) => {
          console.log('Login successful, user data:', user);
          setCurrentUser(user);
          setIsLoggedIn(true);
          
          return api.getItems();
        })
        .then((items) => {
          console.log('Got items after login:', items);

          const filteredItems = items.filter(item => {
            const imageUrl = item.imageUrl || item.link || '';
            return !imageUrl.includes('example.com');
          });
          
          if (filteredItems.length === 0) {
            setClothingItems(defaultClothingItems);
          } else {
            setClothingItems(filteredItems);
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
    setClothingItems(defaultClothingItems);
    // Use setTimeout to ensure state updates complete before navigation
    setTimeout(() => navigate('/'), 0);
  };

  const handleLoginClick = () => {
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
        // Close the modal and reset the state
        setIsEditProfileModalOpen(false);
        setActiveModal('');
        setSelectedCard({});
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
  

  useEffect(() => {
    // Only fetch items if logged in and we haven't already loaded them
    if (isLoggedIn && currentUser) {
      console.log('Fetching items due to login state change');
      api.getItems()
        .then((items) => {
          console.log('Updated items fetched:', items);
          const filteredItems = items.filter(item => {
            const imageUrl = item.imageUrl || item.link || '';
            return !imageUrl.includes('example.com');
          });
          
          if (filteredItems.length > 0) {
            setClothingItems(filteredItems);
          }
        })
        .catch(err => {
          console.error('Error fetching updated items:', err);
        });
    }
  }, [isLoggedIn, currentUser]);

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
  
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
        

        return api.getItems();
      })
      .then((items) => {
        if (items) {
          console.log('Refreshed items after adding new item:', items);
          // Filter out test cards with example.com URLs
          const filteredItems = items.filter(item => {
            const imageUrl = item.imageUrl || item.link || '';
            return !imageUrl.includes('example.com');
          });
          
          if (filteredItems.length > 0) {
            setClothingItems(filteredItems);
          }
        }
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
      .catch((err) => {
        console.log(err);
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
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems.filter(
                        (item) => item.owner === currentUser?._id
                      )}
                      weatherData={weatherData}
                      onSelectCard={handleCardClick}
                      onCardClick={handleCardClick}
                      onAddItem={handleAddClick}
                      onLogout={handleLogout}
                      onEditProfile={handleEditProfileClick}
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
            currentUser={currentUser}
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
            onRegister={handleRegisterClick}
          />
          
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeAllModals}
            onSubmit={handleLogin}
            onLogin={handleLoginClick}
          />
          
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
            onSubmit={handleEditProfileSubmit}
            currentUser={currentUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
