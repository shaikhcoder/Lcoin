import React, {useState} from "react";
import { token_backend , canisterId ,createActor} from "../../../declarations/token_backend/index";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";
import { Principal } from "@dfinity/principal"
function Transfer() {
  
  const [IdInput, inputfunc] = useState("")
const [amountInput,SetAmout] = useState(0);
const [btndisa,setBTN] = useState(false);
const [PText,SetPText] =useState("")


async function handleClick() {
setBTN(true)
const id = Principal.fromText(IdInput)


const authClient = await AuthClient.create();
const identity = await authClient.getIdentity();
const AuthenticatedCanister = createActor(canisterId,{
agentOptions:{
identity,
},

});


const result = await AuthenticatedCanister.TransfereD(id,Number(amountInput));   
SetPText(result)
setBTN(false)
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
onChange={(e) => { inputfunc(e.target.value) }}
 value={IdInput}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
onChange={(e) => { SetAmout(e.target.value) }}
 value={amountInput}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={btndisa} >
            Transfer
          </button>
        </p>
<p>{PText}</p>
      </div>
    </div>
  );
}

export default Transfer;
