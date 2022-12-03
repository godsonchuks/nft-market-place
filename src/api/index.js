const APIKEY = 'ckey_40ccf16cfbff468a8ea289c92df';
const baseURL = 'https://api.covalenthq.com/v1'
const HarmonyChainId = '1666700000'
const demoAddress = 'one1xfftrrcjnq807klgc4fu2k3stlgfzzh06tn09u'

const  getWalletBalance = async(address) => {
    const url = new URL(`${baseURL}/${HarmonyChainId}/address/${address}/balances_v2/?key=${APIKEY}`);
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;
    console.log(data)
    return data;
}

// Example address request
getWalletBalance(HarmonyChainId, demoAddress);

export {
    getWalletBalance,
}
