import React, { useState } from "react";
import { token_backend } from "../../../declarations/token_backend/index";
import { Principal } from "@dfinity/principal"


function Balance() {

  const [inputvalue, inputfunc] = useState("")
  const [showText, showTextFunc] = useState("")
  const [symbolED, symbolEDfunc] = useState("")


  async function handleClick() {
    const principal = Principal.fromText(inputvalue)
    const values = await token_backend.balanceOf(principal)
    showTextFunc(values.toLocaleString());


    symbolEDfunc(await token_backend.Sumbols())



  }




  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          onChange={(e) => { inputfunc(e.target.value) }}
          value={inputvalue}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p>{showText != "" ? `This account has a balance of ${showText} ${symbolED}.` : ""}</p>
    </div>
  );
}

export default Balance;
