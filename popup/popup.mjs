import storage from "./storage.mjs";

console.log("POPUP");

chrome.tabs.query(
    { url: "https://www.google.com/finance/portfolio/*" },
    function (tabs) {
        if (tabs.length === 0) {
            document.getElementById("user-feedback").innerText =
                "Não existe uma aba do google finance";

            return;
        }

        const { id, active } = tabs[0];
        chrome.tabs.sendMessage(
            id,
            { action: "ACTIVES_REQUEST" },
            handleActivesRequest
        );
    }
);

function handleActivesRequest(actives) {
    if (actives) {
        storage.get("actives").then(({ actives: activesDb }) => {
            hide(document.getElementById("user-feedback"));
            show(document.getElementById("actives-container"));

            const ul = document.getElementById("actives");
            ul.innerHTML = "";

            actives.forEach(({ name, price, color }) => {
                const activeDb = activesDb.find(
                    (active) => name === active.name
                );

                ul.appendChild(
                    createLi({
                        color,
                        name,
                        low: activeDb ? activeDb.low : 0,
                        currentValue: price,
                        hight: activeDb ? activeDb.hight : 0,
                    })
                );
            });
        });
        return true;
    }

    show(document.getElementById("user-feedback"));
    hide(document.getElementById("actives-container"));

    return false;
}

document.getElementById("save-actives").onclick =
    async function handleSaveActives() {
        const actives = [];

        document.querySelectorAll(".active-row").forEach((el) => {
            const name = el.querySelector(".active-name").innerText;
            const low = Number(el.querySelector(".active-low").value);
            const hight = Number(el.querySelector(".active-hight").value);

            actives.push({ low, name, hight });
        });

        storage.set({ actives });
    };

document.getElementById("clean-actives").onclick = function () {
    storage.clear();
    document.querySelectorAll(".active-row").forEach((el) => {
        el.querySelector(".active-low").value = 0;
        el.querySelector(".active-hight").value = 0;
    });
};

function show(element) {
    element.classList.remove("hide");
    element.classList.add("show");
}

function hide(element) {
    element.classList.remove("show");
    element.classList.add("hide");
}

function createLi({ color, name, low, currentValue, hight }) {
    const li = document.createElement("li");
    li.classList.add("active-row");

    const span = document.createElement("span");
    span.textContent = name;
    span.style.backgroundColor = color;
    span.classList.add("active-name");

    const divContainer = document.createElement("div");
    divContainer.classList.add("active-price-container");

    let div = document.createElement("div");
    let input = document.createElement("input");
    input.classList.add("active-price-input", "active-low");
    input.type = "number";
    input.min = 0;
    input.value = low;
    input.step = ".01";
    div.appendChild(input);
    divContainer.appendChild(div);

    div = document.createElement("div");
    div.textContent = `R$${currentValue}`;
    div.classList.add("active-price");
    divContainer.appendChild(div);

    div = document.createElement("div");
    input = document.createElement("input");
    input.classList.add("active-price-input", "active-hight");
    input.type = "number";
    input.min = 0;
    input.value = hight;
    input.step = ".01";
    div.appendChild(input);
    divContainer.appendChild(div);

    li.appendChild(span);
    li.appendChild(divContainer);
    return li;
}
