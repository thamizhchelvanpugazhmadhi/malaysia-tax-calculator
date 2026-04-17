function calculateTax() {
    const income = parseFloat(document.getElementById('income').value);
    const days = parseInt(document.getElementById('days').value);
    
    if (isNaN(income) || isNaN(days)) {
        alert("Please enter valid numbers for income and days.");
        return;
    }

    let tax = 0;
    let rebate = 0;
    let status = "Non-Resident";

    // Check Residency: 182-day threshold rule
    if (days >= 182) {
        status = "Tax Resident";
        
        // Apply automatic RM 9,000 personal deduction
        let chargeableIncome = income - 9000;
        if (chargeableIncome < 0) chargeableIncome = 0;

        // Progressive Tax Slabs calculation
        if (chargeableIncome <= 5000) {
            tax = 0;
        } else if (chargeableIncome <= 20000) {
            tax = (chargeableIncome - 5000) * 0.01;
        } else if (chargeableIncome <= 35000) {
            tax = 150 + ((chargeableIncome - 20000) * 0.03);
        } else if (chargeableIncome <= 50000) {
            tax = 600 + ((chargeableIncome - 35000) * 0.06);
        } else if (chargeableIncome <= 70000) {
            tax = 1500 + ((chargeableIncome - 50000) * 0.11);
        } else if (chargeableIncome <= 100000) {
            tax = 3700 + ((chargeableIncome - 70000) * 0.19);
        } else if (chargeableIncome <= 400000) {
            tax = 9400 + ((chargeableIncome - 100000) * 0.25);
        } else {
            tax = 84400 + ((chargeableIncome - 400000) * 0.30); // 30% max rate assumption beyond 400k slab
        }

        // Apply RM 400 Rebate if Chargeable Income is <= RM 35,000
        if (chargeableIncome <= 35000) {
            rebate = 400;
            tax = tax - rebate;
            if (tax < 0) tax = 0; 
        }

    } else {
        // Non-Resident flat 30% rate
        tax = income * 0.30;
    }

    // Calculate post-tax income
    const postTaxIncome = income - tax;

    // Display Results
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = "block";
    resultsDiv.innerHTML = `
        <h3>Calculation Results</h3>
        <p><strong>Residency Status:</strong> ${status}</p>
        <p><strong>Estimated Tax Payable:</strong> RM ${tax.toLocaleString('en-MY', {minimumFractionDigits: 2})}</p>
        <p><strong>Rebate Applied:</strong> RM ${rebate.toLocaleString('en-MY', {minimumFractionDigits: 2})}</p>
        <hr>
        <p><strong>Estimated Post-Tax Income:</strong> RM ${postTaxIncome.toLocaleString('en-MY', {minimumFractionDigits: 2})}</p>
    `;
}    \} else \{\
        // Non-Resident: Flat 30%\
        taxPayable = income * 0.30;\
        message = "Non-residents are taxed at a flat 30% rate with no reliefs.";\
    \}\
\
    // Display Results\
    document.getElementById('status').innerText = residencyStatus;\
    document.getElementById('taxResult').innerText = "RM " + taxPayable.toLocaleString();\
    document.getElementById('postTax').innerText = "RM " + (income - taxPayable).toLocaleString();\
    document.getElementById('note').innerText = message;\
\}}
