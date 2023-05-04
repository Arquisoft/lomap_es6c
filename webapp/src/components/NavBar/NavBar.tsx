import "./NavBar.css";
import lomap_icon from "../../images/lomap-icon.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <div className="header_left">
        <img src={lomap_icon} alt="Logo"></img>
        <h2 className="site_title">LoMap</h2>
      </div>
      <div>
        <ul className="list">
          <li className="list_item, active">
            <Link to="/">
              <img className="navBarImage" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Fhome-png-icon%2Fhome-png-icon-18.jpg&f=1&nofb=1&ipt=d786087d0f3c425a6bde71cf162b744b640e1af020786a449357301bcaacf599&ipo=images" alt="" />
            </Link>
          </li>
          <li className="list_item">
            <Link to="https://arquisoft.github.io/lomap_es6c/" target="_blank"  id='nav_docu'>
              <img className="navBarImage" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficon-library.com%2Fimages%2Fbook-icon%2Fbook-icon-28.jpg&f=1&nofb=1&ipt=49be206d5dbb536f67b60685fd07754297cf819d015309c172b89bfb58c33ff9&ipo=images" alt="" />
            </Link>
          </li>
          <li className="list_item">
            <Link to="/about" id='nav_about'>
              <img className="navBarImage" src="https://cdn.onlinewebfonts.com/svg/img_51582.png" alt="" />
            </Link>
          </li>
          <li className="list_item">
            <Link to="/user" id='nav_user'>
              <img className="navBarImage" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_218090.png&f=1&nofb=1&ipt=c826f5594e5d9c1cc6db7306b35ba8da5a929d7131e00d3d84ad41bbdfed20a9&ipo=images" alt="" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

