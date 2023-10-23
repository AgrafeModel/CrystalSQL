import React from 'react';
import Link from 'next/link'



const TestPage = () => {
    return (
        <div>
            <h1>This is a test page for Nextron</h1>
            <p>If you can see this, then Nextron is working correctly!</p>
            <Link href="/home"><a>Go back to home</a></Link>
        </div>
    );
};

export default TestPage;
