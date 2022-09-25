import React from "react";
import { NFTInfo } from "../components/TabNFTItem";

interface NFTMetadata {
  contract_address: string;
  token_id: string;
  creator_address: string;
}

interface GetNFTOwnedByAccountResponse {
  response: string;
  nfts: NFTMetadata[];
  total: number;
  continuation: string | null;
}

interface NFTDetails {
  chain: string;
  contract_address: string;
  token_id: string;
  file_url: string;
  metadata: {
    name: string;
  };
}

interface GetNFTDetailsResponse {
  response: string;
  nft: NFTDetails;
  contract: {
    name: string;
  };
}

export function useNFTOwnedByAccount(ownerAddress: string | null) {
  const [assets, setAssets] = React.useState<NFTInfo[] | undefined>();

  React.useEffect(() => {
    if (!ownerAddress) return;

    fetch(
      `https://api.nftport.xyz/v0/accounts/${ownerAddress}?chain=ethereum`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "2b9b6c43-7245-4706-97a2-480e9af8e121",
        },
      }
    )
      .then((response) => response.json())
      .then((response: GetNFTOwnedByAccountResponse) => {
        const { nfts } = response;
        Promise.all(
          nfts.map(
            (nft, idx) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  fetch(
                    `https://api.nftport.xyz/v0/nfts/${nft.contract_address}/${nft.token_id}?chain=ethereum`,
                    {
                      method: "GET",
                      headers: {
                        Accept: "application/json",
                        Authorization: "2b9b6c43-7245-4706-97a2-480e9af8e121",
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((response: GetNFTDetailsResponse) => {
                      resolve({
                        contractName:
                          response.contract.name ||
                          (response.nft.contract_address ===
                            "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85" &&
                            "ENS") ||
                          "Unknown",
                        contractAddress: response.nft.contract_address,
                        tokenId: response.nft.token_id,
                        imageUrl: response.nft.file_url,
                        name: response.nft.metadata.name,
                      } as NFTInfo);
                    });
                }, 1000 * (idx + 1));
              })
          )
        ).then((result) => {
          setAssets(result as NFTInfo[]);
        });
      })
      .catch((err) => console.error(err));
  }, [ownerAddress]);

  return assets;
}
