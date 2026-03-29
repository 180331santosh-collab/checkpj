export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 pt-8 pb-16 max-w-4xl prose prose-slate">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <p className="mb-4">Effective Date: {new Date().toLocaleDateString()}</p>
            <p className="mb-6">At PadhnaJaam, accessible from Kathmandu, Nepal, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by PadhnaJaam and how we use it.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Log Files</h2>
            <p className="mb-4">PadhnaJaam follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Privacy Policies</h2>
            <p className="mb-4">You may consult this list to find the Privacy Policy for each of the advertising partners of PadhnaJaam.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Third Party Privacy Policies</h2>
            <p className="mb-4">PadhnaJaam&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Consent</h2>
            <p className="mb-4">By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
        </div>
    );
}
