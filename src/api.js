// const API_KEY = '2837c5246a5d5dfdb7eb83b9f303cc14d3e6efe58142c2a39dce440f330d11d3';
const API_KEY = 'aa0c3c2bf21328b5ff7aba60b2614a5a65d75593d1713223a84d11f8fe4e9117';
const tickersHandlers = new Map();
export const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);
const AGGREGATE_INDEX = '5';

socket.addEventListener('message', (e) => {
  const { TYPE: type, FROMSYMBOL: currency, PRICE: newPrice } = JSON.parse(e.data);
  if (type !== AGGREGATE_INDEX || newPrice === undefined) {
    return;
  }
  const handlers = tickersHandlers.get(currency) ?? [];
  handlers.forEach((fn) => fn(newPrice));
});

function sendToWebSocket(message) {
  const stringifiedMessage = JSON.stringify(message);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }
  socket.addEventListener(
    'open',
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
}
function subscribeToTickerOnWs(ticker) {
  sendToWebSocket({ action: 'SubAdd', subs: [`5~CCCAGG~${ticker}~USD`] });
}
function unsubscribeFromTickerOnWs(ticker) {
  sendToWebSocket({
    action: 'SubRemove',
    subs: [`5~CCCAGG~${ticker}~USD`],
  });
}

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
  subscribeToTickerOnWs(ticker);
};
export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
  unsubscribeFromTickerOnWs(ticker);
};

export async function getCoinList() {
  try {
    const fetchCoinList = await fetch(
      `https://min-api.cryptocompare.com/data/blockchain/list?&api_key=${API_KEY}`
    );
		// debugger
		const coinList =await fetchCoinList.json();
    return coinList

  } catch (error) {
    console.log(error);
  }
}

