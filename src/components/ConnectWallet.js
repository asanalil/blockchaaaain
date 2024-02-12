import React, { useState } from 'react';

const ConnectWallet = () => {
    const [isConnected, setIsConnected] = useState(false);

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                setIsConnected(true);
            } else {
                throw new Error('No Ethereum provider detected');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error.message);
            // Handle error
        }
    };

    return (
        <div>
            {!isConnected ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <p>Wallet Connected</p>
            )}
        </div>
    );
};

export default ConnectWallet;
