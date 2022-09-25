import React from "react";
import * as ethers from "ethers";
import { useSnackbar } from "notistack";

export function useWallet() {
  const { enqueueSnackbar } = useSnackbar();

  const [signer, setSigner] = React.useState<ethers.Signer | undefined>(
    undefined
  );
  const [walletAddress, setWalletAddress] = React.useState<
    string | undefined
  >();

  const connectWallet = React.useCallback(() => {
    if (!(window as any).ethereum) {
      enqueueSnackbar("Please use a Ethereum compatible browser.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    provider
      .send("eth_requestAccounts", [])
      .then(() => {
        (window as any).signer = provider.getSigner();
        setSigner(provider.getSigner());
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  }, [enqueueSnackbar]);

  const disconnectWallet = React.useCallback(() => {
    window.location.reload();
  }, []);

  React.useEffect(() => {
    if (!signer) return;
    signer.getAddress().then((address) => {
      console.log(address);
      setWalletAddress(address);
    });
  }, [signer]);

  return { signer, connectWallet, disconnectWallet, walletAddress };
}
const WalletContext = React.createContext<{
  signer: ethers.Signer | undefined;
  connectWallet: () => void;
  disconnectWallet: () => void;
  walletAddress: string | undefined;
}>({
  signer: undefined,
  connectWallet: () => {},
  disconnectWallet: () => {},
  walletAddress: undefined,
});

export default WalletContext;
