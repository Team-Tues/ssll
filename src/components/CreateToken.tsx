import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWriteContract, useAccount } from "wagmi";
import { uploadImage } from "../utils/uploadImage";
import { launchpadAbi } from "../abis/launchpadAbi";
import { useState } from "react";

export default function CreateToken() {
  const { isConnected } = useAccount();
  const { data: hash, error, writeContract } = useWriteContract();

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const imageUrl = await uploadImage(formData.get("image") as File);
    const metadata: TokenURI = {
      image: imageUrl,
      description: formData.get("description") as string,
      website: formData.get("website") as string,
      x: formData.get("x") as string,
      discord: formData.get("discord") as string,
      telegram: formData.get("telegram") as string,
    };
    const tokenURI =
      "data:application/json;base64," + btoa(JSON.stringify(metadata));

    writeContract({
      address: process.env.NEXT_PUBLIC_LAUNCHPAD_ADDRESS as `0x${string}`,
      abi: launchpadAbi,
      functionName: "launchToken",
      args: [
        process.env
          .NEXT_PUBLIC_NON_FUNGIBLE_POSITION_MANAGER_ADDRESS as `0x${string}`,
        formData.get("name"),
        formData.get("symbol"),
        tokenURI,
      ],
      value: BigInt("10000000000000"),
    });
  };

  return (
    <div className="min-h-screen p-4">
      <main className="max-w-4xl mx-auto">
        <div className="bg-black/30 p-8 border border-gray-900 rounded-lg">
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-gray-400">TOKEN NAME*</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-gray-400">SYMBOL*</label>
                <input
                  type="text"
                  name="symbol"
                  placeholder="Symbol"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-gray-400">DESCRIPTION</label>
              <textarea
                name="description"
                placeholder="Description"
                rows={2}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-gray-400 mb-1">WEBSITE</label>
                <div className="flex items-center bg-gray-700 border border-gray-600 rounded overflow-hidden">
                  <span className="bg-gray-600 px-2 py-2 text-gray-400">
                    🌐
                  </span>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://token.com/"
                    className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-gray-400 mb-1">X</label>
                <div className="flex items-center bg-gray-700 border border-gray-600 rounded overflow-hidden">
                  <span className="bg-gray-600 px-2 py-2 text-gray-400">𝕏</span>
                  <input
                    type="url"
                    name="x"
                    placeholder="http://x.com/username"
                    className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-gray-400 mb-1">DISCORD</label>
                <div className="flex items-center bg-gray-700 border border-gray-600 rounded overflow-hidden">
                  <span className="bg-gray-600 px-2 py-2 text-gray-400">
                    🎮
                  </span>
                  <input
                    type="url"
                    name="discord"
                    placeholder="https://discord.gg/abc123"
                    className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-gray-400 mb-1">TELEGRAM</label>
                <div className="flex items-center bg-gray-700 border border-gray-600 rounded overflow-hidden">
                  <span className="bg-gray-600 px-2 py-2 text-gray-400">
                    ✈️
                  </span>
                  <input
                    type="url"
                    name="telegram"
                    placeholder="https://t.me/+abc123"
                    className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <label className="block text-gray-400">IMAGE*</label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  name="image"
                  required
                  className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-600 file:text-white hover:file:bg-gray-500"
                />
              </div>
            </div>

            <div className="pt-4">
              {isConnected ? (
                <button
                  type="submit"
                  className="bg-emerald-500 hover:cursor-pointer py-2 px-4 rounded-xl w-36"
                >
                  Create Token
                </button>
              ) : (
                <ConnectButton />
              )}
            </div>

            {hash && (
              <div className="mt-4 p-3 bg-gray-700 rounded text-sm">
                <div className="text-gray-400 mb-1">Transaction Hash:</div>
                <a
                  href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 break-all"
                >
                  {hash}
                </a>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded text-sm text-red-300 break-words">
                {error.message}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
