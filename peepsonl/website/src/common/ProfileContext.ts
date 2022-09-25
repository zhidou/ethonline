import React from "react";
import { ehtersProvider } from "./ethers";

type TextRecordValue = undefined | string | null;

// https://eips.ethereum.org/EIPS/eip-2304
export interface Addresses {
  0: TextRecordValue; // Bitcoin
  2: TextRecordValue; // Litecoin
  3: TextRecordValue; // Dogecoin
  22: TextRecordValue; // Monacoin
  60: TextRecordValue; // Ethereum
  61: TextRecordValue; // Ethereum Classic
  137: TextRecordValue; // Rootstock
  144: TextRecordValue; // Ripple
  145: TextRecordValue; // Bitcoin Cash
  714: TextRecordValue; // Binance
}

const addressesTypes = [0, 2, 3, 22, 60, 61, 137, 144, 145, 714];

const EMPTY_ADDRESSES = {
  0: undefined,
  2: undefined,
  3: undefined,
  22: undefined,
  60: undefined,
  61: undefined,
  137: undefined,
  144: undefined,
  145: undefined,
  714: undefined,
};

export interface TextRecords {
  email: TextRecordValue;
  url: TextRecordValue;
  avatar: TextRecordValue;
  description: TextRecordValue;
  notice: TextRecordValue;
  keywords: TextRecordValue;
  "com.discord": TextRecordValue;
  "com.github": TextRecordValue;
  "com.reddit": TextRecordValue;
  "com.twitter": TextRecordValue;
  "org.telegram": TextRecordValue;
  "eth.ens.delegate": TextRecordValue;
  "onl.peeps.profile.pinned": TextRecordValue;
}

export type PinableKeys =
  | keyof Addresses
  | keyof Omit<
      TextRecords,
      | "avatar"
      | "description"
      | "notice"
      | "keywords"
      | "eth.ens.delegate"
      | "onl.peeps.profile.pinned"
    >;

export const PINABLE_NAME_ICON_MAP: {
  [key in PinableKeys]: { title: string; iconUrl: string };
} = {
  0: {
    title: "BTC",
    iconUrl: "/images/icon/btc.png",
  },
  2: {
    title: "LTC",
    iconUrl: "/images/icon/ltc.png",
  },
  3: {
    title: "DOGE",
    iconUrl: "/images/icon/doge.png",
  },
  22: {
    title: "MONA",
    iconUrl: "/images/icon/btc.png",
  },
  60: {
    title: "ETH",
    iconUrl: "/images/icon/eth.png",
  },
  61: {
    title: "ETC",
    iconUrl: "/images/icon/btc.png",
  },
  137: {
    title: "RSK",
    iconUrl: "/images/icon/btc.png",
  },
  144: {
    title: "XRP",
    iconUrl: "/images/icon/btc.png",
  },
  145: {
    title: "BCH",
    iconUrl: "/images/icon/btc.png",
  },
  714: {
    title: "BNB",
    iconUrl: "/images/icon/btc.png",
  },
  email: {
    title: "Email",
    iconUrl: "/images/icon/email.png",
  },
  url: {
    title: "URL",
    iconUrl: "/images/icon/link.png",
  },
  "com.discord": {
    title: "Discord",
    iconUrl: "/images/icon/discord.png",
  },
  "com.github": {
    title: "GitHub",
    iconUrl: "/images/icon/github.png",
  },
  "com.reddit": {
    title: "Reddit",
    iconUrl: "/images/icon/reddit.png",
  },
  "com.twitter": {
    title: "Twitter",
    iconUrl: "/images/icon/twitter.png",
  },
  "org.telegram": {
    title: "Telegram",
    iconUrl: "/images/icon/telegram.png",
  },
};

export const PINABLE_KEYS = [
  0,
  2,
  3,
  22,
  60,
  61,
  137,
  144,
  145,
  714,
  "email",
  "url",
  "com.discord",
  "com.github",
  "com.reddit",
  "com.twitter",
  "org.telegram",
];

const textRecordKeys = [
  "email",
  "url",
  "avatar",
  "description",
  "notice",
  "keywords",
  "com.discord",
  "com.github",
  "com.reddit",
  "com.twitter",
  "org.telegram",
  "eth.ens.delegate",
  "onl.peeps.profile.pinned",
];

const EMPTY_TEXT_RECORDS = {
  email: undefined,
  url: undefined,
  avatar: undefined,
  description: undefined,
  notice: undefined,
  keywords: undefined,
  "com.discord": undefined,
  "com.github": undefined,
  "com.reddit": undefined,
  "com.twitter": undefined,
  "org.telegram": undefined,
  "eth.ens.delegate": undefined,
  "onl.peeps.profile.pinned": undefined,
};

export function useProfile(ens: string | null) {
  const [textRecords, setTextRecords] = React.useState<TextRecords>({
    ...EMPTY_TEXT_RECORDS,
  });
  const [addresses, setAddresses] = React.useState<Addresses>({
    ...EMPTY_ADDRESSES,
  });

  const setTextRecord = React.useCallback(
    (key: keyof TextRecords, value: TextRecordValue) => {
      setTextRecords((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const setAddress = React.useCallback(
    (key: keyof Addresses, value: TextRecordValue) => {
      setAddresses((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  React.useEffect(() => {
    if (!ens) return;

    ehtersProvider.getResolver(ens).then((resolver) => {
      if (!resolver) return;
      resolver.getAvatar().then((avatarInfo) => {
        if (avatarInfo === null) {
          setTextRecord("avatar", null);
          return;
        }

        setTextRecord("avatar", avatarInfo.url);
      });

      textRecordKeys
        .filter((key) => !["avatar"].includes(key))
        .forEach((key) => {
          resolver
            .getText(key)
            .then((val) => {
              setTextRecord(key as keyof TextRecords, val);
            })
            .catch(console.error);
        });

      addressesTypes.forEach((key) => {
        resolver
          .getAddress(key)
          .then((val) => {
            setAddress(key as keyof Addresses, val);
          })
          .catch(console.error);
      });
    });
  }, [ens, setTextRecord, setAddress]);

  return { textRecords, addresses };
}

export interface Profile {
  textRecords: TextRecords;
  addresses: Addresses;
}

const ProfileContext = React.createContext<Profile>({
  textRecords: {
    ...EMPTY_TEXT_RECORDS,
  },
  addresses: {
    ...EMPTY_ADDRESSES,
  },
});

export default ProfileContext;
