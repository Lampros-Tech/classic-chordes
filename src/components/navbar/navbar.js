import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { debounce } from "./helper";
import "./navbar.scss";

const networks = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  // bsc: {
  //   chainId: `0x${Number(56).toString(16)}`,
  //   chainName: "Binance Smart Chain Mainnet",
  //   nativeCurrency: {
  //     name: "Binance Chain Native Token",
  //     symbol: "BNB",
  //     decimals: 18,
  //   },
  //   rpcUrls: [
  //     "https://bsc-dataseed1.binance.org",
  //     "https://bsc-dataseed2.binance.org",
  //     "https://bsc-dataseed3.binance.org",
  //     "https://bsc-dataseed4.binance.org",
  //     "https://bsc-dataseed1.defibit.io",
  //     "https://bsc-dataseed2.defibit.io",
  //     "https://bsc-dataseed3.defibit.io",
  //     "https://bsc-dataseed4.defibit.io",
  //     "https://bsc-dataseed1.ninicoin.io",
  //     "https://bsc-dataseed2.ninicoin.io",
  //     "https://bsc-dataseed3.ninicoin.io",
  //     "https://bsc-dataseed4.ninicoin.io",
  //     "wss://bsc-ws-node.nariox.org",
  //   ],
  //   blockExplorerUrls: ["https://bscscan.com"],
  // },
};

const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    setError(err.message);
  }
};

const Navbar = () => {
  const [error, setError] = useState();

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  const [open, setOpen] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const [newButton, setNewButton] = useState({ hidden: false });
  const onClick = () => {
    setNewButton({ hidden: true });
  };

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
    // timer set to 100 milliseconds:
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <nav className="navbar" style={{ top: visible ? "0" : "-100px" }}>
      <Link to="/" className="nav-logo">
        <img style={{ width: "250px", height: "80px" }} src={logo} />
      </Link>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            <div className="navtextstyle">Home</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/player" className="nav-link" onClick={closeMenu}>
            <div className="navtextstyle">player</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/explore" className="nav-link" onClick={closeMenu}>
            <div className="navtextstyle">explore</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/streaming" className="nav-link" onClick={closeMenu}>
            <div className="navtextstyle">stream</div>
          </Link>
        </li>
        <li className="nav-item"></li>
      </ul>
    </nav>
  );
};

export default Navbar;
