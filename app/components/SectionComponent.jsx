export default function Section() {
    return(
        <div className="bg-black text-white flex flex-row justify-center pt-10">
            <div className="flex flex-col w-150">
                <p className="text-[50px] font-bold">Why KFintech?</p>
                <p className="text-[30px] text-cyan-400 font-bold">Secure Hyperscale Platform</p>
                <p className="text-[20px] ">
                    KFintech's asset management platforms are the leading investor and Issuer servicing platforms. 
                    Our platforms are highly resilient, secure and scalable even as they are built on mobile-first micro services architecture driven and cloud-ready frameworks. 
                    KFintech has country specific platforms for asset classes of Mutual Funds, ETFs, Alternatives and Pensions for investor servicing & equities and bonds for issuer servicing. 
                    KFintech platforms and data are hosted in Tier IV data centers.
                </p>
            </div>
            <div>
                <img height={"500px"} width={"500px"} 
                src="https://www.kfintech.com/new-assets/images/logo-shape.svg"/>
            </div>
        </div>
    );
}