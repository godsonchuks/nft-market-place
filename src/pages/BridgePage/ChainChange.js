export async function harmonyChain() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '1666700000' }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '1666700000',
                        chainName: 'Harmony shard 0 testnet',
                        nativeCurrency: {
                            name: 'ONE',
                            symbol: 'ONE',
                            decimals: 18,
                        },
                        rpcUrls: ['https://api.s0.b.hmny.io'],
                        blockExplorerUrls: ['https://explorer.pops.one/'],
                    }]
                })
            } catch (addError) {
                console.log('Error adding Chain');
            }
        }
    }
}

export async function ethTest() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x5' }],
        });
    } catch (switchError) {
        console.log('Wallet Not Connected')
    }
}
