import { useState } from "react"
import parkAppImg from "../assets/logout.png"
function FAQ() {
    const [HSRP, setHSRP] = useState(false)
    const [replacement, setReplacement] = useState(false)
    const [frame, setFrame] = useState(false)
    const [parknFasTag, setParknFasTag] = useState(false)

    const toggleText2 = () => {
        setReplacement(!replacement)
        if (!replacement) {  
            setHSRP(false);
            setFrame(false);
            setParknFasTag(false);
        }
    }
    const toggleText3 = () => {
        setFrame(!frame)
        if (!frame) {  
            setHSRP(false)
            setReplacement(false);
            setParknFasTag(false);
        }
    }
    const toggleText4 = () => {
        setParknFasTag(!parknFasTag)
        if (!parknFasTag) { 
            setHSRP(false) 
            setReplacement(false);
            setFrame(false);
        }
    }

    const [expandedIndex, setExpandedIndex] = useState(false)
    const toggleExpand = (index) => setExpandedIndex(expandedIndex === index ? null : index)
    return(
        <div className="flex flex-col justify-center items-center min-h-screen bg-amber-200 overflow-auto">
            <h1 className="text-[27px] font-bold mt-5 mb-16">FAQ's</h1>
            <div  className="flex flex-col sm:flex-row p-3 gap-2 ">
                <button onClick={toggleText2} className="border p-4 rounded-full text-[18px] hover:bg-blue-300 bg-white"> General Questions</button>
                <button onClick={toggleText3} className="border p-4 rounded-full text-[18px] hover:bg-blue-300 bg-white">Seller & Auction Process</button>
                <button onClick={toggleText4} className="border p-4 rounded-full text-[18px] hover:bg-blue-300 bg-white">Payment & Transactions</button>
            </div>


            {/*//////////////////////// Hidden div 1 */}
            {replacement && (
                <div className="m-5 flex flex-col gap-1 w-2/3 mx-auto">
                    <div onClick={()=>toggleExpand(1)} className="h-auto  bg-blue-400 p-3 hover:cursor-pointer" >
                        <p>1. How can I participate in an auction?</p>
                    </div>
                    {expandedIndex === 1 && (
                        <div>
                            <span>Currently, there are no specific restrictions to participate in the auction. Anyone can place bids on items. In the future, guidelines for bidding will be introduced to ensure a fair process for all users.</span>
                        </div>
                    )}
                    <div onClick={()=>toggleExpand(2)} className="h-auto  bg-blue-400 p-3 hover:cursor-pointer" >
                        <p>2. How do I get notified about auction updates?</p>
                    </div>
                    {expandedIndex === 2 && (
                        <p>You will be notified when you win an auction. Additionally, if your bid becomes lower than the current highest bid, you'll receive a notification letting you know that someone else has placed a higher bid.</p>
                    )}
                    <div onClick={()=>toggleExpand(3)} className="h-auto  bg-blue-400 p-3 hover:cursor-pointer" >
                        <p>3. Can I place a bid on any item I want?</p>
                    </div>
                    {expandedIndex === 3 && (
                        <p> Yes, you can place bids on any available auction item. There are no restrictions on what you can bid on at this time.</p>
                    )}
                </div>
            )}

            {/*//////////////////////// Hidden div 2 */}
            {frame && (
                <div className="m-5 flex flex-col gap-1 w-2/3 mx-auto">
                    <div onClick={()=>toggleExpand(1)} className="h-auto  bg-blue-400 p-3 hover:cursor-pointer">
                        <p>1. How will I know when my item is sold?</p>
                    </div>
                    {expandedIndex === 1 && (
                    <span>Sellers will receive a notification when their auction item is sold, keeping them informed throughout the process.</span>
                    )}
                    <div onClick={()=>toggleExpand(2)} className="h-auto  bg-blue-400 p-3 hover:cursor-pointer">
                        <p>2. Will I need to pay anything to list my items?</p>
                    </div>
                    {expandedIndex === 2 && (
                    <div>
                        <span>In the future, sellers will be required to pay a 10% security deposit based on the base price of the auctioned item. This deposit ensures fair bidding and will be refunded if the item does not sell. However, if the auction amount reaches 10 times the base price, no refund will be issued.</span>
                    </div>
                    )}
                    <div onClick={()=>toggleExpand(3)} className="h-auto  bg-blue-400 p-3 hover:cursor-pointer">
                        <p>3. What happens if a bidder doesn’t win the auction?</p>
                    </div>
                    {expandedIndex === 3 && (
                    <p>If a bidder does not win, they will receive a refund of the security deposit minus a 1% charge. If the auction amount goes higher than 10 times the base price, the security deposit is not refundable.</p>
                    )}
                </div>
            )}

            {/*//////////////////////// Hidden div 3 */}
            {parknFasTag && (
                <div className="m-5 flex flex-col gap-1 w-2/3 mx-auto">
                    <div onClick={()=>toggleExpand(1)} className="h-auto  bg-blue-400 p-3 hover:cursor-pointer" >
                        <p>1. How do I make payments for auction items?</p>
                    </div>
                    {expandedIndex === 1 && (
                        <div>
                            <span>Currently, payments are not available on the platform, but payment methods will be introduced in the future for processing successful auctions.</span>
                        </div>
                    )}
                    <div onClick={()=>toggleExpand(2)} className="h-auto  bg-blue-400 p-3 hover:cursor-pointer" >
                        <p>2. Will I be charged any extra fees during the bidding process?</p>
                    </div>
                    {expandedIndex === 2 && (
                        <p>There are no additional fees for placing a bid right now, but as part of future updates, some fees may apply as part of the bidding process or for successful transactions.</p>
                    )}
                    <div onClick={()=>toggleExpand(3)} className="h-auto  bg-blue-400 p-3 hover:cursor-pointer" >
                        <p>3. How do I pay the security deposit?</p>
                    </div>
                    {expandedIndex === 3 && (
                        <p> The security deposit is required to be paid before you place your bid. If you win, the deposit will be applied to the final price. If you do not win, 1% of the deposit will be retained, and the rest will be refunded.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default FAQ 