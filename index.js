import Head from 'next/head';
// import {ethers.utils.formatEther} from ethers;
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { ethers } from "ethers";
import Spinner from "react-spinner";
export default function Home() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [disableButton2, setDisableButton2] = useState(true);
    const submitContact = async (event) => {
      event.preventDefault();
      alert(`So your name is ${event.target.name.value}?`);
    };
  const connectWallet = () => {
    setIsClicked(true);
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChanged([result[0]]);
        });
    } else {
      // setErrorMessage("Install MetaMask please!!");
      alert("Install MetaMask please!!");
    }
  };
  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };
  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };
  const [isClicked, setIsClicked] = useState(false);
  function handleClick(e) {
    e.preventDefault();
  }
  async function sendTransaction(e) {
    e.preventDefault();
    // setIsLoading(true);
      let params = [
        {
          from: defaultAccount.toString(),
          to: (e.target.add.value).toString(),
          gas: Number(31000).toString(16),
          gasPrice: Number(3000000).toString(16),
          value: Number(e.target.v.value * 1e18).toString(16),
          // value:Number(2).toString(16),
        },
      ];
    await window.ethereum.request({ method: "eth_sendTransaction", params });
    e.target.v.value = "";
    e.target.add.value = "";
    }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ethereum Guard</h1>
      <style jsx global>{`
        body {
          background-color: rgb(25,184,242);
        }
        #verifybutton {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #333;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        #verifybutton:hover {
          background-color: #555;
        }
        #verifybutton:active {
          transform: scale(0.95);
        }
        .myInput {
          padding: 10px;
          border: none;
          border-bottom: 2px solid #333;
          background-color: #c6c6c6;
          outline: none;
          margin: 10px;
          border-radius: 5px;
          transition: border-bottom 0.2s ease-in-out;
        }
        .myInput:focus {
          border-bottom: 2px solid green;
          animation: pulse 0.5s ease-in-out;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        #myButton {
          position: fixed;
          top: 10px;
          right: 10px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #333;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        #myButton:hover {
          background-color: #555;
        }

        #myButton:active {
          transform: scale(0.95);
        }

        ${isClicked &&
        `
          #myButton {
            background-color: green;
          }

          #myButton:hover {
            background-color: green;
          }

          #myButton:active {
            transform: none;
          }
        `}
        .submitbutton {
          padding: 10px 20px;
          background: #333;
          border: none;
          border-radius: 5px;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          
        }
        .reportbutton,.votebutton {
          padding: 10px 20px;
          background: #333;
          border: none;
          border-radius: 5px;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          
        }
        ${!disableButton2 && `.submitbutton:hover {
          background: #555;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .submitbutton:focus {
          outline: none;
        }`}
      `}</style>
      <button id="myButton" onClick={connectWallet}>
        connect wallet button
      </button>
      <form className="flex flex-col" onSubmit={sendTransaction}>
        <input
          id="name"
          htmlFor="name"
          type="text"
          value={defaultAccount}
          size={45}
          readOnly
          className="myInput"
        />
        <br />
        <input
          type="text"
          id="add"
          htmlFor="add"
          className="myInput"
          placeholder="Enter the receiver's address"
          size={45}
        />
        <br />
        <center>
          <input
            type="text"
            id="v"
            className="myInput"
            htmlFor="v"
            placeholder="Ethers to transfer"
          />
        </center>
        
        <div>
        <center>
          <button id="verifybutton" onClick={handleClick}>
            verify
          </button>
        </center>
        <br/>
        <center>
          <input
            type="submit"
            className="submitbutton"
            value="Submit"
            disabled={disableButton2}
          />
        </center>
        <br/>
        <center>
          <button id="Report" className='reportbutton' onClick={handleClick}>
            Report
          </button>
        </center>
        <br/>
        <center>
        
          <button id="Vote" className='votebutton' onClick={handleClick}>
            Vote
          </button>
        
        </center>
        </div>
        
      </form>
    </div>
  );
}
