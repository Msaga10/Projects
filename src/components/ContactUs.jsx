import React, { useState } from 'react';

function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", { name, email, message });
        alert("Thank you for contacting us. We will get back to you shortly!");
    };

    return (
        <div className='h-screen flex flex-col bg-amber-100 justify-center items-center'>
            <div className='  px-5 gap-3'>
                <h1 className='text-[24px]'>Contact Us</h1>
                <p>If you have any questions or need assistance, <br /> feel free to reach out to us. We're here to help!</p>

                <h2 className='bg-gray-200'>Contact Information</h2>
                <p>
                    <strong>Email:</strong> support@alot.com<br />
                    <strong>Phone:</strong> [Insert Phone Number]<br />
                    <strong>Address:</strong> [Insert Company Address]
                </p>

                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className='bg-blue-500 p-2 rounded-full'>Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;
