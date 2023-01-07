
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";



actor Token {

    let owner : Principal = Principal.fromText("jkkys-s4qii-z6p7q-qp5h7-vwuad-kkdq7-qrelf-npjsb-qzjh7-kjm43-iae");

    let totalSupply : Nat = 1000000000;
    let symboled : Text = "Lcoin";
stable var balanceEntries :[(Principal, Nat)] =[];
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    
if(balances.size() < 1){

balances.put(owner, totalSupply);
};

    public shared (msg) func PayOuted() : async Text {
        //  Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller) == null) {
            Debug.print(debug_show(msg.caller));
Debug.print(debug_show("aas"));
            let amout :Nat = 10000;
           let results = await TransfereD(msg.caller,amout);
            return results;

        } else {
            return "Already Claimed";

        };

    };

    public query func Sumbols() : async Text {
        return symboled;
    };

    public query func balanceOf(who : Principal) : async Nat {

        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;

    };





 




    public shared (msg) func TransfereD(to : Principal, amount : Nat) : async Text {
        let fromBalance = await balanceOf(msg.caller);
        if (fromBalance >= amount) {
            let newFromBalance : Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);
            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);
            return "Success";
        } else {
            return "Insufficient Funds";
        };





    };

system func preupgrade(){
balanceEntries := Iter.toArray(balances.entries());

};
system func postupgrade(){

balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(),1, Principal.equal, Principal.hash);
if(balances.size() < 1){

balances.put(owner, totalSupply);
};
};




}