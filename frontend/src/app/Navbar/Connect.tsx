// app/components/Connect.tsx
'use client';
import Image from "next/image";
import React from 'react';
import wallet from "@/assets/wallet.png";
import Link from "next/link";


export function Connect() {
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle btn">
        <Image
          src={wallet}
          alt="Wallet picture"
          width={40}
          height={40}
          className="w-10 rounded-full"
        />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <div className="btn-ghost btn">
            <w3m-button
              label="Connect"
              balance="hide"
              size="sm"
              loadingLabel="Connecting"
            />
          </div>
        </li>
        <li>
          <div className="btn-ghost btn">
            <Link href="/buyToken"> Buy Token</Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
