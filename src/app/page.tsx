"use server";

import Image from 'next/image'
import * as CSS from 'csstype';
import "./custom.css";

import starknetReactImg from "./Images/starknet-logo.svg";
import LowerBanner from './components/LowerBanner';
import NewBlock from './components/NewBlock';
import InitWS from './components/InitWS';
import ConnectWS from './components/ConnectWS';

export default async function Page() {
    const align: "left" | "center" | "right" = "center";
    const titleStyle: CSS.Properties = {
        color: 'rgb(20, 14, 75)',
        fontSize: "24px",
        fontFamily: 'sans-serif',
        fontWeight: '800',
        textAlign: align,
        padding: "20px",
    }


    return (
        <div>
            <div className='titleBar' style={titleStyle}>
                <div>
                    <Image
                        src={starknetReactImg}
                        alt='starknet.js'
                        height={40}
                    />
                </div>
                Subscribe-DAPP
            </div>
            <div className="textStyle">
                Sepolia Testnet.
            </div>
                <ConnectWS></ConnectWS>
                <LowerBanner></LowerBanner>
        </div >
    )
}

