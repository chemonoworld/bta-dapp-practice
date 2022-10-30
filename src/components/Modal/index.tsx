import { useState } from 'react';
import Button from '../Button';
import './modal.scss';
import CLOSE from '../../assets/images/close-icon.png';
import BITHUMB from '../../assets/images/bithumb-128.png';

export const Modal = () => {
  const [twitterId, setTwitterId] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setTwitterId(value);
  };

  const closeModal = () => {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer?.classList.add('hidden');
    setTwitterId("");
  };

  const handleClickBtn = () => {
    alert("mint!");
  };

  return (
    <div className="modal-container hidden">
      <div className="modal-content">
        <div className="modal-header-box">
          <span className="modal-header-txt"> CLAIM YOUR BTA-NFT</span>
          <div className="btn-modal-close" onClick={closeModal}>
            <img id="modal-close-img" src={CLOSE} alt="X" />
          </div>
        </div>
        <div className="modal-content-box modal-txt-container">
          <div className="modal-txt-box">
            BTA 3기 수료 뱃지를 NFT로 발급받아보세요.
          </div>
          <div className="modal-txt-box">
            수료 뱃지는 Aptos 체인에서NFT로 발행됩니다.
          </div>
          <div className="modal-txt-box">
            아래에 자신의 트위터 아이디(@_____)를 입력하고 NFT Badge를 민팅해보세요.
          </div>
        </div>
        <div className="modal-input-container">
          <div className="modal-content-box">
            <img className="modal-soul-img" src={BITHUMB} alt="0xSOUL" />
          </div>
          <div className="modal-content-box vertical-center">
            <span> • • • </span>
          </div>
          <input
            id="minting-input"
            className="submit-input"
            type="text"
            placeholder="Your Twitter ID"
            value={twitterId}
            onChange={onChange}
          />
        </div>
        <div className="modal-content-box submit-btn-wrapper">
          <Button className="submit-btn btn-red" onClick={handleClickBtn}>
            <div className="submit-btn-text">Mint</div>
          </Button>
        </div>
      </div>
      <div className="modal-overlay" onClick={closeModal}></div>
    </div>
  );
};

export const openModal = () => {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer?.classList.remove('hidden');
    console.log('open modal');
  };
