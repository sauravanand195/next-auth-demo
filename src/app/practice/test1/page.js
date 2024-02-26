"use client"
import { useEffect, useState } from "react";

const Index = () => {
    // const [data, setData] = useState({})
    const [selectedFirstDropdown, setSelectedFirstDropdown] = useState('');
    const [selectedSecondDropdown, setSelectedSecondDropdown] = useState('');
    const [options, setOptions] = useState([]);

    const fetchData = async () => {
        const response = await fetch('')
        console.log('response', response);
        const responseObj = await response.json()
        // setData(responseObj)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleFirstDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedFirstDropdown(selectedValue);

        // Find the selected service in the data and set options accordingly
        const selectedItem = data.question[0]["Type of service:"].find(service => Object.keys(service)[0] === selectedValue);
        if (selectedItem) {
            const typesOfAC = selectedItem[selectedValue][0]["Type of AC:"].map(item => item.service_name);
            setOptions(typesOfAC);
        } else {
            setOptions([]);
        }

        // Reset the second dropdown selection when the first dropdown changes
        setSelectedSecondDropdown('');
    };

    const handleSecondDropdownChange = (event) => {
        const selectedServiceName = event.target.value;
        setSelectedSecondDropdown(selectedServiceName);

        // Find the selected service in the data and alert its cost
        const selectedService = data.question[0]["Type of service:"].find(service => {
            const services = Object.values(service)[0];
            return services.some(serviceDetail => {
                const acTypes = serviceDetail["Type of AC:"].map(ac => ac.service_name);
                return acTypes.includes(selectedServiceName);
            });
        });

        if (selectedService) {
            const serviceDetails = selectedService[selectedFirstDropdown][0]["Type of AC:"].find(ac => ac.service_name === selectedServiceName);
            if (serviceDetails) {
                alert(`Cost of ${selectedServiceName}: ${serviceDetails.service_offer_price}`);
            }
        }
    };

    const data = {
        "question": [
            {
                "Type of service:": [
                    {
                        "AC Repair": [
                            {
                                "Type of AC:": [
                                    {
                                        "service_id": 203,
                                        "service_name": "Split AC Repair",
                                        "service_offer_price": 299
                                    },
                                    {
                                        "service_id": 204,
                                        "service_name": "Window AC Repair",
                                        "service_offer_price": 299
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "AC Service": [
                            {
                                "Type of AC:": [
                                    {
                                        "service_id": 201,
                                        "service_name": "Split AC Service",
                                        "service_offer_price": 599
                                    },
                                    {
                                        "service_id": 202,
                                        "service_name": "Window AC Service",
                                        "service_offer_price": 499
                                    },
                                    {
                                        "service_id": 209,
                                        "service_name": "1 Split AC, 2 Services per year",
                                        "service_offer_price": 1099
                                    },
                                    {
                                        "service_id": 210,
                                        "service_name": "1 Window AC, 2 Services per year",
                                        "service_offer_price": 899
                                    },
                                    {
                                        "service_id": 211,
                                        "service_name": "1 Split AC, 3 Services per year",
                                        "service_offer_price": 1699
                                    },
                                    {
                                        "service_id": 212,
                                        "service_name": "1 Window AC, 3 Services per year",
                                        "service_offer_price": 1349
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "Installation / Un-Installation": [
                            {
                                "Type of AC:": [
                                    {
                                        "service_id": 205,
                                        "service_name": "Split AC Installation",
                                        "service_offer_price": 1999
                                    },
                                    {
                                        "service_id": 206,
                                        "service_name": "Window AC Installation",
                                        "service_offer_price": 799
                                    },
                                    {
                                        "service_id": 207,
                                        "service_name": "Split AC Un-Installation",
                                        "service_offer_price": 649
                                    },
                                    {
                                        "service_id": 208,
                                        "service_name": "Window AC Un-Installation",
                                        "service_offer_price": 399
                                    },
                                    {
                                        "service_id": 213,
                                        "service_name": "Split AC - Uninstallation + Installation",
                                        "service_offer_price": 2599
                                    },
                                    {
                                        "service_id": 214,
                                        "service_name": "Window AC - Uninstallation + Installation",
                                        "service_offer_price": 1249
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    return (
        <>
            <div className="outer-wrapper">
                {data.question.map((item, index) => {
                    const serviceType = Object.keys(item)[0];
                    return (
                        <div className="ques-label"><label key={index}>{serviceType}</label></div>
                    );
                })}
                <div>
                    <select className="drp-wrap" value={selectedFirstDropdown} onChange={handleFirstDropdownChange}>
                        <option value="">--Please choose an option--</option>
                        {data.question[0]["Type of service:"].map((item, index) => (
                            <option key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>
                        ))}
                    </select>
                </div>
                {/* {options.length} */}
                {options.length > 0 && (
                    <>
                        <div className="ques-label"><label>Type of AC:</label></div>
                        <div>
                            <select className="drp-wrap" value={selectedSecondDropdown} onChange={handleSecondDropdownChange}>
                                <option value="">--Please choose an option--</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
            </div>
            <style jsx>{`
                .outer-wrapper{padding: 20px;}
                .ques-label{font-size: 19px; margin: 9px 0px;}
                .drp-wrap{font-size: 15px;}
            `}</style>
        </>
    );
}

export default Index;