import React from "react";
import { useParams } from "react-router-dom";
import * as ethers from "ethers";
import { ehtersProvider } from "./ethers";

const PPS_DOMAIN =
  process.env.NODE_ENV === "production" ? "pps.eth" : "pps.eth";

enum UserType {
  PEEPS,
  ENS,
  ADDRESS,
  INVALID,
  LOADING,
}

interface User {
  uid: string | null;
  ens: string | null;
  address: string | null;
  type: UserType;
}

const EMPTY_USER = {
  uid: "",
  ens: "",
  address: "",
  type: UserType.LOADING,
};

async function resolveUser(id: string): Promise<User> {
  if (ethers.utils.isAddress(id)) {
    return {
      uid: null,
      ens: null,
      address: id,
      type: UserType.ADDRESS,
    };
  }

  let potentialEnsAddress = id.endsWith(".eth") ? id : `${id}.${PPS_DOMAIN}`;

  const addr = await ehtersProvider.resolveName(potentialEnsAddress);

  if (addr) {
    let uid: string | null;
    let type: UserType;
    if (id.endsWith(PPS_DOMAIN)) {
      uid = id.split(PPS_DOMAIN)[0];
      type = UserType.ENS;
    } else if (id.endsWith(".eth")) {
      uid = null;
      type = UserType.ENS;
    } else {
      uid = id;
      type = UserType.PEEPS;
    }
    return {
      uid,
      ens: potentialEnsAddress,
      address: addr,
      type,
    };
  }

  return {
    uid: null,
    ens: null,
    address: null,
    type: UserType.INVALID,
  };
}

export function useUser() {
  const { id = "" } = useParams();
  const [user, setUser] = React.useState<User>({ ...EMPTY_USER });

  React.useEffect(() => {
    let potentialId = id;
    // if (window.location.hostname.split(".").length === 3) {
    //   potentialId = window.location.hostname.split(".")[0];
    // }
    resolveUser(potentialId).then(setUser);
  }, [id]);

  return user;
}
const UserContext = React.createContext<User>({ ...EMPTY_USER });

export default UserContext;
