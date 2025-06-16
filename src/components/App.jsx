import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Profile from "./Profile/Profile";
import AddItemModal from "./AddItemModal/AddItemModal";
import ItemModal from "./ItemModal/ItemModal";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  // Check token on initial load
  useEffect(() => {
    console.log('App - Checking for JWT token on initial load');
    const token = localStorage.getItem('jwt');
    console.log('App - Token exists:', !!token);
    
    if (token) {
      auth.checkToken(token)
        .then((user) => {
          console.log('App - Token valid, user data:', user);
          setCurrentUser(user);
          setIsLoggedIn(true);
          console.log('App - isLoggedIn set to true');
          navigate('/');
        })
        .catch((err) => {
          console.error('App - Token check failed:', err);
          localStorage.removeItem('jwt');
          setCurrentUser(null);
          setIsLoggedIn(false);
          console.log('App - isLoggedIn set to false');
          navigate('/');
        });
    } else {
      console.log('App - No token found, user not logged in');
    }
  }, [navigate]);

  const handleLogin = () => {
    const token = localStorage.getItem('jwt');
    console.log('handleLogin called, token exists:', !!token);
    
    if (token) {
      auth.checkToken(token)
        .then((user) => {
          console.log('Login successful, user data:', user);
          setCurrentUser(user);
          setIsLoggedIn(true);
          console.log('isLoggedIn set to TRUE');
          // Try navigating directly to profile after login
          navigate('/profile');
          console.log('Navigated to /profile');
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
        console.log(err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    if (!isLoggedIn) {
      handleLoginClick();
      return;
    }

    const token = localStorage.getItem('jwt');
    if (!token) return;

    !isLiked
      ? api.addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.error('Error liking card:', err))
      : api.removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.error('Error unliking card:', err));
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCardToDelete(null);
  };

  const handleAddItemModalSubmit = (name, imageUrl, weather) => {
    api
      .addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add item:", err);
      });
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                    onCardLike={handleCardLike}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    onAddItem={handleAddClick}
                    onLogout={handleLogout}
                  />
                }
              />
              <Route
                path="/debug-profile"
                element={
                  <div style={{padding: '20px'}}>
                    <h1>Debug Profile Page</h1>
                    <div>
                      <h2>Auth State:</h2>
                      <p>isLoggedIn: {isLoggedIn ? 'true' : 'false'}</p>
                      <p>JWT exists: {localStorage.getItem('jwt') ? 'true' : 'false'}</p>
                      <p>Current User: {currentUser ? JSON.stringify(currentUser) : 'null'}</p>
                    </div>
                    <button 
                      onClick={() => navigate('/profile')}
                      style={{padding: '10px', margin: '20px 0', cursor: 'pointer'}}
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
            closeActiveModal={closeAllModals}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            closeActiveModal={closeAllModals}
            onDelete={openConfirmationModal}
            currentUser={currentUser}
          />
          
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={handleCancelDelete}
            onConfirm={handleCardDelete}
            card={cardToDelete}
          />
          
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeAllModals}
            onLogin={handleLogin}
            onRegisterClick={() => {
              setIsLoginModalOpen(false);
              setIsRegisterModalOpen(true);
            }}
          />
          
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeAllModals}
            onRegister={handleLogin}
            onLoginClick={() => {
              setIsRegisterModalOpen(false);
              setIsLoginModalOpen(true);
            }}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
