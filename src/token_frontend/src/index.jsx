import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '../../../node_modules/@dfinity/auth-client/lib/cjs/index';


const init = async () => { 
 
const authClient = await AuthClient.create();

if (await authClient.isAuthenticated()){
handleAuthenticated(authClient);

}
else{
await authClient.login({
identityProvider:"https://identity.ic0.app/#authorize",
onSuccess:()=>{

handleAuthenticated(authClient)

}
})

}

}

async function handleAuthenticated(authClient){
const identity = authClient.getIdentity()
const userPrinciple = identity._principal.toString();


 ReactDOM.render(<App loggedInPrincipal={userPrinciple} />, document.getElementById("root"));

}

init();


