"use client"
import { useEffect, useState } from "react";

let data = {
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

const Index = () => {
    const [questions, setQuestions] = useState();
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        let questionSet = [];
        data.question.forEach((element) => {
            // console.log('element', element);
            Object.keys(element).forEach((question, key) => {
                // console.log('element[question]', element[question]);
                questionSet.push({
                    p: 0,
                    l: key + "@@" + question,
                    q: question,
                    a: element[question].map((obj) => {
                        return Object.keys(obj)[0];
                    }),
                    d: "",
                });
            });
        });
        setQuestions(questionSet)
    }, [])

    const searchNode = (node, path, search) => {
        console.log('search in searchNode', search);
        for (const key in node) {
            console.log('node in searchNode', node);
            console.log('key in searchNode >> ', key);
            const value = node[key];
            const newPath = path ? `${path}@@${key}` : key;

            if (key === search || value === search) {
                return newPath;
            }

            if (typeof value === "object") {
                const result = searchNode(value, newPath, search);
                if (result) {
                    return result;
                }
            }
        }

        return null;
    };

    const getFinalObject = (obj, path) => {
        console.log('getFinalObject ', obj, '>>>>', path, path.split("@@"));
        try {
            for (
                var i = 0, path = path.split("@@"), len = path.length;
                i < len;
                i++
            ) {
                console.log('path[i]', path[i], obj[path[i]]);
                obj = obj[path[i]];
            }
            console.log('obj', obj);
            return obj;
        } catch (e) {
            return "";
        }
    };

    const selectAnswer = (event, question, position, path) => {
        try {
            let finalCost = -1;
            let answer = event.target.value;
            let questionPath = path;
            let questionSet = [...questions];

            console.log('getFinalObject', getFinalObject(data?.question, questionPath));

            let answerPath = searchNode(
                getFinalObject(data?.question, questionPath),
                "",
                answer
            );

            console.log('answerPath', answerPath);

            if (typeof getFinalObject(data?.question, questionPath + "@@" + answerPath) !== "string") {
                // Following condition to reset the selection when any former dropdown is clicked
                if (position <= questionSet.length) {
                    questionSet.splice(position + 1, questionSet.length - (position + 1));
                }
                
                getFinalObject(data?.question, questionPath + "@@" + answerPath).forEach((element) => {
                    Object.keys(element).forEach((question) => {
                        console.log('element forEach ', element);
                        questionSet.push({
                            p: questions.length - 1 + 1,
                            l: questionPath + "@@" + answerPath,
                            q: question,
                            a: element[question],
                        });
                    });
                });
                // console.log('questionSet >>>> ', questionSet);
                setQuestions(questionSet);

            } else {
                if (answerPath.indexOf("@@service_name") > -1) {
                    finalCost = getFinalObject(data?.question, questionPath + "@@" + answerPath.replace("@@service_name", "@@service_offer_price"));
                }
            }
            setAnswers({ ...answers, [question]: answer, finalCost });
        } catch (e) {
            console.log('error >> ', e);
        }
    }

    console.log('questions', questions);
    console.log('answers', answers);

    return (
        <>
            <div style={{ padding: "20px" }}>
                {questions?.map((val, ind) => {
                    console.log('val', val);
                    return (
                        <div key={ind}>
                            <h5>{val?.q}</h5>
                            <select onChange={(e) => { selectAnswer(e, val["q"], val["p"], val["l"]); }}>
                                <option value="">Please Select</option>
                                {val?.a.map((value, index) => {
                                    return (
                                        <option key={index}>{value?.service_name || value}</option>
                                    )
                                })}
                            </select>
                        </div>
                    )
                })}
                {answers.finalCost > 0 && <label>
                    <span>
                        Total Cost
                    </span>
                    <span>
                        ₹ {answers.finalCost}
                    </span>
                </label>}
            </div>
        </>
    );
}

export default Index;
