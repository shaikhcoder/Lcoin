import React, { useState } from "react";
import { token_backend , canisterId,createActor } from "../../../declarations/token_backend/index";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";


function Faucet(props) {
  const [isDisabled, setDisable] = useState(false);
  const [getTokens, setToken] = useState("Gimme gimme")

  async function handleClick(event) {
    setDisable(true);


const authClient = await AuthClient.create();
const identity = await authClient.getIdentity();
const AuthenticatedCanister = createActor(canisterId,{
agentOptions:{
identity,
},
});

    setToken(await AuthenticatedCanister.PayOuted());


  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free LCoin tokens here! Claim 10,000 LCoin coins to your account. <br /> ID: {props.UserId}</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {getTokens}
        </button>
      </p>
    </div>
  );
}

export default Faucet;

