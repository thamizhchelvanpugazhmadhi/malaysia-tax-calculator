{\rtf1\ansi\ansicpg1252\cocoartf2869
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww29200\viewh17740\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 function calculateTax() \{\
    const income = parseFloat(document.getElementById('income').value) || 0;\
    const daysInMalaysia = parseInt(document.getElementById('days').value) || 0;\
    \
    let taxPayable = 0;\
    let residencyStatus = "Non-Resident";\
    let message = "";\
\
    // 1. Determine Residency (182 days rule)\
    if (daysInMalaysia >= 182) \{\
        residencyStatus = "Resident";\
        \
        // 2. Resident Calculation: Chargeable Income = Income - Personal Relief (9000)\
        let chargeableIncome = Math.max(0, income - 9000);\
        \
        // Progressive Slabs Logic\
        if (chargeableIncome <= 5000) taxPayable = 0;\
        else if (chargeableIncome <= 20000) taxPayable = (chargeableIncome - 5000) * 0.01;\
        else if (chargeableIncome <= 35000) taxPayable = 150 + (chargeableIncome - 20000) * 0.03;\
        else if (chargeableIncome <= 50000) taxPayable = 600 + (chargeableIncome - 35000) * 0.06;\
        else if (chargeableIncome <= 70000) taxPayable = 1500 + (chargeableIncome - 50000) * 0.11;\
        else if (chargeableIncome <= 100000) taxPayable = 3700 + (chargeableIncome - 70000) * 0.19;\
        else taxPayable = 9400 + (chargeableIncome - 100000) * 0.25;\
\
        // 3. Apply RM 400 Rebate if income <= 35000\
        if (chargeableIncome <= 35000 && taxPayable > 0) \{\
            taxPayable = Math.max(0, taxPayable - 400);\
            message = "Applied RM 400 low-income rebate.";\
        \}\
    \} else \{\
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