import Button from "../Button";
import { Types, AptosClient, TokenClient, TransactionBuilderABI } from 'aptos';
import { useRecoilState } from 'recoil';
import "./walletBtn.scss";
import { addressState, connectionState } from "../../states/accountState";

const WalletBtn = () => {
    const [isConnected, setIsConnected] = useRecoilState<boolean>(connectionState);
    const [address, setAddress] = useRecoilState<string | null>(addressState);

    const handleClick = async () => {
        if (isConnected) {
            await window.aptos.disconnect();
            setIsConnected(false);
        } else {
            await window.aptos.connect();
            await window.aptos.account().then((data: { address: string }) => setAddress(data.address));
            setIsConnected(true);
        }
    }

    return (
        <Button className="connect-wallet-btn" onClick={handleClick}>
            {!isConnected ? (<div className="txt-box txt-default-size">
                Connect Wallet
            </div>) : (<div className="txt-box txt-white txt-default-size">
                {address !== null
                    ? "Connected Now"
                    : 'Connecting...'}
            </div>)
            }
        </Button>
    )
}

export default WalletBtn;