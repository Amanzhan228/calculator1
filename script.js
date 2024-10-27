const calculate = () => {
    let name = document.getElementById("name").value;
    let price = parseFloat(document.getElementById("startingBid").value);

    if (!name || isNaN(price)) {
        alert("Please enter both name and starting bid.");
        return;
    }

    const educationCoeff = parseFloat(document.getElementById("education").value);
    const netWorthCoeff = parseFloat(document.getElementById("netWorth").value);
    const casteBonus = parseFloat(document.getElementById("caste").value);
    const ageCoeff = parseFloat(document.querySelector('input[name="age"]:checked').value);

    const skills = Array.from(document.getElementsByClassName("skill"));
    const skillBonus = skills
        .filter(skill => skill.checked)
        .reduce((sum, skill) => sum + parseFloat(skill.value), 0);

    let reputationCoeff = 1;
    const reputations = document.getElementsByClassName("reputation");
    Array.from(reputations).forEach(rep => {
        if (rep.checked) reputationCoeff *= parseFloat(rep.value);
    });

    if (document.getElementById("generalGossip").checked) {
        price += parseFloat(document.getElementById("generalGossip").value);
    }

    let finalPrice = price * educationCoeff * netWorthCoeff * ageCoeff + casteBonus + skillBonus;
    finalPrice *= reputationCoeff;

    const loveLetter = document.getElementById("loveLetter").value;

    const person = {
        name: name,
        price: finalPrice.toFixed(2),
        loveLetter: loveLetter
    };

    document.getElementById("result").innerHTML = `
        <p>Your price for ${person.name} is ${person.price}$</p>
        <p>Love Letter: ${person.loveLetter}</p>
    `;
};

document.getElementById("calculateButton").addEventListener("click", calculate);
