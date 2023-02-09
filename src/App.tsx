import React, { useEffect, useState } from "react";
import "./App.css";
import { Active, DOMActive, SCHEDULER_NAME } from "./chrome-content/types";
import ActiveRow from "./components/ActiveRow";
import GetDom from "./services/get-dom";
import notification from "./services/notification";
import ActiveStorage from "./services/active-storage";

const LOCAL_DATA = [
    {
        color: "rgb(195, 107, 22)",
        name: "ALPA4",
        low: 0,
        currentPrice: 12.4,
        hight: 0,
        tracking: true,
        reachedOut: false,
    },
    {
        color: "rgb(230, 5, 22)",
        name: "AMER3",
        low: 0,
        currentPrice: 1.73,
        hight: 0,
        tracking: true,
        reachedOut: false,
    },
    {
        color: "rgb(102, 46, 244)",
        name: "MGLU3",
        low: 0,
        currentPrice: 4.13,
        hight: 0,
        tracking: true,
        reachedOut: false,
    },
    {
        color: "rgb(131, 10, 209)",
        name: "NUBR33",
        low: 0,
        currentPrice: 4.2,
        hight: 0,
        tracking: true,
        reachedOut: false,
    },
    {
        color: "rgb(2, 145, 64)",
        name: "PETR4",
        low: 0,
        currentPrice: 25.78,
        hight: 0,
        tracking: true,
        reachedOut: false,
    },
    {
        color: "rgb(161, 125, 32)",
        name: "VALE3",
        low: 0,
        currentPrice: 87.84,
        hight: 0,
        tracking: true,
        reachedOut: false,
    },
];

function App() {
    const [actives, setActives] = useState<Active[]>(
        chrome.tabs ? [] : LOCAL_DATA
    );

    function onActiveChange(active: Active) {
        setActives(
            actives.map((item) => (active.name === item.name ? active : item))
        );
    }

    function saveReachTargets() {
        ActiveStorage.set({ actives });
    }

    function resetReactTargets() {
        setActives(actives.map((item) => ({ ...item, low: 0, hight: 0 })));
        saveReachTargets();
    }

    function handleGetDom(domActives: DOMActive[]) {
        ActiveStorage.get("actives").then(({ actives: dbActives }) => {
            const newActives = domActives.map(({ name, price, color }) => {
                const activeDb =
                    Array.isArray(dbActives) &&
                    dbActives
                        .find((active: any) => name === active.name);

                if (activeDb && activeDb.tracking) {
                    if (activeDb.low !== 0 && price <= activeDb.low) {
                        notification.create(
                            `${name}`,
                            `Atigiu a mínima de R$${price}`
                        );
                    }
                    if (activeDb.hight !== 0 && price >= activeDb.hight) {
                        notification.create(
                            `${name}`,
                            `Atigiu a máxima de R$${price}`
                        );
                    }
                }

                return {
                    color,
                    name,
                    low: activeDb ? activeDb.low : 0,
                    currentPrice: price,
                    hight: activeDb ? activeDb.hight : 0,
                    tracking: activeDb ? activeDb.tracking : true,
                    reachedOut: activeDb ? activeDb.reachedOut : false,
                } as Active;
            });

            setActives(newActives);
        });

        return true;
    }

    useEffect(() => {
        GetDom(handleGetDom);

        chrome.alarms &&
            chrome.alarms.onAlarm.addListener((alarm) => {
                if (alarm.name !== SCHEDULER_NAME) {
                    return;
                }

                GetDom(handleGetDom);
            });
    }, []);

    return (
        <div className="App">
            <h1>Google Finance Ext</h1>

            {actives.length === 0 && (
                <p id="user-feedback" style={{ textAlign: "center" }}>
                    Não existe ativos para monitoramento.
                </p>
            )}

            <div id="actives-container">
                <ul id="actives">
                    {actives.map((active) => (
                        <ActiveRow
                            key={active.name}
                            {...active}
                            onChange={onActiveChange}
                        ></ActiveRow>
                    ))}
                </ul>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <button onClick={saveReachTargets}>Salvar</button>
                    <button onClick={resetReactTargets}>Limpar</button>
                </div>
            </div>
        </div>
    );
}

export default App;
