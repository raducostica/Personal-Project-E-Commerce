import React, { useState, useEffect, useContext } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { ProductContext, IState } from "../../Context/ProductsContext";

const TopPicks = () => {
  const [featured, setFeatured] = useState<IState[]>([]);
  const [currentSlice, setCurrentSlice] = useState<IState[]>([]);
  const [current, setCurrent] = useState<number>(5);
  const [transitionValue, setTransitionValue] = useState(0);

  const { products } = useContext(ProductContext);

  useEffect(() => {
    get8Items();
  }, []);

  useEffect(() => {
    if (featured.length > 0) {
      let temp = featured.slice(current, current + 5);
      setCurrentSlice(temp);
    }
  }, [featured]);

  const get8Items = () => {
    let seen: any = {};
    let topPicks = [];
    while (topPicks.length < 8) {
      let random = Math.floor(Math.random() * products.length);
      if (!seen[random]) {
        topPicks.push(products[random]);
        seen[random] = true;
      }
    }
    setFeatured(topPicks);
  };

  const nextItem = () => {
    // let tempCurrent = current + 1;
    // if (tempCurrent + 4 < featured.length) {
    //   let tempCurrentSlice = featured.slice(tempCurrent, tempCurrent + 5);
    //   setCurrentSlice(tempCurrentSlice);
    //   setCurrent(tempCurrent);
    // }
    if (current < featured.length) {
      setTransitionValue(transitionValue + 190);
      setCurrent(current + 1);
    }
  };

  const prevItem = () => {
    // let tempCurrent = current - 1;
    // if (tempCurrent - 4 > 0) {
    //   let tempCurrentSlice = featured.slice(tempCurrent - 4, tempCurrent);
    //   setCurrentSlice(tempCurrentSlice);
    //   setCurrent(tempCurrent);
    // }
    if (current > 0) {
      setTransitionValue(transitionValue - 190);
      setCurrent(current - 1);
    }
  };

  return (
    <div className="topPicks">
      <h2>Featured</h2>
      <div className="topPicksItems">
        <div
          className="topPicksItems-Slider"
          style={{
            transform: `translateX(-${transitionValue}px)`,
            transition:
              "transform 0.45s cubic-bezier(0.455, 0.03, 0.515, 0.955)",
          }}
        >
          {featured.map((product, i) => {
            const itemStyle = {
              backgroundImage: `url(${product.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              height: "200px",
              width: "150px",
              flex: 1,
              margin: "0 20px",
            };
            return (
              <Link
                to={{
                  pathname: `/products/${product.consoles}/${product.name}`,
                  state: product,
                }}
              >
                <div key={i} style={itemStyle}></div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="leftBtn">
        <button className="carouselBtn" onClick={prevItem}>
          <IoIosArrowBack size={30} />
        </button>
      </div>
      <div className="rightBtn">
        <button className="carouselBtn" onClick={nextItem}>
          <IoIosArrowForward size={30} />
        </button>
      </div>
    </div>
  );
};

export default TopPicks;