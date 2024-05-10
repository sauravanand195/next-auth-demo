"use client"
import { useEffect, useState } from "react"

const dummyData = {
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
}

const Demo = () => {
    const [ques, setQues] = useState({})
    const [service, setService] = useState('')
    const [cost, SetCost] = useState('')
    // const [selection, setSelection] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch('http://192.168.14.101:3000/web_services/serviceGuide?city=mumbai&seo_catname=ac-service&trace=')
            // const responseObject = await response.json()
            let dataSet = dummyData?.question[0]
            setQues(dataSet)
        }
        fetchData()
    }, [])

    const updateDrp = (e) => {
        // setSelection([...selection, e.target.value])
        setService(e.target.value)
        SetCost('')
    }

    const updateVal = (e) => {
        const price = e.target.value && JSON.parse(e.target.value)?.service_offer_price
        // e.target.value && setSelection([...selection, JSON.parse(e.target.value)?.service_name])
        SetCost(price)
    }

    // console.log('selection', selection);

    const renderQues = (dt) => {
        {
            let key = Object.keys(dt)[0]
            console.log('key >> ', key, dt[key])
            return (
                <div key={key}>
                    <div>{key}</div>
                    <div>
                        <select placeholder="Select" onChange={(e) => updateDrp(e)}>
                            <option value="">Please select an option</option>
                            {dt[key] && Object.keys(dt[key]).map((value, index) => {
                                const dtArr = dt[key][value]
                                return Object.keys(dtArr).map((val, ind) =>
                                    <option key={ind} value={val}>{val}</option>
                                )
                            })}
                        </select>
                    </div><br />
                </div >
            )
        }
    }

    const renderService = (dt) => {
        console.log('dt', dt);
        {
            let key = Object.keys(dt)[0]
            console.log('key >> ', key, dt[key])
            return (
                <div key={key}>
                    <div>{key}</div>
                    <div>
                        <select onChange={(e) => updateVal(e)}>
                            <option value="">Please select an option</option>
                            {dt[key] && dt[key].map((value, index) => {
                                // console.log('arr2', dt[val][value]);
                                return <option key={index} value={JSON.stringify(value)}>{value.service_name}</option>
                            })}
                        </select>
                    </div><br />
                </div >
            )
        }
    }

    const getServiceData = (service) => {
        let types = ques[Object.keys(ques)[0]]
        // console.log('types', types);
        let ser = types?.find(val => Object.keys(val)[0] == service)
        // console.log('ser', ser);
        return ser[service][0]
    }

    return (
        <div style={{ padding: "20px" }}>
            {ques && renderQues(ques)}
            {service && console.log('service >> ', getServiceData(service))}
            {service && renderService(getServiceData(service))}
            {cost && <p>Service Offer Price: {cost}</p>}
        </div>
    );
}

export default Demo;