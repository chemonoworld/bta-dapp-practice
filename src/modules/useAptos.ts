import { Types, AptosClient } from 'aptos';

export const mintToken = async(address: string, tokenName: string) => {
    if (!address) return;
    await createCollection(tokenName);
    alert("collection을 생성 중입니다. collection 생성 후 다음 트랜잭션을 진행해주세요.")
    const collectionName = "BTA_03_" + tokenName;
    const description = "빗썸 테크 아카데미 3기 수료 뱃지 NFT입니다. 토큰 이름은 자신이 민팅시 제출했던 트위터 아이디와 같습니다.";
    const uri = "https://d22p4hblaqdu3x.cloudfront.net/BTA-03-TAG/bithumb.png";
    const maxAmount = "1";
    const supply = 1;
    const mutConfig = [false, false, false, false, false];
    const royaltyPointsDenominator = 100;
    const royaltyPointsNumerator = 100; // 100%
    const tx = {
      type: "entry_function_payload",
      function: `0x3::token::create_token_script`,
      arguments: [
        collectionName, 
        tokenName, 
        description, 
        supply, 
        maxAmount, 
        uri, 
        address,
        royaltyPointsDenominator,
        royaltyPointsNumerator, 
        mutConfig,
        [],
        [],
        [],
      ],
      type_arguments: [],
    }
    await window.aptos.signAndSubmitTransaction(tx);
}

const createCollection = async (twitterId: string) => {
    const name = "BTA_03_" + twitterId;
    const description = "빗썸 테크 아카데미 3기 수료 뱃지 NFT입니다.";
    const uri = "https://www.notion.so/codestates/3-APTOSTATES-3d89ccf974db4ebb9ca8ab832972fdfd";
    const maxAmount = "100";
    const mutConfig = [false, false, false, false, false];
    const tx = {
      type: "entry_function_payload",
      function: `0x3::token::create_collection_script`,
      arguments: [name, description, uri, maxAmount, mutConfig],
      type_arguments: [],
    }
    await window.aptos.signAndSubmitTransaction(tx);
}

export const hasToken = async (twitterId:string): Promise<boolean> => {
    const client = new AptosClient('https://fullnode.testnet.aptoslabs.com');
    const creatorHex = "0x10656bc042639da94238e21f0ba00779d103ee7150a316f1c82b3319b1db6824"
    const collection: { type: Types.MoveStructTag; data: any } = await client.getAccountResource(
      creatorHex,
      "0x3::token::Collections",
    );
    const { handle } = collection.data.token_data;
    const collectionName = "BTA_03_" + twitterId;
    const tokenName = twitterId;
    const tokenDataId = {
      creator: creatorHex,
      collection: collectionName,
      name: tokenName,
    };

    const getTokenTableItemRequest: Types.TableItemRequest = {
      key_type: "0x3::token::TokenDataId",
      value_type: "0x3::token::TokenData",
      key: tokenDataId,
    };

    const result = await client.getTableItem(handle, getTokenTableItemRequest);
    if (result) return true;
    return false;
}