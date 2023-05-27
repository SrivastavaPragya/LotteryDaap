import React, { useEffect, useState } from "react";

const Player = ({ state, address }) => {
  const [account, setAccount] = useState("No account connected");
  const [registeredPlayers, setRegisteredPlayers] = useState([]);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };

  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      setAccountListener(web3.givenProvider);
      setAccount(accounts[0]);
    };
    state.web3 && getAccount();
  }, [state, state.web3]);

  useEffect(() => {
    const getPlayers = async () => {
      const { contract } = state;
      const players = await contract.methods.allplayer().call();
      setRegisteredPlayers(players);
    };
    state.contract && getPlayers();
  }, [state, state.contract]);

  return (
    <>
      <ul className="list-group" id="list">
        <div className="center">
          <li className="list-group-item" aria-disabled="true">
            <b>Connected account :</b> {account}
          </li>
          <li className="list-group-item">
            <b>Please pay 1 ether on this contract address : </b> {address}
          </li>
          <li className="list-group-item">
            <b>Registered Players:</b>
            <br />
            <br />
            {registeredPlayers.map((name, index) => (
              <p key={index}>{name}</p>
            ))}
          </li>
        </div>
      </ul>
    </>
  );
};

export default Player;
