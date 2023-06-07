import { useConnect } from "wagmi";

export function Wallets() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div>
      <div className="flex items-start justify-between p-5  rounded-t">
        <h3 className="text-3xl font-semibold">Modal Title</h3>
      </div>
      {/* body */}
      <h1> choose a wallet to connect below. Oxsequence is the easiest</h1>
      <div className="relative p-6 flex-auto">
        <div className="flex flex-col">
          {connectors.map((connector) => (
            <button
              className="p-3 bg-dark-blue text-white mb-2 "
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          ))}

          {error && <div>{error.message}</div>}
        </div>
      </div>
    </div>
  );
}
