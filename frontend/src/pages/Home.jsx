import Listings from "./Listings";

const Home = () => {
    return (
    <>
      <div className="home-container">
        
        <div className="Landing-section">
          <div className="large-shoe">
              <div className="Landing-text">
                <h1>The Platypus shoe <br /> marketplace for <br /> Kiwis</h1>
                <div className="buttons">
                  <button className="primary-button">Start browsing</button>
                </div>
              </div>
          </div>

          <div className="small-shoes">
            <img src="../public/Nike-shoe.png" alt="Nike Shoe" />
            <img src="../public/Converse-shoe.png" alt="Converse Shoe" />
          </div>

        </div>

        <div className="filter-bar">
          <button className="filter nike">Nike Airforce</button>
          <button className="filter adidas">Adidas</button>
          <button className="filter reebok">Reebok</button>
          <button className="filter converse">Converse</button>
        </div>
        
      </div>
      <Listings/>
    </>
    );
  };

export default Home
