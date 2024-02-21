"use client"
import { useEffect, useState } from "react"

const Demo = () => {
    const [ques, setQues] = useState({})
    const [service, setService] = useState('')
    const [cost, SetCost] = useState('')
    // const [selection, setSelection] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://192.168.14.101:3000/web_services/serviceGuide?city=mumbai&seo_catname=ac-service&trace=')
            const responseObject = await response.json()
            let dataSet = responseObject?.results?.question[0]
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