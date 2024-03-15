import QRCode from "react-qr-code";

const Page = () => {
    const value = {
        "name": "Rudresha Ms",
        "empcode": "10108889",
        "date": "15-3-2024"
    }
    const data = {
        "Rudresh": {
            "name": "Rudresha Ms",
            "empcode": "10108889",
            "date": "15-3-2024"
        }
    }
    return (
        <div style={{ padding: "50px" }}>
            <QRCode value={JSON.stringify(value)} />
        </div>
    );
}

export default Page;