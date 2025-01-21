import React from 'react';

function TandC() {
    return(
        <div className='p-2'>
            <h1>Terms and Conditions</h1>
            <p>Effective Date: [Insert Date]</p>

            <p>By accessing and using this website (the "Site"), you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before using the Site. If you do not agree to these Terms, do not use the Site.</p>

            <h2>1. General Terms</h2>
            <p>
                1.1 The Site is an online auction platform where buyers and sellers can engage in bidding on various items.<br />
                1.2 We reserve the right to modify, suspend, or terminate the services provided on the Site at any time, without notice, for any reason.<br />
                1.3 By using the Site, you agree to comply with all applicable laws and regulations related to online auctions, bidding, and transactions.
            </p>

            <h2>2. User Registration</h2>
            <p>
                2.1 To participate in an auction, you must create an account by providing accurate, up-to-date information.<br />
                2.2 You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.<br />
                2.3 We reserve the right to suspend or terminate your account if we believe your actions violate these Terms.
            </p>

            <h2>3. Bidding and Auctions</h2>
            <p>
                3.1 <strong>Eligibility:</strong> Anyone can participate in auctions unless otherwise restricted by country or region.<br />
                3.2 <strong>Bidding Process:</strong> Bidders place offers on auctioned items, and the highest bid at the end of the auction period wins.<br />
                3.3 <strong>Reserve Price:</strong> Some items may have a reserve price, and if the final bid is lower than the reserve price, the item may not be sold.<br />
                3.4 <strong>Bidder's Security Deposit:</strong>
                <ul>
                    <li>Bidders will be required to pay a 10% security deposit based on the base price of the item before placing a bid.</li>
                    <li>If the bidder does not win, 1% of the security deposit will be retained, and the rest will be refunded.</li>
                    <li>If the auction amount reaches 10 times the base price, the deposit is non-refundable.</li>
                </ul>
                3.5 <strong>Seller's Responsibility:</strong> Sellers must ensure that their items are accurately described and are in a condition suitable for auction. Sellers are responsible for fulfilling the sale if their item is sold.
            </p>

            <h2>4. Payments</h2>
            <p>
                4.1 <strong>Current Payment Methods:</strong> At present, payments are not available on the Site. Payment features will be introduced in future updates, and users will be notified accordingly.<br />
                4.2 <strong>Security Deposit Payment:</strong> Bidders must pay the required 10% security deposit before participating in an auction. Payment methods for the deposit will be defined once payment features are introduced.
            </p>

            <h2>5. Notifications</h2>
            <p>
                5.1 <strong>Auction Updates:</strong> Users will receive notifications when they win an auction, when a higher bid is placed on an item they've bid on, or if their bid is no longer the highest.<br />
                5.2 <strong>Seller Notifications:</strong> Sellers will be notified when their auction item is sold or when it receives bids.
            </p>

            <h2>6. Refund Policy</h2>
            <p>
                6.1 <strong>Refunds for Bidders:</strong> If a bidder does not win, 1% of the security deposit will be retained as a processing fee, and the remaining deposit will be refunded.<br />
                6.2 <strong>No Refunds for High Bids:</strong> If a bidder wins an auction and the final bid amount exceeds 10 times the base price, the deposit is not refundable.<br />
                6.3 <strong>Seller Refunds:</strong> Refund policies for sellers may vary and will be subject to our specific agreements with sellers once payment features are enabled.
            </p>

            <h2>7. User Conduct</h2>
            <p>
                7.1 Users must conduct themselves in a manner that is respectful and lawful. Any attempt to manipulate or interfere with the auction process (including fraudulent activities or misuse of the platform) will result in account suspension and possible legal action.<br />
                7.2 By using the Site, you agree not to engage in:
                <ul>
                    <li>Fraudulent or deceptive bidding practices.</li>
                    <li>Uploading or selling prohibited items.</li>
                    <li>Violating intellectual property rights or other user rights.</li>
                </ul>
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
                8.1 All content, logos, graphics, and materials on the Site are owned by Alot or its licensors. You may not use, reproduce, or distribute any content without prior permission.<br />
                8.2 Sellers are responsible for ensuring they own the rights to the items they list on the Site.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
                9.1 Alot is not responsible for any losses, damages, or harm that may arise from the use of the Site, participation in auctions, or failure of any auction process.<br />
                9.2 We do not guarantee the accuracy of item descriptions or the fulfillment of all transactions, and users participate in auctions at their own risk.
            </p>

            <h2>10. Dispute Resolution</h2>
            <p>
                10.1 Any disputes that arise between users, including sellers and buyers, must be resolved directly between the involved parties. Alot is not liable for any conflicts, but we encourage communication to settle issues amicably.<br />
                10.2 In the event of a dispute that cannot be resolved between the parties, the dispute will be governed by the laws of [your country/region], and users agree to submit to the jurisdiction of the courts in [your city/country].
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
                11.1 We may update these Terms and Conditions periodically. When changes are made, they will be posted on the Site, and users will be notified where necessary.<br />
                11.2 Continued use of the Site after such updates constitutes acceptance of the new Terms and Conditions.
            </p>

            <h2>12. Contact Information</h2>
            <p>If you have any questions or concerns regarding these Terms and Conditions, please contact us at:</p>
            <p>Email: support@alot.com</p>
            <p>Phone: [Insert Phone Number]</p>

        </div>
    );
}

export default TandC;
