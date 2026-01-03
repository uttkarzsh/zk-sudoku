import { useConnection, useConnect, useDisconnect, useConnectors } from "wagmi";

const Wallet = () => {
  const connection = useConnection();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const connectors = useConnectors();

  if (connection.status == "connected") {
    return (
      <div className="grid align-middle">
        <p className="text-white">Connected: {connection.address}</p>
        <button className="
    mt-6
    mb-12
    px-6 py-3
    rounded-lg
    bg-emerald-300
    text-black font-semibold
    tracking-wide
    shadow-md
    transition-all duration-150
    hover:bg-emerald-400
    hover:shadow-lg
    active:scale-95
    focus:outline-none
    focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-neutral-900
  " onClick={() => disconnect.mutate()}>Disconnect</button>
      </div>
    );
  }

  return (
    <button className="
    mt-6
    mb-12
    px-6 py-3
    rounded-lg
    bg-emerald-300
    text-black font-semibold
    tracking-wide
    shadow-md
    transition-all duration-150
    hover:bg-emerald-400
    hover:shadow-lg
    active:scale-95
    focus:outline-none
    focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-neutral-900
  " onClick={() => connect.mutate({ connector: connectors[0] })}>
      Connect Wallet
    </button>
  );
}

export default Wallet