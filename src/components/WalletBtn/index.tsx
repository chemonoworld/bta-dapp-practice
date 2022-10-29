import Button from "../Button";
import { Types, AptosClient, TokenClient, TransactionBuilderABI } from 'aptos';
import { useRecoilState } from 'recoil';
import "./walletBtn.scss";
import { connectionState } from "../../states/accountState";

const WalletBtn = () => {
    const [isConnected, setIsConnected] = useRecoilState(connectionState);

    const handleClick = async () => {
        if (isConnected) {
            await window.aptos.disconnect();
            setIsConnected(false);
        } else {
            await window.aptos.connect();
            setIsConnected(true);
        }
    }

    return (
        <Button className="connect-wallet-btn" onClick={handleClick}>
            {!isConnected ? (<div>
                Connect Wallet
            </div>) : (<div className="txt-white">
                Connected now
            </div>)
            }
        </Button>
    )
}

export default WalletBtn;