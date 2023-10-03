import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import 'font-awesome/css/font-awesome.min.css';

function ProductDetails() {

  
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const apiUrl = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/1';



    fetch(apiUrl)
    .then((response) => {
      if (response.status === 429) {
        // Handle rate limiting: You can wait and retry here if the "Retry-After" header is available.
        console.error('Rate limited. Retry after some time.');
        throw new Error('Rate limited');
      }
      return response.json();
    })
      .then((data) => {
        setProduct(data);
        // Set the first image as active on initial load
        setActiveImage(data.photos[0]);
      })
      
      .catch((error) => {
        if (error.message !== 'Rate limited') {
          console.error('Error fetching data:', error);
        }
      });

          // Add event listener for burger icon click
        const burger = document.querySelector('.burger');
        burger.addEventListener('click', () => {
        setIsNavOpen(!isNavOpen);
      });

    // Remove event listener when component unmounts
    return () => {
      burger.removeEventListener('click', () => {});
    };
  }, [isNavOpen]);

  

  const handleImageClick = (image) => {
    setActiveImage(image);
  };

  useEffect(() => {
    // Get all the small images
    const smallImages = document.querySelectorAll('.previewImg img');

    // Get the preview image element
    const previewImage = document.getElementById('productImg');

    // Add a click event listener to each small image
    smallImages.forEach((smallImage, index) => {
      smallImage.addEventListener('click', () => {
        // Remove the "active" class (border) from all small images
        smallImages.forEach((img) => img.classList.remove('active'));

        // Add the "active" class (border) to the clicked small image
        smallImage.classList.add('active');

        // Set the src of the preview image to the clicked small image's src
        previewImage.src = smallImage.src;
      });
    });

    // Clean up event listeners when component unmounts
    return () => {
      smallImages.forEach((smallImage) => {
        smallImage.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div>
<div id="top-bar">
        <div className="logo">
          <a href="/">
            <h4>
              <span>SHOP</span>LANE
            </h4>
          </a>
        </div>
        <ul className={`nav-links ${isNavOpen ? 'nav-active' : ''}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Clothings</a>
          </li>
          <li>
            <a href="/">Accessories</a>
          </li>
        </ul>
        <div className="icons">
          <i className="fa fa-search"></i>
          <div className="cart" id="cartIcon">
            <a href="/">
              <i className="fa fa-shopping-cart">
                <span id="cart-count">0</span>
              </i>
            </a>
          </div>
          <i className="fa fa-user-circle-o"></i>
          <div className="burger">
            <div className={`line1 ${isNavOpen ? 'toggle-line1' : ''}`}></div>
            <div className={`line2 ${isNavOpen ? 'toggle-line2' : ''}`}></div>
            <div className={`line3 ${isNavOpen ? 'toggle-line3' : ''}`}></div>
          </div>
        </div>
      </div>
      
      <section id="product">
      <div className="left-column">
          {product && (
            <img id="productImg" src={activeImage} alt={product.name} />
          )}
        </div>
        <div className="right-column">
          <div className="product-description">
            {product && (
              <>
                <h1 id="name">{product.name}</h1>
                <h4 id="brand">{product.brand}</h4>
                <h3>Price: Rs <span>{product.price}</span></h3>
                <div className="description">
                  <h3>Description</h3>
                  <p id="description">{product.description}</p>
                </div>
                <div className="product-preview">
                  <h3>Product Preview</h3>
                  <div className="previewImg">
                    {product &&
                      product.photos.map((photo, index) => (
                      <img
                      key={index}
                      id={`img${index}`}
                      src={photo}
                      alt={`Product Preview ${index}`}
                      
                      className={activeImage === photo ? 'active' : ''} // Apply active class based on state
                      onClick={() => handleImageClick(photo)} // Add click event
                      />
                      ))}
                  </div>
                </div>
                <div className="btn">
                  <button id="add-to-cart">Add to Cart</button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
